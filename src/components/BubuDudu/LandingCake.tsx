import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  blowCount: number;
  isBlown: number;
  onBlow: () => void;
}

export const LandingCake: React.FC<Props> = ({ blowCount, onBlow }) => {
  const isExtinguished = blowCount >= 3;

  // Flame scale and flicker variations based on blow level
  const flameScale = blowCount === 0 ? 1 : blowCount === 1 ? 0.65 : blowCount === 2 ? 0.32 : 0;
  const flameTilt = blowCount === 1 ? 18 : blowCount === 2 ? 28 : 0;

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: isExtinguished ? 'default' : 'pointer',
        userSelect: 'none',
      }}
      onClick={onBlow}
    >
      {/* Wind Gust Animation on each blow */}
      <AnimatePresence>
        {blowCount > 0 && !isExtinguished && (
          <motion.div
            key={`wind-${blowCount}`}
            initial={{ x: -100, opacity: 0, scale: 0.5 }}
            animate={{ x: 60, opacity: [0, 1, 1, 0], scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '15px',
              left: '-40px',
              zIndex: 20,
              fontSize: '2.4rem',
              pointerEvents: 'none',
              filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.8))',
            }}
          >
            {blowCount === 1 ? '💨' : '💨💨'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SVG Cake with Burning Candle */}
      <svg
        viewBox="0 0 200 180"
        width="220"
        height="198"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible' }}
      >
        {/* Soft Cake Plate Shadow */}
        <ellipse cx="100" cy="172" rx="72" ry="10" fill="rgba(60, 40, 20, 0.16)" />

        {/* Cake Plate (Cute Porcelain White) */}
        <ellipse cx="100" cy="168" rx="68" ry="8" fill="#FFFFFF" stroke="#382417" strokeWidth="3.5" />
        <ellipse cx="100" cy="166" rx="62" ry="6" fill="#FFF4B8" />

        {/* Cake Base Tier (Strawberry Sponge with White Cream) */}
        <rect
          x="44"
          y="114"
          width="112"
          height="48"
          rx="12"
          fill="#FF8CA3"
          stroke="#382417"
          strokeWidth="4"
        />

        {/* Bottom Frosting Fill & Drips */}
        <ellipse cx="100" cy="114" rx="56" ry="10" fill="#FFFFFF" stroke="#382417" strokeWidth="4" />
        
        {/* Cute Cream Drips */}
        <path d="M50 114 Q56 128 62 114" fill="#FFFFFF" stroke="#382417" strokeWidth="3" />
        <path d="M68 114 Q76 132 84 114" fill="#FFFFFF" stroke="#382417" strokeWidth="3" />
        <path d="M92 114 Q100 134 108 114" fill="#FFFFFF" stroke="#382417" strokeWidth="3" />
        <path d="M116 114 Q124 130 132 114" fill="#FFFFFF" stroke="#382417" strokeWidth="3" />
        <path d="M138 114 Q144 126 150 114" fill="#FFFFFF" stroke="#382417" strokeWidth="3" />

        {/* Strawberries on bottom tier */}
        <g transform="translate(62, 126)">
          <path d="M0 4 C-4 8 0 14 6 12 C12 10 14 4 8 0 C4 2 2 2 0 4 Z" fill="#FF3366" />
          <circle cx="4" cy="5" r="0.8" fill="white" />
          <circle cx="7" cy="8" r="0.8" fill="white" />
        </g>
        <g transform="translate(122, 126)">
          <path d="M0 4 C-4 8 0 14 6 12 C12 10 14 4 8 0 C4 2 2 2 0 4 Z" fill="#FF3366" />
          <circle cx="4" cy="5" r="0.8" fill="white" />
          <circle cx="7" cy="8" r="0.8" fill="white" />
        </g>

        {/* Top Cake Tier */}
        <rect
          x="62"
          y="76"
          width="76"
          height="38"
          rx="10"
          fill="#FFAEC0"
          stroke="#382417"
          strokeWidth="3.5"
        />

        {/* Top Cream Layer */}
        <ellipse cx="100" cy="76" rx="38" ry="8" fill="#FFFFFF" stroke="#382417" strokeWidth="3.5" />

        {/* Colorful Sprinkles on top */}
        <rect x="74" y="86" width="7" height="3" rx="1.5" fill="#FFD23F" transform="rotate(25 74 86)" />
        <rect x="94" y="90" width="7" height="3" rx="1.5" fill="#54B5DB" transform="rotate(-30 94 90)" />
        <rect x="114" y="86" width="7" height="3" rx="1.5" fill="#FF6584" transform="rotate(15 114 86)" />
        <rect x="82" y="100" width="7" height="3" rx="1.5" fill="#62B872" transform="rotate(-15 82 100)" />
        <rect x="108" y="100" width="7" height="3" rx="1.5" fill="#FFD23F" transform="rotate(40 108 100)" />

        {/* Central Burning Candle */}
        <g>
          {/* Candle Body (Pastel Striped) */}
          <rect x="94" y="32" width="12" height="42" rx="4" fill="#FF6584" stroke="#382417" strokeWidth="3" />
          <rect x="94" y="42" width="12" height="4" fill="#FFFFFF" opacity="0.8" />
          <rect x="94" y="54" width="12" height="4" fill="#FFFFFF" opacity="0.8" />
          <rect x="94" y="66" width="12" height="4" fill="#FFFFFF" opacity="0.8" />

          {/* Candle Wick */}
          <line x1="100" y1="32" x2="100" y2="24" stroke="#382417" strokeWidth="2.5" strokeLinecap="round" />

          {/* Burning Candle Flame Animation */}
          <AnimatePresence>
            {!isExtinguished && (
              <motion.g
                key="candle-flame"
                initial={{ scale: 1 }}
                animate={{
                  scale: flameScale,
                  rotate: [0, flameTilt, -flameTilt * 0.5, 0],
                }}
                transition={{
                  scale: { duration: 0.35, ease: 'easeOut' },
                  rotate: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
                }}
                style={{ originX: '100px', originY: '24px' }}
              >
                {/* Outer Glow Halo */}
                <circle cx="100" cy="16" r="22" fill="#FFD23F" opacity="0.35">
                  <animate attributeName="r" values="20;25;20" dur="1s" repeatCount="indefinite" />
                </circle>

                {/* Outer Flame (Warm Golden Yellow) */}
                <path
                  d="M100 2 C92 10 90 20 100 24 C110 20 108 10 100 2 Z"
                  fill="#FF9248"
                  stroke="#382417"
                  strokeWidth="1.5"
                />
                {/* Mid Flame (Bright Sunshine Yellow) */}
                <path
                  d="M100 5 C94 12 93 19 100 22 C107 19 106 12 100 5 Z"
                  fill="#FFD23F"
                />
                {/* Inner Core Flame (Pure White Light) */}
                <ellipse cx="100" cy="18" rx="2.5" ry="4.5" fill="#FFFFFF" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Extinguished Smoke Wisps */}
          <AnimatePresence>
            {isExtinguished && (
              <motion.g key="smoke-wisps">
                <motion.path
                  d="M100 24 Q95 14 102 6 Q106 -4 98 -16"
                  stroke="#8B7B75"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.9 }}
                  animate={{ pathLength: 1, opacity: [0.9, 0.4, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.6 }}
                />
                <motion.path
                  d="M101 24 Q108 16 100 8 Q94 -2 102 -12"
                  stroke="#B0A49E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.8 }}
                  animate={{ pathLength: 1, opacity: [0.8, 0.3, 0] }}
                  transition={{ duration: 1.8, delay: 0.3, repeat: Infinity, repeatDelay: 0.8 }}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      </svg>
    </div>
  );
};

export default LandingCake;
