'use client';

import React, { useEffect, useRef } from 'react';

const FaultyTerminalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Terminal grid pattern
    const gridSize = 20;
    const chars = ['0', '1', '>', '$', '#', '@', '%', '&', '*', '+', '-', '=', '|', '\\', '/', '?'];
    const positions: Array<{ x: number; y: number; char: string; opacity: number; speed: number }> = [];

    // Initialize characters
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        if (Math.random() < 0.1) { // 10% chance to place a character
          positions.push({
            x,
            y,
            char: chars[Math.floor(Math.random() * chars.length)],
            opacity: Math.random() * 0.3 + 0.05,
            speed: Math.random() * 0.002 + 0.001
          });
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set font and style
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(107, 114, 128, 0.1)'; // Very light gray for white theme

      positions.forEach((pos, index) => {
        // Flicker effect
        pos.opacity += (Math.random() - 0.5) * pos.speed;
        pos.opacity = Math.max(0, Math.min(0.4, pos.opacity));

        // Occasionally change character (glitch effect)
        if (Math.random() < 0.001) {
          pos.char = chars[Math.floor(Math.random() * chars.length)];
        }

        // Draw character
        ctx.globalAlpha = pos.opacity;
        ctx.fillText(pos.char, pos.x, pos.y);
      });

      // Add some scan lines
      ctx.globalAlpha = 0.01;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.05)'; // Very subtle blue accent
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
      }}
    />
  );
};

export default FaultyTerminalBackground;