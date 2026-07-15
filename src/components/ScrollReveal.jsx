import React, { useRef } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useSmoothScrollProgress } from './motion';

const OFFSETS = {
  up: { axis: 'y', from: 40 },
  down: { axis: 'y', from: -40 },
  left: { axis: 'x', from: -40 },
  right: { axis: 'x', from: 40 }
};

/**
 * Scroll-linked reveal — the replacement for the old IntersectionObserver-based
 * AnimatedSection.
 *
 * The old one fired once on intersection and then ran on a CSS timer, while the
 * cards below it tracked scroll position. Two different clocks in one section
 * drift apart, which is what made section transitions feel disjointed. This
 * shares the damped progress from ./motion, so a heading and its cards move as
 * one. `delay` is kept as a prop but expressed as a shift in scroll progress
 * rather than milliseconds — there is no timer to delay any more.
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const scrollYProgress = useSmoothScrollProgress(ref);

  // Old API passed delay in ms (0-300ish). Map it to a small stagger in progress.
  const stagger = Math.min(delay / 1000, 0.3);
  const start = stagger;
  const end = Math.min(1, 0.85 + stagger);

  const { axis, from } = OFFSETS[direction] || OFFSETS.up;
  const shift = useTransform(scrollYProgress, [start, end], [from, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
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
}
