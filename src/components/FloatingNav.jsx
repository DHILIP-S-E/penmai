import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * Floating pill navigation that hides on scroll-down and reveals on scroll-up.
 * Ported from Aceternity UI's FloatingNav (Tailwind-based) to this project's
 * plain-CSS idiom, and recoloured to the PenmAI palette.
 *
 * Two deliberate departures from upstream:
 *
 * 1. Upstream wraps the bar in <AnimatePresence>, but the bar never unmounts —
 *    it animates between y:0 and y:-100 — so AnimatePresence has nothing to do.
 *    Dropped.
 *
 * 2. Upstream drives visibility off scrollYProgress (0..1 of total page height),
 *    so its "am I near the top?" threshold of 0.05 means a different pixel
 *    distance on every page. This uses scrollY in pixels, so REVEAL_AT_TOP is an
 *    actual distance and behaves the same regardless of how long the page grows.
 *
 * The bar is centred with left/right/margin rather than translateX(-50%),
 * because framer-motion owns `transform` to animate y and would overwrite it.
 */

// Above this scroll depth (px) the bar is pinned open regardless of direction.
const REVEAL_AT_TOP = 80;

export default function FloatingNav({ navItems, logo = 'PenmAI 2.0', children }) {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(true);

  useMotionValueEvent(scrollY, 'change', (current) => {
    if (current < REVEAL_AT_TOP) {
      setVisible(true);
      return;
    }
    const previous = scrollY.getPrevious() ?? 0;
    setVisible(current < previous);
  });

  return (
    <motion.div
      className="floating-nav"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <a href="#top" className="floating-nav__logo">{logo}</a>

      <nav className="floating-nav__links desktop-sidebar">
        {navItems.map((item) => (
          <a key={item.link} href={item.link} className="floating-nav__link">
            {item.name}
          </a>
        ))}
      </nav>

      <div className="floating-nav__actions">{children}</div>
    </motion.div>
  );
}
