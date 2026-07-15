import React from 'react';
import { motion, useTransform } from 'framer-motion';

const nodes = {
  input: [
    { id: 'in-1', x: 80, y: 100 },
    { id: 'in-2', x: 80, y: 200 },
    { id: 'in-3', x: 80, y: 300 }
  ],
  hidden1: [
    { id: 'h1-1', x: 340, y: 60 },
    { id: 'h1-2', x: 340, y: 150 },
    { id: 'h1-3', x: 340, y: 250 },
    { id: 'h1-4', x: 340, y: 340 }
  ],
  hidden2: [
    { id: 'h2-1', x: 660, y: 60 },
    { id: 'h2-2', x: 660, y: 150 },
    { id: 'h2-3', x: 660, y: 250 },
    { id: 'h2-4', x: 660, y: 340 }
  ],
  output: [
    { id: 'out-1', x: 920, y: 120 },
    { id: 'out-2', x: 920, y: 280 }
  ]
};

export default function NeuralNetBackground({ scrollYProgress }) {
  // Layer 1 connections (Input -> Hidden 1) drawing progress
  const l1Path = useTransform(scrollYProgress, [0.05, 0.35], [0, 1]);
  const l1Opacity = useTransform(scrollYProgress, [0.05, 0.2], [0.05, 0.45]);

  // Layer 2 connections (Hidden 1 -> Hidden 2) drawing progress
  const l2Path = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const l2Opacity = useTransform(scrollYProgress, [0.35, 0.5], [0.05, 0.45]);

  // Layer 3 connections (Hidden 2 -> Output) drawing progress
  const l3Path = useTransform(scrollYProgress, [0.65, 0.95], [0, 1]);
  const l3Opacity = useTransform(scrollYProgress, [0.65, 0.8], [0.05, 0.45]);

  // Nodes opacity & scaling
  const inNodeOpacity = useTransform(scrollYProgress, [0, 0.15], [0.15, 0.95]);
  const inNodeScale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1.25]);

  const h1NodeOpacity = useTransform(scrollYProgress, [0.3, 0.42], [0.15, 0.95]);
  const h1NodeScale = useTransform(scrollYProgress, [0.3, 0.42], [0.8, 1.25]);

  const h2NodeOpacity = useTransform(scrollYProgress, [0.6, 0.72], [0.15, 0.95]);
  const h2NodeScale = useTransform(scrollYProgress, [0.6, 0.72], [0.8, 1.25]);

  const outNodeOpacity = useTransform(scrollYProgress, [0.9, 1.0], [0.15, 0.95]);
  const outNodeScale = useTransform(scrollYProgress, [0.9, 1.0], [0.8, 1.25]);

  const renderConnections = (fromNodes, toNodes, pathProgress, opacityProgress, activeColor) => {
    return fromNodes.flatMap((from) =>
      toNodes.map((to) => {
        const id = `${from.id}-${to.id}`;
        return (
          <React.Fragment key={id}>
            {/* Background static line */}
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--color-purple, #8B5CF6)"
              strokeWidth="1"
              opacity="0.03"
            />
            {/* Scroll-drawing line */}
            <motion.line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={activeColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{
                pathLength: pathProgress,
                opacity: opacityProgress,
              }}
            />
          </React.Fragment>
        );
      })
    );
  };

  const renderNodes = (nodeList, opacity, scale, color) => {
    return nodeList.map((node) => (
      <g key={node.id}>
        {/* Background faded node */}
        <circle
          cx={node.x}
          cy={node.y}
          r="6"
          fill="var(--color-text-secondary, #5E4E70)"
          opacity="0.1"
        />
        {/* Active glowing node */}
        <motion.circle
          cx={node.x}
          cy={node.y}
          r="7"
          fill={color}
          style={{
            opacity,
            scale,
            filter: `drop-shadow(0px 0px 4px ${color})`
          }}
        />
      </g>
    ));
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.75
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 400"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Connections */}
        {renderConnections(nodes.input, nodes.hidden1, l1Path, l1Opacity, "var(--color-purple, #8B5CF6)")}
        {renderConnections(nodes.hidden1, nodes.hidden2, l2Path, l2Opacity, "var(--color-pink, #ef155e)")}
        {renderConnections(nodes.hidden2, nodes.output, l3Path, l3Opacity, "var(--color-pink, #ef155e)")}

        {/* Nodes */}
        {renderNodes(nodes.input, inNodeOpacity, inNodeScale, "var(--color-purple, #8B5CF6)")}
        {renderNodes(nodes.hidden1, h1NodeOpacity, h1NodeScale, "var(--color-purple, #8B5CF6)")}
        {renderNodes(nodes.hidden2, h2NodeOpacity, h2NodeScale, "var(--color-pink, #ef155e)")}
        {renderNodes(nodes.output, outNodeOpacity, outNodeScale, "var(--color-pink, #ef155e)")}
      </svg>
    </div>
  );
}
