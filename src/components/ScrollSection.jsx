import React, { useRef } from 'react';
import { ScrollProgressContext, useSmoothScrollProgress } from './motion';

/**
 * A <section> that owns the single scroll tracker for everything inside it.
 *
 * Drop-in for a plain <section>: all props pass through. Any ScrollScatterText,
 * ScrollScatterGroup or ScrollReveal rendered below picks the progress up from
 * context instead of measuring itself.
 */
export default function ScrollSection({ children, ...rest }) {
  const ref = useRef(null);
  const progress = useSmoothScrollProgress(ref);

  return (
    <section ref={ref} {...rest}>
      <ScrollProgressContext.Provider value={progress}>
        {children}
      </ScrollProgressContext.Provider>
    </section>
  );
}
