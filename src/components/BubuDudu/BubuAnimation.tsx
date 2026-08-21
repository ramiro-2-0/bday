import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  size?: number;
  animate?: boolean;
  isCelebrating?: boolean;
}

// Bubu - The cute milk-tea brown bear 🐻
export const BubuAnimation: React.FC<Props> = ({ size = 180, animate = true, isCelebrating = false }) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size * 1.15,
        position: 'relative',
        display: 'inline-block',
        filter: 'drop-shadow(0 8px 16px rgba(100, 60, 30, 0.15))',
      }}
      animate={
        isCelebrating
          ? {
              y: [0, -22, 0, -16, 0],
              rotate: [0, -6, 6, -4, 0],
              transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
            }
          : animate
          ? {
              y: [0, -6, 0],
              transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
            }
          : undefined
      }
    >
      <svg
        viewBox="0 0 180 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        {/* Soft Shadow */}
        <ellipse cx="90" cy="192" rx="45" ry="8" fill="rgba(80, 50, 20, 0.18)" />

        {/* Blue Backpack (left side view) */}
        <rect x="24" y="98" width="22" height="42" rx="10" fill="#54B5DB" stroke="#2B1E16" strokeWidth="4" />
        <path d="M40 102 C42 120 42 135 38 142" stroke="#48A4C6" strokeWidth="5" strokeLinecap="round" />

        {/* Body */}
        <path
          d="M48 100 C48 70 132 70 132 100 C134 140 130 178 116 186 C102 192 78 192 64 186 C50 178 46 140 48 100 Z"
          fill="#C49A76"
          stroke="#352317"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Feet / Paws */}
        <ellipse cx="68" cy="186" rx="16" ry="10" fill="#C49A76" stroke="#352317" strokeWidth="4" />
        <ellipse cx="112" cy="186" rx="16" ry="10" fill="#C49A76" stroke="#352317" strokeWidth="4" />

        {/* Head */}
        <g>
          {/* Left Ear */}
          <circle cx="48" cy="52" r="22" fill="#C49A76" stroke="#352317" strokeWidth="4.5" />
          <circle cx="48" cy="52" r="12" fill="#8F6344" />

          {/* Right Ear */}
          <circle cx="132" cy="52" r="22" fill="#C49A76" stroke="#352317" strokeWidth="4.5" />
          <circle cx="132" cy="52" r="12" fill="#8F6344" />

          {/* Head Main */}
          <ellipse
            cx="90"
            cy="88"
            rx="56"
            ry="48"
            fill="#C49A76"
            stroke="#352317"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Big Rosy Peachy Blush Cheeks */}
          <ellipse cx="56" cy="98" rx="14" ry="10" fill="#FFA573" opacity="0.9" />
          <ellipse cx="124" cy="98" rx="14" ry="10" fill="#FFA573" opacity="0.9" />

          {/* Eyes */}
          {isCelebrating ? (
            // Joyful Happy Crescent Eyes
            <>
              <path d="M66 84 Q74 76 80 84" stroke="#2B1810" strokeWidth="4.5" strokeLinecap="round" fill="none" />
              <path d="M100 84 Q106 76 114 84" stroke="#2B1810" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            </>
          ) : (
            // Cute Shiny Round Eyes
            <>
              <ellipse cx="72" cy="84" rx="6.5" ry="7" fill="#2B1810" />
              <circle cx="74.5" cy="82" r="2.5" fill="white" />
              <ellipse cx="108" cy="84" rx="6.5" ry="7" fill="#2B1810" />
              <circle cx="110.5" cy="82" r="2.5" fill="white" />
            </>
          )}

          {/* Cute Snout / Mouth (:3 shape) */}
          <path
            d="M84 94 Q90 98 90 94 Q90 98 96 94"
            stroke="#2B1810"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Right Arm (reaching out to Dudu) */}
        <motion.path
          d={
            isCelebrating
              ? "M124 115 Q145 95 152 82"
              : "M122 120 Q145 130 152 122"
          }
          stroke="#352317"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d={
            isCelebrating
              ? "M124 115 Q145 95 152 82"
              : "M122 120 Q145 130 152 122"
          }
          stroke="#C49A76"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Arm */}
        <path
          d={
            isCelebrating
              ? "M48 115 Q26 95 20 82"
              : "M54 122 Q40 135 34 148"
          }
          stroke="#352317"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={
            isCelebrating
              ? "M48 115 Q26 95 20 82"
              : "M54 122 Q40 135 34 148"
          }
          stroke="#C49A76"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

export default BubuAnimation;
