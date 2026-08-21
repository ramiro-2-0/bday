import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'pwa-icon.svg',
        'pwa-192x192.svg',
        'pwa-512x512.svg',
        'moments/*.png',
      ],
      manifest: {
        name: 'Happy Birthday Namrata 🎂💖',
        short_name: 'Namrata 🎂',
        description: 'A special birthday surprise website made with love for Namrata 💕',
        theme_color: '#6ECBF5',
        background_color: '#6ECBF5',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          {
            src: 'pwa-192x192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'pwa-512x512.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'pwa-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp}'],
      },
    }),
  ],
  optimizeDeps: {
    include: ['@apollo/client/core', '@apollo/client/react'],
  },
});
