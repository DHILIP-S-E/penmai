import { useScroll, useSpring } from 'framer-motion';

/**
 * One motion language for the whole page.
 *
 * Raw scrollYProgress tracks the wheel exactly, and a wheel notch is a large
 * discrete jump — so transforms driven straight off it land in visible steps.
 * The Skiper31 original hides this by running Lenis, which interpolates scroll
 * into a smooth stream. Rather than take over native scrolling site-wide, we
 * damp the progress value itself: same silky result, scroll stays untouched.
 *
 * Every scroll-driven component pulls its progress from here, so headings,
 * cards and reveals in a section all resolve together instead of drifting.
 */
/*
 * Tuned to be critically damped: damping ratio = damping / (2 * sqrt(stiffness))
 * = 35 / (2 * sqrt(300)) ~= 1.0. That is the fastest settle with no overshoot.
 *
 * Do not lower stiffness without raising damping to match. An overdamped spring
 * (ratio > 1) crawls toward its target, so cards visibly lag the scroll and can
 * sit unsettled — short of full opacity — even after scrolling has stopped.
 */
export const SCROLL_SPRING = {
  stiffness: 300,
  damping: 35,
  restDelta: 0.0005
};

// Progress runs 0 -> 1 as the element travels from entering the viewport to
// sitting at its centre.
export const SCROLL_OFFSET = ['start end', 'center center'];

export const useSmoothScrollProgress = (ref, offset = SCROLL_OFFSET) => {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return useSpring(scrollYProgress, SCROLL_SPRING);
};
