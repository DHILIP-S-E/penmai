import React, { useRef, useState, useEffect, Children } from 'react';
import { motion, useTransform, useReducedMotion } from 'framer-motion';
import { useSmoothScrollProgress, useSharedScrollProgress } from './motion';

// Below this width the grids collapse to a single column, so a full-strength
// horizontal fan would throw items far off-screen. Scale it right down.
const NARROW_BREAKPOINT = 640;
const NARROW_SPREAD_FACTOR = 0.22;

const useSpreadFactor = () => {
  const [factor, setFactor] = useState(1);
  useEffect(() => {
    const update = () =>
      setFactor(window.innerWidth < NARROW_BREAKPOINT ? NARROW_SPREAD_FACTOR : 1);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return factor;
};

// One grid item: starts fanned out from the row's centre, converges on scroll.
const Item = ({ child, index, centerIndex, scrollYProgress, spread, rotate, lift, itemClassName }) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * spread, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [distanceFromCenter * rotate, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [-Math.abs(distanceFromCenter) * lift, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.75, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [0, 0.9, 1]);

  return (
    <motion.div
      className={itemClassName}
      style={{
        x,
        y,
        rotate: rotateZ,
        scale,
        opacity,
        transformOrigin: 'center',
        willChange: 'transform, opacity',
        minWidth: 0
      }}
    >
      {child}
    </motion.div>
  );
};

const Group = ({ children, className, style, spread, rotate, lift, itemClassName, progress, elRef }) => {
  const spreadFactor = useSpreadFactor();
  const items = Children.toArray(children);
  const centerIndex = (items.length - 1) / 2;
  const effectiveSpread = spread * spreadFactor;

  return (
    <div ref={elRef} className={className} style={style}>
      {items.map((child, index) => (
        <Item
          key={index}
          child={child}
          index={index}
          centerIndex={centerIndex}
          scrollYProgress={progress}
          spread={effectiveSpread}
          rotate={rotate}
          lift={lift}
          itemClassName={itemClassName}
        />
      ))}
    </div>
  );
};

// Used only outside a ScrollSection: tracks its own position.
const Standalone = (props) => {
  const ref = useRef(null);
  const progress = useSmoothScrollProgress(ref);
  return <Group {...props} progress={progress} elRef={ref} />;
};

/**
 * Scroll-driven scatter for a row/grid of elements — the element-level
 * counterpart to ScrollScatterText. Adapted from Skiper31 / CharacterV3
 * (@gurvinder-singh02, https://gxuri.me), which scatters an array of items by
 * each one's distance from the centre index.
 *
 * Pass the grid styles in via `style` — this component renders the grid itself,
 * so each child becomes a grid item and existing layout is preserved.
 */
export default function ScrollScatterGroup({
  children,
  className = '',
  style = {},
  spread = 90,
  rotate = 8,
  lift = 20,
  // Class applied to each animated element itself. Use when the item carries
  // layout CSS of its own (e.g. .timeline-item) that an extra wrapper would break.
  itemClassName
}) {
  const prefersReducedMotion = useReducedMotion();
  const shared = useSharedScrollProgress();

  if (prefersReducedMotion) {
    return <div className={className} style={style}>{children}</div>;
  }

  const props = { children, className, style, spread, rotate, lift, itemClassName };
  return shared
    ? <Group {...props} progress={shared} />
    : <Standalone {...props} />;
}
