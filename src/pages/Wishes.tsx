import React from 'react';
import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { GET_WISHES } from '../graphql/queries';
import type { BirthdayWish } from '../types';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'backOut' },
  }),
};

const Wishes: React.FC = () => {
  const { data, loading, error } = useQuery<{ wishes: BirthdayWish[] }>(GET_WISHES);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div className="page-header">
        <motion.h1
          className="heading-display page-header-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Birthday Wishes 💌
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A little collection of love, just for you, Namrata
        </motion.p>
      </div>

      <div className="container">
        {loading && (
          <div className="loading-wrapper">
            <div className="loading-dots">
              <div className="loading-dot" />
              <div className="loading-dot" />
              <div className="loading-dot" />
            </div>
            <p style={{ color: 'rgba(255,183,197,0.6)' }}>Loading wishes...</p>
          </div>
        )}

        {error && (
          <div className="loading-wrapper">
            <p style={{ color: '#FF8DA1' }}>💔 Oops! Couldn't load wishes.</p>
          </div>
        )}

        {data && (
          <div className="wishes-grid">
            {data.wishes.map((wish, i) => (
              <motion.div
                key={wish.id}
                className="glass-card wish-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03, y: -8 }}
                style={{
                  borderColor: `${wish.color}40`,
                  boxShadow: `0 8px 32px ${wish.color}20`,
                }}
              >
                {/* Color bar top */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${wish.color}, transparent)`,
                  borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                }} />
                <span className="wish-emoji">{wish.emoji}</span>
                <p className="wish-message">{wish.message}</p>
                {/* Corner heart */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '20px',
                  fontSize: '1.4rem',
                  opacity: 0.4,
                }}>
                  💝
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bubu & Dudu mini footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.4rem', color: 'rgba(255,183,197,0.6)' }}>
            — with all the love in the world 🐻🩷🐻💙
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishes;
