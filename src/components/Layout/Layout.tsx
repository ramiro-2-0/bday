import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BackgroundScene from '../Hearts/BackgroundScene';
import FloatingHearts from '../Hearts/FloatingHearts';
import PwaInstallPrompt from '../PwaInstallPrompt';

export const Layout: React.FC = () => {
  return (
    <>
      {/* Sunny Meadow & Sky Landscape */}
      <BackgroundScene />

      {/* Floating Hearts & Flowers */}
      <FloatingHearts />

      {/* Modern Friendly Floating Navbar (Bottom on mobile, Top on desktop) */}
      <Navbar />

      {/* PWA Install Banner */}
      <PwaInstallPrompt />

      {/* Page Content */}
      <main className="page">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
