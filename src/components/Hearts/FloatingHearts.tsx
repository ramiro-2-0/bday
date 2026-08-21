import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HEARTS = ['💖', '💕', '🌸', '✨', '💗', '🌺', '💝', '⭐'];
const POSITIONS = [5, 12, 20, 30, 42, 55, 65, 75, 85, 93];
const DELAYS = [0, 1.5, 3, 2, 0.8, 4, 1.2, 2.8, 0.4, 3.5];
const DURATIONS = [8, 10, 9, 11, 7, 12, 8.5, 9.5, 10.5, 7.5];

const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hearts = containerRef.current?.querySelectorAll('.floating-heart');
    if (!hearts) return;

    hearts.forEach((heart, i) => {
      gsap.fromTo(
        heart,
        {
          y: '100vh',
          opacity: 0,
          rotate: Math.random() * 30 - 15,
          scale: Math.random() * 0.5 + 0.5,
        },
        {
          y: '-15vh',
          opacity: 0,
          duration: DURATIONS[i % DURATIONS.length],
          delay: DELAYS[i % DELAYS.length],
          repeat: -1,
          ease: 'none',
          keyframes: [
            { opacity: 0, y: '100vh', duration: 0 },
            { opacity: 0.6, y: '50vh', duration: DURATIONS[i % DURATIONS.length] * 0.3 },
            { opacity: 0.4, y: '0vh', duration: DURATIONS[i % DURATIONS.length] * 0.4 },
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
        zIndex: 0,
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
            fontSize: `${Math.random() * 10 + 14}px`,
            animationDelay: `${DELAYS[i % DELAYS.length]}s`,
            animationDuration: `${DURATIONS[i % DURATIONS.length]}s`,
          }}
        >
          {HEARTS[i % HEARTS.length]}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
