import React, { useRef } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useSmoothScrollProgress, useSharedScrollProgress } from './motion';

const OFFSETS = {
  up: { axis: 'y', from: 40 },
  down: { axis: 'y', from: -40 },
  left: { axis: 'x', from: -40 },
  right: { axis: 'x', from: 40 }
};

const Reveal = ({ children, className, style, direction, delay, progress, elRef }) => {
  // Old API passed delay in ms (0-300ish). Map it to a small stagger in progress.
  const stagger = Math.min(delay / 1000, 0.3);
  const start = stagger;
  const end = Math.min(1, 0.85 + stagger);

  const { axis, from } = OFFSETS[direction] || OFFSETS.up;
  const shift = useTransform(progress, [start, end], [from, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.div
      ref={elRef}
      className={className}
      style={{
        ...style,
        [axis]: shift,
        opacity,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  );
};

// Used only outside a ScrollSection: tracks its own position.
const Standalone = (props) => {
  const ref = useRef(null);
  const progress = useSmoothScrollProgress(ref);
  return <Reveal {...props} progress={progress} elRef={ref} />;
};

/**
 * Scroll-linked reveal — the replacement for the old IntersectionObserver-based
 * AnimatedSection.
 *
 * The old one fired once on intersection and then ran on a CSS timer, while the
 * cards below it tracked scroll position. Two different clocks in one section
 * drift apart, which is what made section transitions feel disjointed. This
 * shares the section's damped progress, so a heading and its cards move as one.
 * `delay` is kept as a prop but expressed as a shift in scroll progress rather
 * than milliseconds — there is no timer to delay any more.
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  style = {}
}) {
  const prefersReducedMotion = useReducedMotion();
  const shared = useSharedScrollProgress();

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const props = { children, className, style, direction, delay };
  return shared
    ? <Reveal {...props} progress={shared} />
    : <Standalone {...props} />;
}
