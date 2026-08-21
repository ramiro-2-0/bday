import React from 'react';
import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { GET_LOVE_LETTER } from '../graphql/queries';
import type { LoveLetter as LoveLetterType } from '../types';

export const Letter: React.FC = () => {
  const { data, loading } = useQuery<{ loveLetter: LoveLetterType }>(GET_LOVE_LETTER);

  return (
    <div className="letter-page">
      <div style={{ width: '100%', maxWidth: '750px' }}>
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '28px' }}
        >
          <div className="landing-badge" style={{ marginBottom: '14px' }}>
            <span>💌</span>
            <span>FOR NAMRATA'S EYES ONLY</span>
            <span>💌</span>
          </div>

          <h1 className="heading-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)' }}>
            A Letter From My Heart 🌸
          </h1>
        </motion.div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span style={{ fontSize: '3rem' }}>💌</span>
            <p style={{ marginTop: '12px', fontSize: '1.2rem', color: 'var(--text-mid)', fontWeight: 700 }}>
              Unfolding your letter...
            </p>
          </div>
        )}

        {data && (
          <motion.div
            className="letter-paper"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 260 }}
          >
            {/* Cute Postage Stamp in Corner */}
            <div
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                border: '2.5px dashed #FF6584',
                padding: '8px 12px',
                borderRadius: '8px',
                background: '#FFF0F5',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transform: 'rotate(4deg)',
              }}
            >
              <span style={{ fontSize: '1.4rem' }}>🐻❤️🐼</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF6584' }}>AIR MAIL</span>
            </div>

            {/* Greeting */}
            <p className="letter-greeting">{data.loveLetter.greeting}</p>

            {/* Letter Body */}
            <p className="letter-body">{data.loveLetter.body}</p>

            {/* Closing & Signature */}
            <div style={{ marginTop: '36px', borderTop: '2px dashed #FFE4EC', paddingTop: '24px' }}>
              <p className="letter-closing">{data.loveLetter.closing}</p>
              <p className="letter-signature">{data.loveLetter.signature}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Letter;
