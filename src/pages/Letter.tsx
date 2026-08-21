import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { GET_LOVE_LETTER } from '../graphql/queries';
import type { LoveLetter as LoveLetterType } from '../types';

const Letter: React.FC = () => {
  const { data, loading } = useQuery<{ loveLetter: LoveLetterType }>(GET_LOVE_LETTER);
  const letterRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!data || revealed) return;

    // Animate letter elements in sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      tl.from('.letter-paper', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.letter-greeting', { opacity: 0, x: -30, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .from('.letter-body', { opacity: 0, duration: 1.2, ease: 'power1.inOut' }, '-=0.2')
        .from('.letter-closing', { opacity: 0, y: 10, duration: 0.5 }, '-=0.3')
        .from('.letter-signature', { opacity: 0, scale: 0.7, duration: 0.6, ease: 'back.out(1.5)' })
        .call(() => setRevealed(true));
    }, letterRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <div className="letter-page" ref={letterRef}>
      <div style={{ width: '100%', maxWidth: '720px' }}>
        {/* Floating envelope icon */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '24px' }}
        >
          <motion.span
            style={{ fontSize: '3rem', display: 'inline-block' }}
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            💌
          </motion.span>
          <h1 className="heading-display" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginTop: '12px' }}>
            A Letter For You
          </h1>
        </motion.div>

        {loading && (
          <div className="loading-wrapper">
            <div className="loading-dots">
              <div className="loading-dot" />
              <div className="loading-dot" />
              <div className="loading-dot" />
            </div>
          </div>
        )}

        {data && (
          <div className="letter-paper">
            {/* Decorative top border */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--pink-500), var(--lavender), var(--pink-500), transparent)',
              marginBottom: '40px',
              borderRadius: '100px',
            }} />

            {/* Bubu & Dudu reading the letter deco */}
            <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '-10px', opacity: 0.5 }}>
              <span style={{ fontSize: '1.4rem' }}>🐻‍❄️</span>
              <span style={{ fontSize: '1.4rem' }}>🐻</span>
            </div>

            <p className="letter-greeting">{data.loveLetter.greeting}</p>
            <p className="letter-body">{data.loveLetter.body}</p>
            <p className="letter-closing">{data.loveLetter.closing}</p>
            <p className="letter-signature">{data.loveLetter.signature}</p>

            {/* Bottom decoration */}
            <div style={{
              height: '3px',
              background: 'linear-gradient(90deg, transparent, var(--pink-500), var(--lavender), var(--pink-500), transparent)',
              marginTop: '40px',
              borderRadius: '100px',
            }} />
          </div>
        )}

        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ textAlign: 'center', marginTop: '32px' }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              style={{ fontSize: '2.5rem', display: 'inline-block' }}
            >
              💖
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Letter;
