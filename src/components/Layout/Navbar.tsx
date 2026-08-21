import React from 'react';
import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/wishes', label: 'Wishes', emoji: '💌' },
  { to: '/memories', label: 'Memories', emoji: '📸' },
  { to: '/letter', label: 'Letter', emoji: '🌸' },
  { to: '/cake', label: 'Cake', emoji: '🎂' },
];

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {NAV_ITEMS.map(({ to, label, emoji }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
