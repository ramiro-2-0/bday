import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);

  useEffect(() => {
    // Check if iOS
    const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream: unknown }).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as unknown as { standalone?: boolean }).standalone;
    
    if (isIosDevice && !isStandalone) {
      // Show iOS install tip after 4 seconds
      const timer = setTimeout(() => {
        setIsIOS(true);
        setShowPrompt(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          style={{
            position: 'fixed',
            bottom: '84px',
            left: '16px',
            right: '16px',
            maxWidth: '420px',
            margin: '0 auto',
            zIndex: 99,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '3px solid #382417',
            borderRadius: '20px',
            padding: '14px 18px',
            boxShadow: '0 12px 36px rgba(56, 36, 23, 0.22)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '2rem' }}>📱</span>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--pink-main)', margin: 0 }}>
              Install Namrata's Birthday App 🌸
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-mid)', margin: '2px 0 0', fontWeight: 600 }}>
              {isIOS
                ? 'Tap Share ⎋ and "Add to Home Screen" ➕'
                : 'Install as an app for fullscreen experience!'}
            </p>
          </div>

          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Install
            </button>
          )}

          <button
            onClick={() => setShowPrompt(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-light)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              padding: '4px',
            }}
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PwaInstallPrompt;
