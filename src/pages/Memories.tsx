import React, { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { GET_MEMORIES } from '../graphql/queries';
import type { Memory } from '../types';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, type: 'spring' as const, stiffness: 280, damping: 20 },
  }),
};

export const Memories: React.FC = () => {
  const { data, loading, error } = useQuery<{ memories: Memory[] }>(GET_MEMORIES);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <div className="page-header container" style={{ marginBottom: '20px' }}>
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
          Every single second with you, Namrata, is a treasure I want to hold onto forever 💕
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '32px',
              padding: '10px 0 40px',
              alignItems: 'start',
            }}
          >
            {data.memories.map((memory, i) => (
              <motion.div
                key={memory.id}
                className="memory-card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                onHoverStart={() => setHoveredId(memory.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{
                  y: -12,
                  rotate: i % 2 === 0 ? 1.5 : -1.5,
                  scale: 1.03,
                  boxShadow: '0 24px 48px rgba(56, 36, 23, 0.22)',
                }}
                onClick={() => setSelectedMemory(memory)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  background: '#FFFFFF',
                  border: '3.5px solid #382417',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 24px rgba(56, 36, 23, 0.12)',
                }}
              >
                {/* Washi Tape Sticker at top */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${i % 2 === 0 ? '-3deg' : '3deg'})`,
                    width: '90px',
                    height: '24px',
                    background: i % 2 === 0 ? 'rgba(255, 101, 132, 0.85)' : 'rgba(255, 210, 63, 0.9)',
                    borderRadius: '4px',
                    zIndex: 10,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                  }}
                />

                {/* Floating Heart particles on hover */}
                <AnimatePresence>
                  {hoveredId === memory.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: -15 }}
                      exit={{ opacity: 0, scale: 0.5, y: -25 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '14px',
                        zIndex: 15,
                        fontSize: '1.6rem',
                        pointerEvents: 'none',
                        filter: 'drop-shadow(0 2px 6px rgba(255,100,140,0.4))',
                      }}
                    >
                      💖
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Frame — Exact Full Uncropped Image */}
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#FAF7F5',
                    borderBottom: '2.5px solid #382417',
                  }}
                >
                  <motion.img
                    src={memory.imageUrl}
                    alt={memory.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '380px',
                      objectFit: 'contain',
                      display: 'block',
                      margin: '0 auto',
                    }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Date Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '10px',
                      right: '10px',
                      padding: '5px 12px',
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '2px solid #382417',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: 'var(--text-dark)',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                    }}
                  >
                    ✨ {memory.date}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '18px 20px 22px' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.35rem',
                      color: 'var(--text-dark)',
                      marginBottom: '8px',
                    }}
                  >
                    {memory.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.98rem',
                      lineHeight: '1.55',
                      color: 'var(--text-mid)',
                      marginBottom: '14px',
                      fontWeight: 500,
                    }}
                  >
                    {memory.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {memory.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          padding: '4px 12px',
                          background: '#FFF0F5',
                          border: '1.5px solid var(--pink-soft)',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.82rem',
                          color: 'var(--pink-main)',
                          fontWeight: 700,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Lightbox for Full High-Res View */}
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
                background: 'rgba(30, 20, 15, 0.78)',
                backdropFilter: 'blur(12px)',
                zIndex: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <motion.div
                initial={{ scale: 0.85, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 30 }}
                onClick={e => e.stopPropagation()}
                style={{
                  maxWidth: '540px',
                  width: '100%',
                  maxHeight: '92vh',
                  overflowY: 'auto',
                  background: '#FFFFFF',
                  border: '4px solid #382417',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  position: 'relative',
                  textAlign: 'center',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
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
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                  }}
                >
                  ✕
                </button>

                <img
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '480px',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)',
                    border: '2px solid #FFE4EC',
                    display: 'block',
                    margin: '0 auto',
                  }}
                />

                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--pink-main)',
                    marginTop: '16px',
                    fontSize: '1.65rem',
                  }}
                >
                  {selectedMemory.title}
                </h2>
                <p
                  style={{
                    fontSize: '1.1rem',
                    color: 'var(--text-dark)',
                    marginTop: '8px',
                    lineHeight: '1.6',
                    fontWeight: 600,
                  }}
                >
                  {selectedMemory.description}
                </p>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
                  {selectedMemory.tags.map(t => (
                    <span
                      key={t}
                      style={{
                        padding: '4px 12px',
                        background: '#FFF0F5',
                        border: '1.5px solid var(--pink-soft)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.85rem',
                        color: 'var(--pink-main)',
                        fontWeight: 700,
                      }}
                    >
                      #{t}
                    </span>
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
