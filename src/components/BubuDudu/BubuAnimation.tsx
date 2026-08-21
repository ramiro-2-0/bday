import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  size?: number;
  animate?: boolean;
}

// Bubu - the pink bear 🩷
const BubuAnimation: React.FC<Props> = ({ size = 160, animate = true }) => {
  const idleVariants = animate ? {
    body: {
      y: [0, -6, 0],
      transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
    },
    ear: {
      rotate: [-3, 3, -3],
      transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
    },
    eye: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 3, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' },
    },
  } : {};

  return (
    <motion.div style={{ width: size, height: size * 1.2, position: 'relative', display: 'inline-block' }}>
      <motion.svg
        viewBox="0 0 160 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size * 1.2}
        animate={animate ? idleVariants.body : undefined}
      >
        {/* Shadow */}
        <ellipse cx="80" cy="188" rx="38" ry="6" fill="rgba(0,0,0,0.15)" />

        {/* Body */}
        <ellipse cx="80" cy="145" rx="46" ry="44" fill="#FFB7C5" />

        {/* Tummy */}
        <ellipse cx="80" cy="148" rx="26" ry="22" fill="#FFD6E7" />

        {/* Legs */}
        <ellipse cx="60" cy="182" rx="18" ry="12" fill="#FF8DA1" />
        <ellipse cx="100" cy="182" rx="18" ry="12" fill="#FF8DA1" />

        {/* Feet dots */}
        <circle cx="55" cy="185" r="3" fill="#FF6B9D" />
        <circle cx="60" cy="187" r="3" fill="#FF6B9D" />
        <circle cx="65" cy="185" r="3" fill="#FF6B9D" />
        <circle cx="95" cy="185" r="3" fill="#FF6B9D" />
        <circle cx="100" cy="187" r="3" fill="#FF6B9D" />
        <circle cx="105" cy="185" r="3" fill="#FF6B9D" />

        {/* Arms */}
        <ellipse cx="36" cy="148" rx="14" ry="18" fill="#FFB7C5" transform="rotate(-15 36 148)" />
        <ellipse cx="124" cy="148" rx="14" ry="18" fill="#FFB7C5" transform="rotate(15 124 148)" />

        {/* Head */}
        <motion.g animate={animate ? idleVariants.body : undefined}>
          <circle cx="80" cy="88" r="52" fill="#FFB7C5" />

          {/* Left ear */}
          <motion.g animate={animate ? idleVariants.ear : undefined} style={{ originX: '42px', originY: '50px' }}>
            <circle cx="42" cy="50" r="18" fill="#FFB7C5" />
            <circle cx="42" cy="50" r="10" fill="#FF8DA1" />
          </motion.g>

          {/* Right ear */}
          <motion.g animate={animate ? { rotate: [3, -3, 3], transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } } : undefined} style={{ originX: '118px', originY: '50px' }}>
            <circle cx="118" cy="50" r="18" fill="#FFB7C5" />
            <circle cx="118" cy="50" r="10" fill="#FF8DA1" />
          </motion.g>

          {/* Face - cheeks */}
          <circle cx="54" cy="98" r="12" fill="#FF8DA1" opacity="0.5" />
          <circle cx="106" cy="98" r="12" fill="#FF8DA1" opacity="0.5" />

          {/* Eyes */}
          <motion.g animate={animate ? idleVariants.eye : undefined} style={{ originY: '82px' }}>
            <ellipse cx="66" cy="82" rx="7" ry="8" fill="#2D1B35" />
            <circle cx="68" cy="80" r="2.5" fill="white" />
          </motion.g>
          <motion.g animate={animate ? idleVariants.eye : undefined} style={{ originY: '82px' }}>
            <ellipse cx="94" cy="82" rx="7" ry="8" fill="#2D1B35" />
            <circle cx="96" cy="80" r="2.5" fill="white" />
          </motion.g>

          {/* Nose */}
          <ellipse cx="80" cy="96" rx="6" ry="4" fill="#FF6B9D" />

          {/* Mouth */}
          <path d="M73 103 Q80 110 87 103" stroke="#FF6B9D" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Bow */}
          <g transform="translate(80, 38)">
            <path d="M-16 0 C-16 -10 -4 -10 0 0 C4 -10 16 -10 16 0 C16 8 4 8 0 0 C-4 8 -16 8 -16 0Z" fill="#FF6B9D" />
            <circle cx="0" cy="0" r="5" fill="#FF8DA1" />
          </g>
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default BubuAnimation;
