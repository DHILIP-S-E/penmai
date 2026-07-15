import { createContext, useContext } from 'react';
import { useScroll, useSpring } from 'framer-motion';

/**
 * One motion language for the whole page.
 *
 * Raw scrollYProgress tracks the wheel exactly, and a wheel notch is a large
 * discrete jump — so transforms driven straight off it land in visible steps.
 * The Skiper31 original hides this by running Lenis, which interpolates scroll
 * into a smooth stream. Rather than take over native scrolling site-wide, we
 * damp the progress value itself: same silky result, scroll stays untouched.
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

/**
 * One scroll tracker per section, shared by everything inside it.
 *
 * Each useScroll instance re-measures its target's geometry on every scroll.
 * With a tracker per heading, per card grid and per reveal that reached ~30
 * independent measurements per scroll, and Lighthouse attributed 2275ms of
 * Style & Layout to it. Sharing one progress per section collapses that to one
 * measurement, and has the side benefit that a heading and its cards are
 * driven by literally the same value, so they cannot drift apart.
 *
 * A null value means "no provider above me" — components fall back to tracking
 * themselves, so they still work outside a ScrollSection.
 */
export const ScrollProgressContext = createContext(null);

export const useSharedScrollProgress = () => useContext(ScrollProgressContext);
