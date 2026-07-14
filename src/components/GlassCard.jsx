import React from 'react';

const GlassCard = ({ children, className = '', interactive = false, onClick, ...props }) => {
  return (
    <div 
      className={`glass-panel ${interactive ? 'glass-card-interactive' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
