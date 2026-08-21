import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundScene: React.FC = () => {
  return (
    <div className="app-bg">
      {/* Sun glow in the top-right corner */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-80px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 235, 120, 0.95) 0%, rgba(255, 210, 63, 0.4) 50%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(10px)',
        }}
      />

      {/* Fluffy Heart-Shaped Cloud 1 (Top Left) */}
      <motion.div
        className="heart-cloud"
        style={{ top: '8%', left: '6%' }}
        animate={{
          x: [-15, 15, -15],
          y: [0, -8, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="140" height="120" viewBox="0 0 140 120" fill="none">
          {/* Heart cloud shape */}
          <path
            d="M70 105 C20 75 0 45 20 20 C38 -2 65 8 70 28 C75 8 102 -2 120 20 C140 45 120 75 70 105 Z"
            fill="#FFFFFF"
          />
          <circle cx="45" cy="50" r="32" fill="#FFFFFF" />
          <circle cx="95" cy="50" r="32" fill="#FFFFFF" />
          <circle cx="70" cy="40" r="28" fill="#FFFFFF" />
          <ellipse cx="70" cy="72" rx="45" ry="25" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Cloud 2 (Top Center-Right) */}
      <motion.div
        className="heart-cloud"
        style={{ top: '15%', right: '12%' }}
        animate={{
          x: [15, -15, 15],
          y: [0, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <svg width="110" height="90" viewBox="0 0 140 120" fill="none">
          <path
            d="M70 105 C20 75 0 45 20 20 C38 -2 65 8 70 28 C75 8 102 -2 120 20 C140 45 120 75 70 105 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          <circle cx="45" cy="50" r="32" fill="#FFFFFF" />
          <circle cx="95" cy="50" r="32" fill="#FFFFFF" />
          <circle cx="70" cy="40" r="28" fill="#FFFFFF" />
          <ellipse cx="70" cy="72" rx="45" ry="25" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Cloud 3 (Mid Left) */}
      <motion.div
        className="heart-cloud"
        style={{ top: '42%', left: '-30px', opacity: 0.8 }}
        animate={{
          x: [-10, 20, -10],
          y: [0, 6, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
          <ellipse cx="80" cy="50" rx="70" ry="25" fill="#FFFFFF" />
          <circle cx="50" cy="40" r="30" fill="#FFFFFF" />
          <circle cx="95" cy="35" r="32" fill="#FFFFFF" />
          <circle cx="125" cy="45" r="24" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Cloud 4 (Mid Right) */}
      <motion.div
        className="heart-cloud"
        style={{ top: '36%', right: '-20px', opacity: 0.85 }}
        animate={{
          x: [10, -20, 10],
          y: [0, -6, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <svg width="150" height="75" viewBox="0 0 160 80" fill="none">
          <ellipse cx="80" cy="50" rx="70" ry="25" fill="#FFFFFF" />
          <circle cx="55" cy="38" r="28" fill="#FFFFFF" />
          <circle cx="105" cy="35" r="30" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Rolling Hills & Meadow Landscape */}
      <div className="bg-landscape">
        <div className="hill-back" />
        <div className="hill-mid" />
        <div className="meadow-front">
          {/* Scattered cute daisies / little flowers across the meadow */}
          <div className="daisy" style={{ bottom: '40px', left: '8%' }} />
          <div className="daisy" style={{ bottom: '85px', left: '16%' }} />
          <div className="daisy" style={{ bottom: '25px', left: '28%' }} />
          <div className="daisy" style={{ bottom: '60px', left: '42%' }} />
          <div className="daisy" style={{ bottom: '30px', left: '58%' }} />
          <div className="daisy" style={{ bottom: '80px', left: '72%' }} />
          <div className="daisy" style={{ bottom: '35px', left: '85%' }} />
          <div className="daisy" style={{ bottom: '90px', left: '92%' }} />
        </div>
      </div>
    </div>
  );
};

export default BackgroundScene;
