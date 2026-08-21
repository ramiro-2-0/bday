import React from 'react';
import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { GET_MEMORIES } from '../graphql/queries';
import type { Memory } from '../types';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'backOut' },
  }),
};

const Memories: React.FC = () => {
  const { data, loading, error } = useQuery<{ memories: Memory[] }>(GET_MEMORIES);

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div className="page-header">
        <motion.h1
          className="heading-display page-header-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Memories 📸
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Every moment with you is a treasure I'll keep forever
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
          </div>
        )}

        {error && (
          <div className="loading-wrapper">
            <p style={{ color: '#FF8DA1' }}>Couldn't load memories 💔</p>
          </div>
        )}

        {data && (
          <div className="memories-grid">
            {data.memories.map((memory, i) => (
              <motion.div
                key={memory.id}
                className="glass-card memory-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -12, scale: 1.02 }}
              >
                {/* Image */}
                <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="memory-img"
                    style={{ transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Overlay gradient */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(45,27,53,0.6), transparent)',
                  }} />
                  {/* Date badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    padding: '4px 12px',
                    background: 'rgba(255,107,157,0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '100px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'white',
                  }}>
                    {memory.date}
                  </div>
                </div>

                <div className="memory-content">
                  <h3 className="memory-title">{memory.title}</h3>
                  <p className="memory-desc">{memory.description}</p>
                  <div className="memory-tags">
                    {memory.tags.map(tag => (
                      <span key={tag} className="memory-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            textAlign: 'center',
            marginTop: '48px',
            padding: '32px',
            background: 'rgba(255,107,157,0.08)',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed rgba(255,183,197,0.3)',
          }}
        >
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', color: 'rgba(255,183,197,0.8)' }}>
            "In all the world, there is no heart for me like yours" 🌸
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Memories;
