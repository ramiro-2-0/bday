import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BubuDuduHero from '../components/BubuDudu/BubuDuduHero';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const Landing: React.FC = () => {
  const [animDone, setAnimDone] = useState(false);

  return (
    <div className="landing-page">
      {/* Top sparkle text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'backOut' }}
        style={{ marginBottom: '8px' }}
      >
        <span style={{ fontSize: '1.1rem', letterSpacing: '4px', color: 'rgba(255,183,197,0.6)', textTransform: 'uppercase', fontWeight: 700 }}>
          ✨ Happy Birthday ✨
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        className="heading-display landing-title"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'backOut' }}
      >
        Namrata 🎂
      </motion.h1>

      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{ fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)' }}
      >
        Today is all about you, my love 🌸
      </motion.p>

      {/* Bubu & Dudu Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="hero-characters"
      >
        <BubuDuduHero onAnimationComplete={() => setAnimDone(true)} />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={animDone ? 'visible' : 'hidden'}
        style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '32px' }}
      >
        <motion.div variants={itemVariants}>
          <Link to="/wishes" className="btn-primary">
            💌 See My Wishes
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link to="/memories" className="btn-ghost">
            📸 Our Memories
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link to="/cake" className="btn-ghost">
            🎂 Blow the Candles
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: animDone ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          marginTop: '48px',
          fontSize: '0.95rem',
          color: 'rgba(255,183,197,0.5)',
          fontFamily: "'Dancing Script', cursive",
          fontSize: '1.3rem',
        }}
      >
        "You are my today and all of my tomorrows" 💕
      </motion.p>
    </div>
  );
};

export default Landing;
