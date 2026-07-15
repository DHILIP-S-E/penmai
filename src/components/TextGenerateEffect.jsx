import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const container = (stagger, delay) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay }
  }
});

const word = (duration) => ({
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration, ease: [0.22, 1, 0.36, 1] }
  }
});

/**
 * Words blur in one after another on mount.
 * Adapted from Aceternity UI's text-generate-effect, rewritten off Tailwind to
 * match this project's inline-style + CSS-variable conventions.
 */
export default function TextGenerateEffect({
  text,
  className = '',
  stagger = 0.08,
  delay = 0.2,
  duration = 0.7,
  style = {}
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      style={style}
      variants={container(stagger, delay)}
      initial="hidden"
      animate="visible"
    >
      {/* Announced copy for assistive tech — the animated words are aria-hidden
          duplicates. Not selectable, so copying the text yields one copy. */}
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          userSelect: 'none'
        }}
      >
        {text}
      </span>
      {text.split(' ').map((w, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          variants={word(duration)}
          style={{ display: 'inline-block', willChange: 'filter, opacity' }}
        >
          {w}
          {/* trailing space inside the span keeps normal word wrapping */}
          {' '}
        </motion.span>
      ))}
    </motion.span>
  );
}
