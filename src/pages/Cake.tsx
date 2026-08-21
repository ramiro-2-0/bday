import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import BubuAnimation from '../components/BubuDudu/BubuAnimation';
import DuduAnimation from '../components/BubuDudu/DuduAnimation';
import LandingCake from '../components/BubuDudu/LandingCake';
import { sounds } from '../utils/sounds';

export const CakePage: React.FC = () => {
  const [blowCount, setBlowCount] = useState<number>(0);
  const [isBlowingAnim, setIsBlowingAnim] = useState<boolean>(false);

  const handleBlow = () => {
    if (blowCount >= 3 || isBlowingAnim) return;

    setIsBlowingAnim(true);
    const nextCount = blowCount + 1;
    setBlowCount(nextCount);

    sounds.playBlowSound(nextCount);

    if (nextCount === 3) {
      setTimeout(() => {
        sounds.playCelebrationChime();

        // Confetti Fireworks
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FF6584', '#FFD23F', '#54B5DB', '#FFAEC0', '#FFFFFF', '#62B872'],
        });

        setTimeout(() => {
          confetti({ particleCount: 80, spread: 120, origin: { x: 0.25, y: 0.5 } });
          confetti({ particleCount: 80, spread: 120, origin: { x: 0.75, y: 0.5 } });
        }, 350);

        setIsBlowingAnim(false);
      }, 500);
    } else {
      setTimeout(() => {
        setIsBlowingAnim(false);
      }, 400);
    }
  };

  const handleReset = () => {
    setBlowCount(0);
  };

  const isExtinguished = blowCount >= 3;

  return (
    <div className="landing-page container">
      <div className="page-header" style={{ padding: '20px 0 30px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="landing-badge"
          style={{ marginBottom: '14px' }}
        >
          <span>🎂</span>
          <span>INTERACTIVE BIRTHDAY CAKE</span>
          <span>🎂</span>
        </motion.div>

        <motion.h1
          className="heading-display"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 3.8rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isExtinguished ? '🎉 Wish Sent to the Stars! ⭐' : 'Make a Wish, Namrata! 🎂'}
        </motion.h1>

        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isExtinguished
            ? 'All your dreams and wishes are going to come true! 💕'
            : 'Take a deep breath and blow out the candle 3 times! 🌬️'}
        </motion.p>
      </div>

      {/* Speech Bubble */}
      <motion.div
        key={`cake-speech-${blowCount}`}
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="speech-bubble"
        style={{
          borderColor: isExtinguished ? '#FF6584' : '#382417',
          background: isExtinguished ? '#FFF0F5' : '#FFFFFF',
        }}
      >
        <span style={{ fontSize: '1.4rem' }}>
          {isExtinguished ? '🥳' : blowCount === 0 ? '🐻' : '🌬️'}
        </span>
        <span>
          {blowCount === 0
            ? 'Namrata! Blow me 3 times! 🎂'
            : blowCount === 1
            ? '💨 Pfff! Good blow! Blow 2 more times! (1/3)'
            : blowCount === 2
            ? '💨💨 Almost out! One giant breath! (2/3)'
            : '🎉 HAPPY BIRTHDAY NAMRATA! 💖'}
        </span>
      </motion.div>

      {/* Characters + Big Cake */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '8px',
          margin: '10px 0 24px',
        }}
      >
        <div style={{ transform: 'translateX(20px)', zIndex: 3 }}>
          <BubuAnimation size={170} isCelebrating={isExtinguished} />
        </div>

        <div style={{ zIndex: 4, margin: '0 -24px -10px' }}>
          <LandingCake blowCount={blowCount} isBlown={blowCount} onBlow={handleBlow} />
        </div>

        <div style={{ transform: 'translateX(-20px)', zIndex: 3 }}>
          <DuduAnimation size={170} isCelebrating={isExtinguished} />
        </div>
      </div>

      {/* Blow Action Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0 32px' }}>
        {!isExtinguished ? (
          <>
            <div className="blow-meter-container">
              <div className={`blow-step-dot ${blowCount >= 1 ? 'active' : ''}`} />
              <div className={`blow-step-dot ${blowCount >= 2 ? 'active' : ''}`} />
              <div className={`blow-step-dot ${blowCount >= 3 ? 'active' : ''}`} />
            </div>

            <motion.button
              className="btn-primary"
              onClick={handleBlow}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } }}
              style={{ fontSize: '1.25rem', padding: '16px 42px' }}
            >
              <span style={{ fontSize: '1.5rem' }}>🌬️</span>
              <span>{blowCount === 0 ? 'Blow Me! 🎂' : `Blow Again! (${blowCount}/3) 💨`}</span>
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <button className="btn-secondary" onClick={handleReset}>
              🕯️ Relight & Blow Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CakePage;
