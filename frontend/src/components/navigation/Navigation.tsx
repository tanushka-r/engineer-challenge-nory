import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './navigation.styles.css';

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Sidebar for desktop */}
      <nav className="sidebar" aria-label="Primary navigation">
        <div className="logo">
          <Link to="/">LOGO</Link>
        </div>
        <ul>
          <li><Link to="/deliveries">Deliveries</Link></li>
          <li><Link to="/sales">Sales</Link></li>
          <li><Link to="/stock">Stock</Link></li>
          <li><Link to="/reports">Reports</Link></li>
        </ul>
      </nav>

      {/* Mobile header with hamburger */}
      <div className="mobile-header">
        <div className="logo">
          <Link to="/">LOGO</Link>
        </div>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile menu wrapped in nav */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation menu"
        >
          <button
            className="close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            ×
          </button>
          <ul>
            <li><Link to="/deliveries" onClick={closeMenu}>Deliveries</Link></li>
            <li><Link to="/sales" onClick={closeMenu}>Sales</Link></li>
            <li><Link to="/stock" onClick={closeMenu}>Stock</Link></li>
            <li><Link to="/reports" onClick={closeMenu}>Reports</Link></li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
