import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  size?: number;
  animate?: boolean;
  flipped?: boolean;
}

// Dudu - the blue bear 💙
const DuduAnimation: React.FC<Props> = ({ size = 160, animate = true, flipped = false }) => {
  const idleVariants = animate ? {
    body: {
      y: [0, -6, 0],
      transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
    },
    eye: {
      scaleY: [1, 0.1, 1],
      transition: { duration: 3, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut', delay: 0.5 },
    },
  } : {};

  return (
    <motion.div
      style={{
        width: size,
        height: size * 1.2,
        position: 'relative',
        display: 'inline-block',
        transform: flipped ? 'scaleX(-1)' : undefined,
      }}
    >
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
        <ellipse cx="80" cy="145" rx="46" ry="44" fill="#A8C8FF" />

        {/* Tummy */}
        <ellipse cx="80" cy="148" rx="26" ry="22" fill="#D6E8FF" />

        {/* Legs */}
        <ellipse cx="60" cy="182" rx="18" ry="12" fill="#7EB3FF" />
        <ellipse cx="100" cy="182" rx="18" ry="12" fill="#7EB3FF" />

        {/* Feet dots */}
        <circle cx="55" cy="185" r="3" fill="#5B9BFF" />
        <circle cx="60" cy="187" r="3" fill="#5B9BFF" />
        <circle cx="65" cy="185" r="3" fill="#5B9BFF" />
        <circle cx="95" cy="185" r="3" fill="#5B9BFF" />
        <circle cx="100" cy="187" r="3" fill="#5B9BFF" />
        <circle cx="105" cy="185" r="3" fill="#5B9BFF" />

        {/* Arms */}
        <ellipse cx="36" cy="148" rx="14" ry="18" fill="#A8C8FF" transform="rotate(-15 36 148)" />
        <ellipse cx="124" cy="148" rx="14" ry="18" fill="#A8C8FF" transform="rotate(15 124 148)" />

        {/* Head */}
        <motion.g animate={animate ? idleVariants.body : undefined}>
          <circle cx="80" cy="88" r="52" fill="#A8C8FF" />

          {/* Left ear */}
          <motion.g animate={animate ? { rotate: [-3, 3, -3], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } } : undefined} style={{ originX: '42px', originY: '50px' }}>
            <circle cx="42" cy="50" r="18" fill="#A8C8FF" />
            <circle cx="42" cy="50" r="10" fill="#7EB3FF" />
          </motion.g>

          {/* Right ear */}
          <motion.g animate={animate ? { rotate: [3, -3, 3], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 } } : undefined} style={{ originX: '118px', originY: '50px' }}>
            <circle cx="118" cy="50" r="18" fill="#A8C8FF" />
            <circle cx="118" cy="50" r="10" fill="#7EB3FF" />
          </motion.g>

          {/* Cheeks */}
          <circle cx="54" cy="98" r="12" fill="#7EB3FF" opacity="0.5" />
          <circle cx="106" cy="98" r="12" fill="#7EB3FF" opacity="0.5" />

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
          <ellipse cx="80" cy="96" rx="6" ry="4" fill="#5B9BFF" />

          {/* Mouth - small smile */}
          <path d="M73 103 Q80 110 87 103" stroke="#5B9BFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Cap / Accessory */}
          <path d="M28 78 Q80 28 132 78" fill="#5B9BFF" />
          <rect x="22" y="74" width="116" height="12" rx="6" fill="#7EB3FF" />
          <circle cx="80" cy="36" r="8" fill="#FFB7C5" />
        </motion.g>
      </motion.svg>
    </motion.div>
  );
};

export default DuduAnimation;
