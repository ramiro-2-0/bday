import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CANDLES = [
  { x: 52, y: 40, color: '#FF6B9D', flameColor: '#FFD700' },
  { x: 75, y: 30, color: '#C77DFF', flameColor: '#FF7B7B' },
  { x: 98, y: 40, color: '#A8C8FF', flameColor: '#FFB347' },
];

const CakePage: React.FC = () => {
  const [blown, setBlown] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cakeRef = useRef<HTMLDivElement>(null);

  const blowCandles = () => {
    if (blown || isAnimating) return;
    setIsAnimating(true);

    // Small delay then blow
    setTimeout(() => {
      setBlown(true);
      setIsAnimating(false);

      // 🎉 Confetti burst!
      const colors = ['#FF6B9D', '#C77DFF', '#FFB7C5', '#A8C8FF', '#FFD700', '#FF8DA1'];

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors,
        shapes: ['circle', 'square'],
      });
      setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.5, x: 0.2 }, colors }), 300);
      setTimeout(() => confetti({ particleCount: 60, spread: 120, origin: { y: 0.5, x: 0.8 }, colors }), 500);
    }, 600);
  };

  const reset = () => {
    setBlown(false);
  };

  return (
    <div className="cake-page">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '32px' }}
      >
        <h1 className="heading-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {blown ? '🎉 Make a Wish!' : '🎂 Birthday Cake'}
        </h1>
        <p style={{ color: 'rgba(255,183,197,0.7)', marginTop: '12px', fontSize: '1.1rem' }}>
          {blown
            ? 'Your wish has been sent to the stars ⭐'
            : "Blow out the candles and make a wish, Namrata!"}
        </p>
      </motion.div>

      {/* Cake SVG */}
      <motion.div
        ref={cakeRef}
        animate={isAnimating ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.4 }}
        style={{ cursor: blown ? 'default' : 'pointer', userSelect: 'none' }}
        onClick={blowCandles}
        whileHover={!blown ? { scale: 1.04 } : {}}
        whileTap={!blown ? { scale: 0.97 } : {}}
      >
        <svg viewBox="0 0 200 200" width="280" height="280" xmlns="http://www.w3.org/2000/svg">
          {/* Candles */}
          {CANDLES.map((c, i) => (
            <g key={i}>
              <rect x={c.x - 5} y={c.y} width="10" height="30" rx="5" fill={c.color} />
              {/* Candle stripes */}
              <rect x={c.x - 5} y={c.y + 8} width="10" height="3" rx="1.5" fill="white" opacity="0.4" />
              <rect x={c.x - 5} y={c.y + 18} width="10" height="3" rx="1.5" fill="white" opacity="0.4" />

              {/* Flames (hide when blown) */}
              <AnimatePresence>
                {!blown && (
                  <motion.g
                    key={`flame-${i}`}
                    initial={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <motion.ellipse
                      cx={c.x}
                      cy={c.y - 4}
                      rx={5}
                      ry={9}
                      fill={c.flameColor}
                      animate={{ ry: [9, 12, 9], cx: [c.x, c.x + 1, c.x - 1, c.x] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.ellipse
                      cx={c.x}
                      cy={c.y - 2}
                      rx={3}
                      ry={5}
                      fill="white"
                      opacity={0.6}
                      animate={{ ry: [5, 7, 5] }}
                      transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
                    />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Smoke wisps after blowing */}
              <AnimatePresence>
                {blown && (
                  <motion.g key={`smoke-${i}`}>
                    {[0, 1, 2].map(s => (
                      <motion.ellipse
                        key={s}
                        cx={c.x + (s - 1) * 3}
                        rx={4}
                        ry={2}
                        fill="rgba(255,255,255,0.5)"
                        initial={{ cy: c.y, opacity: 0.8, scaleY: 1 }}
                        animate={{ cy: c.y - 30 - s * 10, opacity: 0, scaleY: 3 }}
                        transition={{ duration: 1.5, delay: s * 0.2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    ))}
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          ))}

          {/* Cake — top tier */}
          <rect x="55" y="100" width="90" height="36" rx="12" fill="#FF6B9D" />
          {/* Frosting top tier */}
          <ellipse cx="100" cy="100" rx="45" ry="10" fill="#FFD6E7" />
          {/* Drips */}
          {[68, 80, 94, 108, 120, 133].map((dx, i) => (
            <ellipse key={i} cx={dx} cy={104} rx={5} ry={8} fill="#FFD6E7" />
          ))}

          {/* Cake — bottom tier */}
          <rect x="38" y="130" width="124" height="46" rx="14" fill="#FF8DA1" />
          {/* Frosting bottom tier */}
          <ellipse cx="100" cy="130" rx="62" ry="11" fill="#FFD6E7" />
          {/* Drips bottom */}
          {[50, 65, 80, 96, 112, 128, 143].map((dx, i) => (
            <ellipse key={i} cx={dx} cy={135} rx={6} ry={10} fill="#FFD6E7" />
          ))}

          {/* Sprinkles top tier */}
          {[[65, 115], [80, 120], [100, 112], [118, 118], [130, 113]].map(([sx, sy], i) => (
            <rect
              key={i}
              x={sx} y={sy}
              width="10" height="3.5"
              rx="2"
              fill={['#FFD700', '#A8C8FF', '#C77DFF', '#A8E6CF', '#FFB347'][i]}
              transform={`rotate(${[-20, 30, -10, 45, -35][i]} ${sx + 5} ${sy + 1.5})`}
            />
          ))}

          {/* Sprinkles bottom tier */}
          {[[52, 150], [70, 158], [90, 145], [108, 155], [125, 148], [142, 156]].map(([sx, sy], i) => (
            <rect
              key={i}
              x={sx} y={sy}
              width="12" height="4"
              rx="2"
              fill={['#FF6B9D', '#C77DFF', '#FFD700', '#A8C8FF', '#FF8DA1', '#A8E6CF'][i]}
              transform={`rotate(${[25, -15, 40, -30, 10, -45][i]} ${sx + 6} ${sy + 2})`}
            />
          ))}

          {/* Stars on cake */}
          <text x="74" y="127" fontSize="12" fill="white" opacity="0.8">★</text>
          <text x="112" y="124" fontSize="10" fill="#FFD700">★</text>
          <text x="62" y="162" fontSize="14" fill="white" opacity="0.7">★</text>
          <text x="130" y="165" fontSize="11" fill="#FFD700">★</text>

          {/* Plate */}
          <ellipse cx="100" cy="176" rx="68" ry="10" fill="rgba(255,255,255,0.08)" />
        </svg>
      </motion.div>

      {/* Instruction / Result */}
      <AnimatePresence mode="wait">
        {!blown ? (
          <motion.div
            key="instruction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: '24px', textAlign: 'center' }}
          >
            <motion.p
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ fontSize: '1rem', color: 'rgba(255,183,197,0.6)' }}
            >
              👆 Tap the cake to blow out the candles!
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            style={{ marginTop: '32px', textAlign: 'center' }}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontSize: '3rem', marginBottom: '16px' }}
            >
              🎉🎊🎉
            </motion.div>
            <h2 style={{ fontFamily: "'Dancing Script', cursive", fontSize: '2rem', color: 'var(--pink-300)', marginBottom: '12px' }}>
              Happy Birthday, Namrata! 🎂
            </h2>
            <p style={{ color: 'rgba(255,183,197,0.7)', marginBottom: '28px', fontSize: '1.05rem' }}>
              May all your wishes come true today and every day 💖
            </p>

            {/* Bubu & Dudu celebrating */}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '3rem', marginBottom: '28px' }}>
              <motion.span
                animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >🐻</motion.span>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >🎂</motion.span>
              <motion.span
                animate={{ y: [0, -12, 0], rotate: [5, -5, 5] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              >🐻‍❄️</motion.span>
            </div>

            <button className="btn-ghost" onClick={reset}>
              🕯️ Relight candles
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CakePage;
