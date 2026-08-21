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
    transition: { duration: 0.5, delay: i * 0.1, type: 'spring', stiffness: 350 },
  }),
};

export const Wishes: React.FC = () => {
  const { data, loading, error } = useQuery<{ wishes: BirthdayWish[] }>(GET_WISHES);

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Header */}
      <div className="page-header container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="landing-badge"
          style={{ marginBottom: '16px' }}
        >
          <span>💌</span>
          <span>SPECIAL BIRTHDAY WISHES</span>
          <span>💌</span>
        </motion.div>

        <motion.h1
          className="heading-display page-header-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Wishes for Namrata 🌸
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Every word here comes straight from the bottom of my heart 💕
        </motion.p>
      </div>

      <div className="container">
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span style={{ fontSize: '3rem' }}>🐻</span>
            <p style={{ marginTop: '12px', fontSize: '1.2rem', color: 'var(--text-mid)', fontWeight: 700 }}>
              Bubu & Dudu are writing the wishes...
            </p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--pink-main)', fontWeight: 700 }}>💔 Couldn't load wishes.</p>
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
                  borderTop: `6px solid ${wish.color || '#FF6584'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span className="wish-emoji">{wish.emoji}</span>
                  <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>💖</span>
                </div>
                <p className="wish-message">{wish.message}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bubu & Dudu Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            textAlign: 'center',
            marginTop: '32px',
            background: 'rgba(255, 255, 255, 0.92)',
            padding: '24px 32px',
            borderRadius: 'var(--radius-lg)',
            border: '3px solid #FFD6E3',
            boxShadow: 'var(--shadow-warm)',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🐻🤍🐼</span>
          <p style={{ fontFamily: 'var(--font-cute)', fontSize: '1.8rem', color: 'var(--text-dark)', marginTop: '8px' }}>
            "You deserve all the happiness in the entire universe today!" 💕
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishes;
