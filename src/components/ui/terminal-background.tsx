"use client";

import React, { useEffect, useState } from 'react';

const TerminalBackground = ({ className = '' }: { className?: string }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [cursor, setCursor] = useState(true);

  const terminalLines = [
    '$ initializing learning protocol...',
    '✓ AI model loaded successfully',
    '✓ Knowledge graph initialized',
    '✓ Neural pathways activated',
    '$ connecting to principle.ai...',
    '✓ Connection established',
    '✓ Ready for deconstruction',
    '$ awaiting user input...',
  ];

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentText = '';

    const typewriter = () => {
      if (lineIndex < terminalLines.length) {
        if (charIndex < terminalLines[lineIndex].length) {
          currentText += terminalLines[lineIndex][charIndex];
          setCurrentLine(currentText);
          charIndex++;
          setTimeout(typewriter, Math.random() * 50 + 30);
        } else {
          setLines(prev => [...prev, currentText]);
          setCurrentLine('');
          currentText = '';
          charIndex = 0;
          lineIndex++;
          setTimeout(typewriter, 500);
        }
      } else {
        // Reset after all lines are done
        setTimeout(() => {
          setLines([]);
          setCurrentLine('');
          lineIndex = 0;
          charIndex = 0;
          currentText = '';
          setTimeout(typewriter, 2000);
        }, 3000);
      }
    };

    const timer = setTimeout(typewriter, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(var(--muted-foreground)) 1px, transparent 1px),
              linear-gradient(hsl(var(--muted-foreground)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Terminal window */}
      <div className="absolute top-8 right-8 w-80 bg-black/90 backdrop-blur-sm rounded-lg border border-green-500/20 shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-green-500/20">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
          </div>
          <div className="text-xs text-green-400/60 font-mono">principle.ai/terminal</div>
        </div>
        
        {/* Terminal content */}
        <div className="p-4 h-48 overflow-hidden">
          <div className="font-mono text-xs space-y-1">
            {lines.map((line, index) => (
              <div key={index} className="text-green-400/80">
                {line}
              </div>
            ))}
            {currentLine && (
              <div className="text-green-400/80">
                {currentLine}
                <span className={`inline-block w-2 h-3 bg-green-400 ml-1 ${cursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                  
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-primary/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.01] via-transparent to-primary/[0.02]"></div>
    </div>
  );
};

export default TerminalBackground;
