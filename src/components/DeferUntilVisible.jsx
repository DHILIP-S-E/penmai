import React, { useRef, useState, useEffect, Suspense } from 'react';

/**
 * Renders its children only once the placeholder nears the viewport.
 *
 * React.lazy on its own is not enough here: a lazy component starts fetching as
 * soon as it is *rendered*, and these all sit in the tree from the first paint.
 * That would still pull every chunk down on load. Gating on intersection means
 * the chunk — gsap, for the crowd canvas — is only fetched by visitors who
 * actually scroll that far.
 *
 * The wrapper must reserve the final height via `style`/`className`, otherwise
 * swapping the placeholder for the real component shifts the page and costs CLS.
 */
export default function DeferUntilVisible({
  children,
  className = '',
  style = {},
  rootMargin = '400px'
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Start fetching before it scrolls in, so the chunk is ready on arrival.
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {visible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
