import React from 'react';
import { useQuery } from '@apollo/client/react';
import { motion } from 'framer-motion';
import { GET_MEMORIES } from '../graphql/queries';
import type { Memory } from '../types';

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, type: 'spring', stiffness: 300 },
  }),
};

export const Memories: React.FC = () => {
  const { data, loading, error } = useQuery<{ memories: Memory[] }>(GET_MEMORIES);

  return (
    <div style={{ paddingBottom: '80px' }}>
      <div className="page-header container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="landing-badge"
          style={{ marginBottom: '16px' }}
        >
          <span>📸</span>
          <span>OUR FAVORITE MOMENTS</span>
          <span>📸</span>
        </motion.div>

        <motion.h1
          className="heading-display page-header-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Cherished Memories 🌻
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Every smile, every laugh, and every adventure with you is my favorite memory
        </motion.p>
      </div>

      <div className="container">
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span style={{ fontSize: '3rem' }}>📸</span>
            <p style={{ marginTop: '12px', fontSize: '1.2rem', color: 'var(--text-mid)', fontWeight: 700 }}>
              Developing our memories...
            </p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <p style={{ color: 'var(--pink-main)', fontWeight: 700 }}>💔 Couldn't load memories.</p>
          </div>
        )}

        {data && (
          <div className="memories-grid">
            {data.memories.map((memory, i) => (
              <motion.div
                key={memory.id}
                className="memory-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -10, rotate: i % 2 === 0 ? 1.5 : -1.5, scale: 1.02 }}
              >
                {/* Image Container with Date Tag */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="memory-img"
                    style={{ transition: 'transform 0.4s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  {/* Cute Date Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '6px 14px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '2px solid #382417',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: 800,
                      color: 'var(--text-dark)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    }}
                  >
                    ✨ {memory.date}
                  </div>
                </div>

                <div className="memory-content">
                  <h3 className="memory-title">{memory.title}</h3>
                  <p className="memory-desc">{memory.description}</p>
                  <div className="memory-tags">
                    {memory.tags.map(tag => (
                      <span key={tag} className="memory-tag">
                        #{tag}
                      </span>
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
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: '32px',
            padding: '28px',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 'var(--radius-lg)',
            border: '3px solid #FFE4EC',
            boxShadow: 'var(--shadow-warm)',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>🐻📸🐼</span>
          <p style={{ fontFamily: 'var(--font-cute)', fontSize: '1.8rem', color: 'var(--text-dark)', marginTop: '8px' }}>
            "Here's to a million more beautiful memories together!" 💖
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Memories;
