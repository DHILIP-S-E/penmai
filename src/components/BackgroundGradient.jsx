import React from 'react';

/**
 * Animated gradient border/glow for cards.
 * Ported from Aceternity UI's BackgroundGradient (Tailwind + framer-motion) to
 * this project's plain-CSS idiom, and recoloured to the PenmAI palette.
 *
 * The drift is a CSS keyframe rather than a framer-motion variant: the page
 * renders ~12 of these (2 layers each), and CSS keeps it on the compositor
 * instead of ticking 24 JS animations a frame. Styles live in index.css.
 */
const BackgroundGradient = ({
  children,
  className = '',
  containerClassName = '',
  animate = true,
  style = {}
}) => {
  const layerClass = animate ? 'bg-gradient-animate' : '';

  return (
    <div className={`bg-gradient-container ${containerClassName}`.trim()} style={style}>
      <div className={`bg-gradient-layer bg-gradient-glow ${layerClass}`.trim()} />
      <div className={`bg-gradient-layer bg-gradient-edge ${layerClass}`.trim()} />
      <div className={`bg-gradient-content ${className}`.trim()}>{children}</div>
    </div>
  );
};

export default BackgroundGradient;
