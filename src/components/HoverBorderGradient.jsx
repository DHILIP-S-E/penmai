import React from 'react';

/**
 * Pill button with an animated gradient border that sweeps around the edge.
 * Ported from Aceternity UI's HoverBorderGradient (Tailwind + framer-motion) to
 * this project's plain-CSS idiom, and recoloured to the PenmAI palette.
 *
 * Upstream rotates the border by swapping framer-motion radial-gradient
 * variants on an interval; this uses a single conic-gradient square spun by a
 * CSS keyframe, which stays on the compositor and needs no JS tick. Styles live
 * in index.css alongside .btn-gradient, whose fill and hover this matches so the
 * CTA keeps its weight next to the rest of the site's buttons.
 *
 * @param as - element to render ('button' default, 'a' for links)
 * @param duration - seconds for one full sweep of the border
 */
const HoverBorderGradient = ({
  children,
  as: Tag = 'button',
  className = '',
  containerClassName = '',
  duration = 2.5,
  style = {},
  ...props
}) => {
  return (
    <Tag
      className={`hbg-container ${containerClassName}`.trim()}
      style={{ '--hbg-duration': `${duration}s`, ...style }}
      {...props}
    >
      <span className="hbg-border" aria-hidden="true" />
      <span className={`hbg-content ${className}`.trim()}>{children}</span>
    </Tag>
  );
};

export default HoverBorderGradient;
