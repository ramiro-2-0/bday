import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import BackgroundScene from '../Hearts/BackgroundScene';
import FloatingHearts from '../Hearts/FloatingHearts';

export const Layout: React.FC = () => {
  return (
    <>
      {/* Sunny Meadow & Sky Landscape */}
      <BackgroundScene />

      {/* Floating Hearts & Flowers */}
      <FloatingHearts />

      {/* Modern Friendly Floating Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="page">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
