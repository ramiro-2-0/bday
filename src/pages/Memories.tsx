import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { motion, AnimatePresence } from 'framer-motion';
import { GET_MEMORIES } from '../graphql/queries';
import type { Memory } from '../types';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, type: 'spring', stiffness: 280, damping: 20 },
  }),
};

export const Memories: React.FC = () => {
  const { data, loading, error } = useQuery<{ memories: Memory[] }>(GET_MEMORIES);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="page-header container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="landing-badge"
          style={{ marginBottom: '16px' }}
        >
          <span>📸</span>
          <span>OUR SWEETEST MOMENTS</span>
          <span>📸</span>
        </motion.div>

        <motion.h1
          className="heading-display page-header-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Favorite Moments 🌸
        </motion.h1>
        <motion.p
          className="page-header-sub"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Every single second with you, Namrata, is a memory I want to hold onto forever 💕
        </motion.p>
      </div>

      <div className="container">
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <span style={{ fontSize: '3.5rem' }}>📸</span>
            <p style={{ marginTop: '12px', fontSize: '1.3rem', color: 'var(--text-mid)', fontWeight: 700 }}>
              Opening our photo album...
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
                whileHover={{
                  y: -12,
                  rotate: i % 2 === 0 ? 1.8 : -1.8,
                  scale: 1.03,
                  boxShadow: '0 20px 40px rgba(56, 36, 23, 0.22)',
                }}
                onClick={() => setSelectedMemory(memory)}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                {/* Washi Tape / Scrapbook Sticker at top */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i % 2 === 0 ? '-3deg' : '3deg'})`,
                    width: '85px',
                    height: '24px',
                    background: i % 2 === 0 ? 'rgba(255, 101, 132, 0.75)' : 'rgba(255, 210, 63, 0.85)',
                    borderRadius: '3px',
                    zIndex: 10,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                  }}
                />

                {/* Image Frame */}
                <div style={{ position: 'relative', overflow: 'hidden', background: '#FFF0F5' }}>
                  <motion.img
                    src={memory.imageUrl}
                    alt={memory.title}
                    className="memory-img"
                    style={{
                      height: '340px',
                      objectFit: 'contain',
                      background: '#FFF9FB',
                      padding: '12px 12px 0',
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35 }}
                  />

                  {/* Date Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
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

                {/* Content */}
                <div className="memory-content" style={{ padding: '20px 22px 24px' }}>
                  <h3 className="memory-title" style={{ fontSize: '1.4rem' }}>{memory.title}</h3>
                  <p className="memory-desc" style={{ fontSize: '1rem', lineHeight: '1.55', marginBottom: '14px' }}>
                    {memory.description}
                  </p>
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

        {/* Modal Lightbox for Full View */}
        <AnimatePresence>
          {selectedMemory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMemory(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(30, 20, 15, 0.75)',
                backdropFilter: 'blur(10px)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 30 }}
                onClick={e => e.stopPropagation()}
                className="glass-card"
                style={{
                  maxWidth: '560px',
                  width: '100%',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  background: '#FFFFFF',
                  border: '4px solid #382417',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  position: 'relative',
                  textAlign: 'center',
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMemory(null)}
                  style={{
                    position: 'absolute',
                    top: '14px',
                    right: '14px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '2px solid #382417',
                    background: '#FF6584',
                    color: 'white',
                    fontWeight: 900,
                    cursor: 'pointer',
                    fontSize: '1rem',
                  }}
                >
                  ✕
                </button>

                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  style={{
                    width: '100%',
                    maxHeight: '440px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid #FFE4EC',
                  }}
                />

                <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--pink-main)', marginTop: '16px', fontSize: '1.7rem' }}>
                  {selectedMemory.title}
                </h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', marginTop: '8px', lineHeight: '1.6', fontWeight: 600 }}>
                  {selectedMemory.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
                  {selectedMemory.tags.map(t => (
                    <span key={t} className="memory-tag">#{t}</span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            marginTop: '36px',
            padding: '28px',
            background: 'rgba(255, 255, 255, 0.92)',
            borderRadius: 'var(--radius-lg)',
            border: '3px solid #FFD6E3',
            boxShadow: 'var(--shadow-warm)',
          }}
        >
          <span style={{ fontSize: '2.8rem' }}>🐻📸🐼</span>
          <p style={{ fontFamily: 'var(--font-cute)', fontSize: '1.9rem', color: 'var(--text-dark)', marginTop: '8px' }}>
            "Looking forward to creating thousands more memories with you, my love!" 💖✨
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Memories;
