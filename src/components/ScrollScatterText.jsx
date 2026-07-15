import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

// Each character starts pushed away from the centre of the word and converges
// into place as the heading scrolls into view.
const Character = ({ char, index, centerIndex, scrollYProgress, spread, rotate }) => {
  const isSpace = char === ' ';
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * spread, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * rotate, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.85, 1]);

  return (
    <motion.span
      aria-hidden="true"
      style={{
        x,
        rotateX,
        opacity,
        display: 'inline-block',
        width: isSpace ? '0.35em' : undefined,
        willChange: 'transform, opacity'
      }}
    >
      {isSpace ? ' ' : char}
    </motion.span>
  );
};

/**
 * Scroll-driven per-character scatter for section headings.
 * Adapted from Skiper31 / CharacterV1 (@gurvinder-singh02, https://gxuri.me) —
 * the original drives progress off a 210vh pinned section; here the heading's own
 * viewport entry drives it instead.
 */
export default function ScrollScatterText({
  text,
  className = '',
  spread = 50,
  rotate = 50,
  style = {}
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center']
  });

  const characters = text.split('');
  const centerIndex = (characters.length - 1) / 2;

  if (prefersReducedMotion) {
    return <span className={className} style={style}>{text}</span>;
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{
        // perspective and the absolutely-positioned label below both need these;
        // the underline class supplies them, but not every heading uses it.
        display: 'inline-block',
        position: 'relative',
        perspective: '500px',
        ...style
      }}
    >
      {/* Announced copy for assistive tech — the animated chars are aria-hidden
          duplicates. Not selectable, so copying the heading yields one copy. */}
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
      {characters.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          centerIndex={centerIndex}
          scrollYProgress={scrollYProgress}
          spread={spread}
          rotate={rotate}
        />
      ))}
    </span>
  );
}
