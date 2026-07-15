import React from 'react';
import { animate } from 'framer-motion';

/**
 * Border glow that tracks the pointer around a card on hover.
 * Ported from Aceternity UI's GlowingEffect (Tailwind-based) to this project's
 * plain-CSS idiom, and recoloured to the PenmAI palette.
 *
 * Drop it as the first child of any card that has `position: relative` and a
 * border-radius; it overlays the card and inherits its radius. The overlay is
 * inert to the pointer, so it never swallows the card's own clicks — the
 * listeners live on the parent card instead (see below).
 *
 * Three deliberate departures from upstream:
 *
 * 1. Upstream binds `mousemove` on the *document* and runs proximity /
 *    inactiveZone maths so the glow lights up when the pointer is merely NEAR a
 *    card. We only want it on hover, so this binds to the card itself — the
 *    events only fire while the pointer is genuinely over the card, and it
 *    costs one listener per card rather than a document-wide listener per card.
 *    The proximity/inactiveZone props are gone with it.
 *
 * 2. Upstream starts a fresh animate() on every mousemove, stacking a new tween
 *    per event (dozens a second) and leaking every one. Each move here cancels
 *    the previous tween before starting the next.
 *
 * 3. The listeners are attached imperatively to `parentElement` rather than to
 *    this component's own div. The overlay must be pointer-events:none to keep
 *    the card clickable, which also makes it deaf to pointer events — so the
 *    card has to be what listens. Doing it via the parent ref keeps this a
 *    drop-in child: no card has to thread handlers through.
 *
 * The angle wrap maths in handleMove IS upstream's and is load-bearing: feeding
 * the raw atan2 result straight in makes the glow spin the long way round
 * whenever the pointer crosses the seam directly behind the card.
 */

// How long the glow takes to catch up to the pointer, in seconds. Upstream's
// default (2s) trails so far behind it reads as broken on a card this size.
const MOVEMENT_DURATION = 0.6;

export default function GlowingEffect({ borderWidth = 2, duration = MOVEMENT_DURATION }) {
  const overlayRef = React.useRef(null);
  const animationRef = React.useRef(null);

  React.useEffect(() => {
    const overlay = overlayRef.current;
    const card = overlay?.parentElement;
    if (!card) return;

    // A pointer that can't hover (touch) would light the glow on tap and strand
    // it lit, since no pointerleave reliably follows. Skip it there entirely.
    if (!window.matchMedia('(hover: hover)').matches) return;

    // Honour the same reduced-motion contract as the rest of the site: no
    // pointer-chasing tween, just a static lit ring on hover.
    const wantsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const setActive = (active) => overlay.style.setProperty('--glow-active', active ? '1' : '0');

    const handleMove = (event) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const centerX = left + width * 0.5;
      const centerY = top + height * 0.5;

      const currentAngle = parseFloat(overlay.style.getPropertyValue('--glow-start')) || 0;
      const targetAngle =
        (180 * Math.atan2(event.clientY - centerY, event.clientX - centerX)) / Math.PI + 90;

      // Take the short way round: fold the delta into [-180, 180) rather than
      // letting the angle unwind ~350° across the atan2 seam.
      const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + angleDiff;

      animationRef.current?.stop();
      animationRef.current = animate(currentAngle, newAngle, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => overlay.style.setProperty('--glow-start', String(value)),
      });
    };

    const handleEnter = () => setActive(true);
    const handleLeave = () => {
      animationRef.current?.stop();
      setActive(false);
    };

    card.addEventListener('pointerenter', handleEnter);
    card.addEventListener('pointerleave', handleLeave);
    if (!wantsReducedMotion) card.addEventListener('pointermove', handleMove);

    return () => {
      card.removeEventListener('pointerenter', handleEnter);
      card.removeEventListener('pointerleave', handleLeave);
      card.removeEventListener('pointermove', handleMove);
      animationRef.current?.stop();
    };
  }, [duration]);

  return (
    <div
      ref={overlayRef}
      className="glow-effect"
      aria-hidden="true"
      style={{ '--glow-width': `${borderWidth}px` }}
    >
      <div className="glow-effect__layer glow-effect__ring" />
      <div className="glow-effect__layer glow-effect__bloom" />
    </div>
  );
}
