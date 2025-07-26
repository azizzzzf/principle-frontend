"use client";

import React from 'react';

interface FloatingTerminalProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const FloatingTerminal: React.FC<FloatingTerminalProps> = ({ 
  position = 'top-right', 
  size = 'md',
  className = '' 
}) => {
  const positionClasses = {
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
  };

  const sizeClasses = {
    'sm': 'w-64 h-32',
    'md': 'w-80 h-48',
    'lg': 'w-96 h-64',
  };

  return (
    <div className={`absolute ${positionClasses[position]} ${sizeClasses[size]} bg-black/90 backdrop-blur-sm rounded-lg border border-green-500/20 shadow-2xl pointer-events-none z-10 ${className}`}>
      {/* Terminal header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
        </div>
        <div className="text-xs text-green-400/60 font-mono">principle.ai</div>
      </div>
      
      {/* Terminal content */}
      <div className="p-4 h-full overflow-hidden">
        <div className="font-mono text-xs space-y-1">
          <div className="text-green-400/80">$ connecting to neural network...</div>
          <div className="text-green-400/60">✓ consciousness.dll loaded</div>
          <div className="text-green-400/60">✓ knowledge_graph initialized</div>
          <div className="text-green-400/80">$ ready for deconstruction</div>
          <div className="text-green-400/60 animate-pulse">▋</div>
        </div>
      </div>
    </div>
  );
};

export default FloatingTerminal;
