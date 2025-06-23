"use client";

import { memo } from 'react';

const GridBackground = memo(function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Orange grid pattern - more visible */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.8) 0.5px, transparent 0.5px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.8) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Orange dots at intersections - more visible */}
      <div 
        className="absolute inset-0 opacity-[0.08] dark:opacity-[0.06]"
        style={{
          backgroundImage: `radial-gradient(circle at 0.5px 0.5px, rgba(245, 158, 11, 1) 0.8px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
    </div>
  );
});

GridBackground.displayName = 'GridBackground';

export default GridBackground;
