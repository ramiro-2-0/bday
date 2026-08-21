import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SUNNY_EMOJIS = ['💖', '🌸', '✨', '🌻', '💕', '🌼', '⭐', '🤍', '🍰'];
const POSITIONS = [4, 14, 24, 35, 48, 58, 68, 79, 88, 95];
const DELAYS = [0, 1.8, 0.6, 3.2, 1.2, 4.0, 2.2, 0.4, 3.0, 1.5];
const DURATIONS = [9, 11, 10, 12, 8.5, 13, 9.5, 10.5, 11.5, 8.0];

export const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = containerRef.current?.querySelectorAll('.floating-heart');
    if (!items) return;

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        {
          y: '105vh',
          opacity: 0,
          rotate: Math.random() * 40 - 20,
          scale: Math.random() * 0.4 + 0.6,
        },
        {
          y: '-15vh',
          opacity: 0,
          duration: DURATIONS[i % DURATIONS.length],
          delay: DELAYS[i % DELAYS.length],
          repeat: -1,
          ease: 'none',
          keyframes: [
            { opacity: 0, y: '105vh', duration: 0 },
            { opacity: 0.85, y: '60vh', duration: DURATIONS[i % DURATIONS.length] * 0.3 },
            { opacity: 0.7, y: '20vh', duration: DURATIONS[i % DURATIONS.length] * 0.4 },
            { opacity: 0, y: '-15vh', duration: DURATIONS[i % DURATIONS.length] * 0.3 },
          ],
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {POSITIONS.map((left, i) => (
        <div
          key={i}
          className="floating-heart"
          style={{
            left: `${left}%`,
            bottom: '-5%',
            fontSize: `${Math.random() * 8 + 18}px`,
            filter: 'drop-shadow(0 2px 6px rgba(255, 100, 140, 0.25))',
          }}
        >
          {SUNNY_EMOJIS[i % SUNNY_EMOJIS.length]}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
