import { useEffect } from 'react';

// Elements running `animation: ... infinite`. These repaint every frame for the
// life of the page, on-screen or not — and the shimmer underline is on every
// heading, so the cost scales with the number of sections.
const SELECTOR = [
  '.section-heading-underline',
  '.float-animation',
  '.spin-slow',
  '.glow-pulse'
].join(',');

/**
 * Pauses infinite CSS animations while their element is outside the viewport.
 *
 * Pausing is done with a class rather than inline style so the ::after
 * pseudo-element (which carries the shimmer) can be paused too — pseudo
 * elements are unreachable from JS.
 */
export default function usePauseOffscreenAnimations() {
  useEffect(() => {
    const els = document.querySelectorAll(SELECTOR);
    if (!els.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('anim-paused', !entry.isIntersecting);
        });
      },
      { rootMargin: '50px' }
    );

    els.forEach((el) => {
      // Start paused; the observer fires immediately for anything on-screen.
      el.classList.add('anim-paused');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
