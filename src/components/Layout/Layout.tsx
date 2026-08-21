import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingHearts from '../Hearts/FloatingHearts';

const Layout: React.FC = () => {
  return (
    <>
      {/* Animated background */}
      <div className="app-bg" />

      {/* Global floating hearts */}
      <FloatingHearts />

      {/* Navigation */}
      <Navbar />

      {/* Page content */}
      <main className="page">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
