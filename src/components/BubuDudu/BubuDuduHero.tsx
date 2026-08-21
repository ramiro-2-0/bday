import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BubuAnimation from './BubuAnimation';
import DuduAnimation from './DuduAnimation';
import LandingCake from './LandingCake';

interface Props {
  blowCount: number;
  onBlow: () => void;
}

export const BubuDuduHero: React.FC<Props> = ({ blowCount, onBlow }) => {
  const isExtinguished = blowCount >= 3;

  // Speech bubble text based on blow count
  const getSpeechText = () => {
    if (blowCount === 0) return 'Namrata! Blow the candle to make your wish! 🎂';
    if (blowCount === 1) return '💨 Pffff! Good try! Blow harder! (1/3) 🌬️';
    if (blowCount === 2) return '💨💨 Almost there! One BIG breath! (2/3) 🌬️';
    return '🎉 YAY! HAPPY BIRTHDAY NAMRATA! 💖✨';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Dynamic Speech Bubble */}
      <motion.div
        key={`speech-${blowCount}`}
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="speech-bubble"
        style={{
          borderColor: isExtinguished ? '#FF6584' : '#382417',
          background: isExtinguished ? '#FFF0F5' : '#FFFFFF',
        }}
      >
        <span style={{ fontSize: '1.4rem' }}>
          {isExtinguished ? '🥳' : blowCount === 0 ? '🐻' : '🌬️'}
        </span>
        <span>{getSpeechText()}</span>
      </motion.div>

      {/* Characters + Cake in Sunny Meadow Scene */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '8px',
          position: 'relative',
          margin: '10px 0 20px',
        }}
      >
        {/* Bubu (Brown Bear) on Left */}
        <div style={{ transform: 'translateX(20px)', zIndex: 3 }}>
          <BubuAnimation size={170} isCelebrating={isExtinguished} />
        </div>

        {/* Interactive Cake with Candle in the Middle */}
        <div style={{ zIndex: 4, margin: '0 -24px -10px' }}>
          <LandingCake blowCount={blowCount} isBlown={blowCount} onBlow={onBlow} />
        </div>

        {/* Dudu (White Panda) on Right */}
        <div style={{ transform: 'translateX(-20px)', zIndex: 3 }}>
          <DuduAnimation size={170} isCelebrating={isExtinguished} />
        </div>
      </div>

      {/* Celebration Hearts / Emojis popping out when blown */}
      <AnimatePresence>
        {isExtinguished && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 1], opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              top: '-30px',
              display: 'flex',
              gap: '16px',
              fontSize: '2.5rem',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <motion.span animate={{ y: [-10, 10, -10], rotate: [-10, 10, -10] }} transition={{ duration: 1.5, repeat: Infinity }}>💖</motion.span>
            <motion.span animate={{ y: [10, -10, 10], scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>🎉</motion.span>
            <motion.span animate={{ y: [-10, 10, -10], rotate: [10, -10, 10] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>💕</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BubuDuduHero;
