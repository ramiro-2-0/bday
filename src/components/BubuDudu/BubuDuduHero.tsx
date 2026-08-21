import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import BubuAnimation from './BubuAnimation';
import DuduAnimation from './DuduAnimation';

interface Props {
  onAnimationComplete?: () => void;
}

const BubuDuduHero: React.FC<Props> = ({ onAnimationComplete }) => {
  const heartsRef = useRef<HTMLDivElement>(null);
  const bubuRef = useRef<HTMLDivElement>(null);
  const duduRef = useRef<HTMLDivElement>(null);
  const cakeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onAnimationComplete });

      // Initial positions off-screen
      gsap.set(bubuRef.current, { x: -300, opacity: 0 });
      gsap.set(duduRef.current, { x: 300, opacity: 0 });
      gsap.set(cakeRef.current, { scale: 0, opacity: 0, y: 20 });

      // 1. Bears slide in
      tl.to(bubuRef.current, { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.4)' })
        .to(duduRef.current, { x: 0, opacity: 1, duration: 1, ease: 'back.out(1.4)' }, '<0.2')
        // 2. Bears bounce toward each other
        .to([bubuRef.current, duduRef.current], {
          scale: 1.08,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        })
        // 3. Cake pop up
        .to(cakeRef.current, {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.2')
        // 4. Burst hearts
        .call(() => burstHearts(heartsRef.current));
    });

    return () => ctx.revert();
  }, [onAnimationComplete]);

  const burstHearts = (container: HTMLDivElement | null) => {
    if (!container) return;
    const heartEmojis = ['💖', '💕', '🌸', '✨', '💝', '🎂', '🎉', '💗'];
    for (let i = 0; i < 18; i++) {
      const heart = document.createElement('div');
      heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      heart.style.cssText = `
        position: absolute;
        font-size: ${Math.random() * 16 + 16}px;
        left: ${Math.random() * 100}%;
        top: 50%;
        pointer-events: none;
        z-index: 10;
      `;
      container.appendChild(heart);
      gsap.to(heart, {
        y: -(Math.random() * 200 + 100),
        x: (Math.random() - 0.5) * 200,
        opacity: 0,
        duration: Math.random() * 1.5 + 1,
        ease: 'power2.out',
        delay: Math.random() * 0.5,
        onComplete: () => heart.remove(),
      });
    }
  };

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '0px' }}>
      <div ref={heartsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }} />

      {/* Bubu (pink bear) on left */}
      <motion.div ref={bubuRef} style={{ display: 'inline-block' }}>
        <BubuAnimation size={160} />
      </motion.div>

      {/* Cake in the middle */}
      <div ref={cakeRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', padding: '0 8px' }}>
        <svg viewBox="0 0 100 100" width="90" height="90" xmlns="http://www.w3.org/2000/svg">
          {/* Candles */}
          <rect x="38" y="12" width="6" height="20" rx="3" fill="#FF8DA1" />
          <rect x="56" y="8" width="6" height="24" rx="3" fill="#C77DFF" />
          {/* Flames */}
          <ellipse cx="41" cy="10" rx="4" ry="6" fill="#FFD700" opacity="0.9">
            <animate attributeName="ry" values="6;8;6" dur="0.8s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="59" cy="6" rx="4" ry="6" fill="#FF7B7B" opacity="0.9">
            <animate attributeName="ry" values="6;8;6" dur="0.7s" repeatCount="indefinite" begin="0.2s" />
          </ellipse>
          {/* Cake tiers */}
          <rect x="22" y="48" width="56" height="26" rx="8" fill="#FF6B9D" />
          <rect x="15" y="68" width="70" height="24" rx="8" fill="#FF8DA1" />
          {/* Frosting drips */}
          <ellipse cx="50" cy="48" rx="28" ry="8" fill="#FFD6E7" />
          <ellipse cx="50" cy="68" rx="35" ry="8" fill="#FFD6E7" />
          {/* Sprinkles */}
          <rect x="30" y="55" width="8" height="3" rx="2" fill="#FFD700" transform="rotate(30 30 55)" />
          <rect x="55" y="58" width="8" height="3" rx="2" fill="#A8C8FF" transform="rotate(-20 55 58)" />
          <rect x="42" y="75" width="8" height="3" rx="2" fill="#C77DFF" transform="rotate(10 42 75)" />
          <rect x="65" y="74" width="8" height="3" rx="2" fill="#FFB347" transform="rotate(-30 65 74)" />
          {/* Stars */}
          <text x="32" y="66" fontSize="8" fill="white">★</text>
          <text x="58" y="63" fontSize="7" fill="#FFD700">★</text>
        </svg>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,183,197,0.7)', fontFamily: "'Nunito', sans-serif", marginTop: '-4px' }}>🎂</div>
      </div>

      {/* Dudu (blue bear) on right, flipped */}
      <motion.div ref={duduRef} style={{ display: 'inline-block', transform: 'scaleX(-1)' }}>
        <DuduAnimation size={160} />
      </motion.div>
    </div>
  );
};

export default BubuDuduHero;
