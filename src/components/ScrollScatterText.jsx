import React, { useRef } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useSmoothScrollProgress, useSharedScrollProgress } from './motion';

// Each character starts pushed away from the centre of the word and converges
// into place as the section scrolls into view.
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
      {isSpace ? ' ' : char}
    </motion.span>
  );
};

const Scatter = ({ text, className, style, spread, rotate, progress, elRef }) => {
  const characters = text.split('');
  const centerIndex = (characters.length - 1) / 2;

  return (
    <span
      ref={elRef}
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
          scrollYProgress={progress}
          spread={spread}
          rotate={rotate}
        />
      ))}
    </span>
  );
};

// Used only outside a ScrollSection: tracks its own position.
const Standalone = (props) => {
  const ref = useRef(null);
  const progress = useSmoothScrollProgress(ref);
  return <Scatter {...props} progress={progress} elRef={ref} />;
};

/**
 * Scroll-driven per-character scatter for section headings.
 * Adapted from Skiper31 / CharacterV1 (@gurvinder-singh02, https://gxuri.me) —
 * the original drives progress off a 210vh pinned section; here it comes from
 * the enclosing ScrollSection, so the heading and its cards share one value.
 */
export default function ScrollScatterText({
  text,
  className = '',
  spread = 50,
  rotate = 50,
  style = {}
}) {
  const prefersReducedMotion = useReducedMotion();
  const shared = useSharedScrollProgress();

  if (prefersReducedMotion) {
    return <span className={className} style={style}>{text}</span>;
  }

  const props = { text, className, style, spread, rotate };
  return shared
    ? <Scatter {...props} progress={shared} />
    : <Standalone {...props} />;
}
