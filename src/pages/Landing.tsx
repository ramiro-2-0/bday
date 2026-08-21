import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import BubuDuduHero from '../components/BubuDudu/BubuDuduHero';
import { sounds } from '../utils/sounds';

export const Landing: React.FC = () => {
  const [blowCount, setBlowCount] = useState<number>(0);
  const [isBlowingAnim, setIsBlowingAnim] = useState<boolean>(false);

  const handleBlow = () => {
    if (blowCount >= 3 || isBlowingAnim) return;

    setIsBlowingAnim(true);
    const nextCount = blowCount + 1;
    setBlowCount(nextCount);

    // Play wind sound with increasing intensity
    sounds.playBlowSound(nextCount);

    if (nextCount === 3) {
      // Final 3rd Blow: Candle extinguished!
      setTimeout(() => {
        sounds.playCelebrationChime();

        // 🌟 Massive Rainbow Confetti Fireworks Storm!
        const count = 200;
        const defaults = {
          origin: { y: 0.65 },
          zIndex: 999,
        };

        function fire(particleRatio: number, opts: confetti.Options) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        fire(0.25, {
          spread: 30,
          startVelocity: 55,
          colors: ['#FF6584', '#FFD23F', '#54B5DB', '#FFAEC0'],
        });
        fire(0.2, {
          spread: 60,
          colors: ['#FFFFFF', '#FF8CA3', '#D0F355'],
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.9,
          colors: ['#FF6584', '#FFD23F', '#C49A76', '#54B5DB'],
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 30,
          decay: 0.92,
          scalar: 1.3,
          shapes: ['circle'],
        });
        fire(0.1, {
          spread: 140,
          startVelocity: 45,
        });

        // Extra celebratory bursts
        setTimeout(() => {
          confetti({ particleCount: 70, spread: 80, origin: { x: 0.2, y: 0.5 }, colors: ['#FF6584', '#FFD23F'] });
          confetti({ particleCount: 70, spread: 80, origin: { x: 0.8, y: 0.5 }, colors: ['#54B5DB', '#FFAEC0'] });
        }, 400);

        setIsBlowingAnim(false);
      }, 500);
    } else {
      setTimeout(() => {
        setIsBlowingAnim(false);
      }, 400);
    }
  };

  const handleRelight = () => {
    setBlowCount(0);
  };

  const isExtinguished = blowCount >= 3;

  return (
    <div className="landing-page container">
      {/* Top Cute Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="landing-badge"
      >
        <span>🌻</span>
        <span>A SPECIAL BIRTHDAY SURPRISE</span>
        <span>🌻</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        className="heading-display landing-title"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15, type: 'spring', stiffness: 300 }}
      >
        Happy Birthday, Namrata! 🎂
      </motion.h1>

      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        To the most beautiful, sweet, and adorable girl in the whole world 💕
      </motion.p>

      {/* Bubu & Dudu + Interactive Burning Candle Cake */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <BubuDuduHero blowCount={blowCount} onBlow={handleBlow} />
      </motion.div>

      {/* 3-Time Blow Interaction Area */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0 32px' }}>
        {/* Progress Step Indicators (0/3, 1/3, 2/3, 3/3) */}
        {!isExtinguished ? (
          <>
            <div className="blow-meter-container">
              <div className={`blow-step-dot ${blowCount >= 1 ? 'active' : ''}`} />
              <div className={`blow-step-dot ${blowCount >= 2 ? 'active' : ''}`} />
              <div className={`blow-step-dot ${blowCount >= 3 ? 'active' : ''}`} />
            </div>

            {/* Big Interactive "Blow Me!" Button */}
            <motion.button
              className="btn-primary"
              onClick={handleBlow}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              animate={{
                scale: [1, 1.04, 1],
              }}
              transition={{
                scale: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
              }}
              style={{ fontSize: '1.25rem', padding: '16px 42px' }}
            >
              <span style={{ fontSize: '1.5rem' }}>🌬️</span>
              <span>{blowCount === 0 ? 'Blow Me! 🎂' : `Blow Again! (${blowCount}/3) 💨`}</span>
            </motion.button>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-mid)', marginTop: '8px', fontWeight: 600 }}>
              (Click the button or tap the cake to blow 3 times!)
            </span>
          </>
        ) : (
          /* Celebratory Unlock Action Buttons */
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              width: '100%',
              maxWidth: '650px',
            }}
          >
            {/* Celebration Message Box */}
            <div
              className="glass-card"
              style={{
                padding: '24px 32px',
                width: '100%',
                textAlign: 'center',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '3px solid #FF6584',
              }}
            >
              <h2 style={{ fontFamily: 'var(--font-display)', color: '#FF6584', fontSize: '2rem', marginBottom: '8px' }}>
                🎉 Wish Granted! 🎉
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                May your birthday be filled with endless smiles, sweet moments, and all the love you bring into my life! 🌸💖
              </p>
            </div>

            {/* Navigation CTAs */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/wishes" className="btn-primary">
                💌 Read My Wishes
              </Link>
              <Link to="/memories" className="btn-secondary">
                📸 Our Memories
              </Link>
              <Link to="/letter" className="btn-ghost" style={{ border: '2.5px solid #FF6584', color: '#FF6584' }}>
                🌸 Secret Love Letter
              </Link>
              <button
                className="btn-ghost"
                onClick={handleRelight}
                style={{ fontSize: '0.95rem' }}
              >
                🕯️ Relight Candle
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Romantic Quote at bottom */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontFamily: 'var(--font-cute)',
          fontSize: '1.8rem',
          color: 'var(--text-mid)',
          marginTop: '10px',
        }}
      >
        "With you, every day feels like sunshine and warm cuddles" 🐻🤍🐼
      </motion.p>
    </div>
  );
};

export default Landing;
