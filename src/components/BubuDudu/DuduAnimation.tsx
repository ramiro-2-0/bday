import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  size?: number;
  animate?: boolean;
  isCelebrating?: boolean;
}

// Dudu - The cute white panda bear with pink backpack 🐼
export const DuduAnimation: React.FC<Props> = ({ size = 180, animate = true, isCelebrating = false }) => {
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
              rotate: [0, 6, -6, 4, 0],
              transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 },
            }
          : animate
          ? {
              y: [0, -6, 0],
              transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 },
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

        {/* Pink Backpack (right side) */}
        <g>
          <rect
            x="132"
            y="112"
            width="26"
            height="46"
            rx="12"
            fill="#FF809F"
            stroke="#352317"
            strokeWidth="4"
            transform="rotate(6 132 112)"
          />
          <path d="M136 122 Q144 140 142 152" stroke="#FF5C85" strokeWidth="4" strokeLinecap="round" />
          
          {/* Little Brown Bear Keychain Charm dangling on backpack! */}
          <g transform="translate(142, 142)">
            <circle cx="8" cy="8" r="7" fill="#8B5E3C" stroke="#2B1810" strokeWidth="2.5" />
            <circle cx="3" cy="3" r="3" fill="#8B5E3C" stroke="#2B1810" strokeWidth="2" />
            <circle cx="13" cy="3" r="3" fill="#8B5E3C" stroke="#2B1810" strokeWidth="2" />
            <circle cx="6" cy="7" r="1" fill="#2B1810" />
            <circle cx="10" cy="7" r="1" fill="#2B1810" />
          </g>
        </g>

        {/* Body (White Chubby Panda) */}
        <path
          d="M48 100 C48 70 132 70 132 100 C134 140 130 178 116 186 C102 192 78 192 64 186 C50 178 46 140 48 100 Z"
          fill="#FFFFFF"
          stroke="#352317"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Dark Collar / Scarf */}
        <path
          d="M58 115 C75 125 105 125 122 115 C118 126 105 132 90 132 C75 132 62 126 58 115 Z"
          fill="#3B261D"
        />

        {/* Feet / Paws */}
        <ellipse cx="68" cy="186" rx="16" ry="10" fill="#FFFFFF" stroke="#352317" strokeWidth="4" />
        <ellipse cx="112" cy="186" rx="16" ry="10" fill="#FFFFFF" stroke="#352317" strokeWidth="4" />

        {/* Head */}
        <g>
          {/* Left Ear (Dark Chocolate Brown) */}
          <circle cx="48" cy="52" r="22" fill="#3B261D" stroke="#352317" strokeWidth="4.5" />

          {/* Right Ear (Dark Chocolate Brown) */}
          <circle cx="132" cy="52" r="22" fill="#3B261D" stroke="#352317" strokeWidth="4.5" />

          {/* Head Main (White) */}
          <ellipse
            cx="90"
            cy="88"
            rx="56"
            ry="48"
            fill="#FFFFFF"
            stroke="#352317"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />

          {/* Sweet Pink Blush Cheeks */}
          <ellipse cx="54" cy="98" rx="14" ry="10" fill="#FF9BB2" opacity="0.95" />
          <ellipse cx="126" cy="98" rx="14" ry="10" fill="#FF9BB2" opacity="0.95" />

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

          {/* Cute Tiny Nose/Mouth */}
          <path
            d="M86 94 Q90 98 94 94"
            stroke="#2B1810"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Left Arm (holding Bubu's hand or raised in joy!) */}
        <motion.path
          d={
            isCelebrating
              ? "M56 115 Q35 95 28 82"
              : "M58 120 Q35 130 28 122"
          }
          stroke="#352317"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <motion.path
          d={
            isCelebrating
              ? "M56 115 Q35 95 28 82"
              : "M58 120 Q35 130 28 122"
          }
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Right Arm */}
        <path
          d={
            isCelebrating
              ? "M128 115 Q150 95 158 82"
              : "M124 122 Q140 135 146 148"
          }
          stroke="#352317"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={
            isCelebrating
              ? "M128 115 Q150 95 158 82"
              : "M124 122 Q140 135 146 148"
          }
          stroke="#FFFFFF"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

export default DuduAnimation;
