import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../context/GlobalContext'; 
import {
  DeliveryIcon,
  SaleIcon,
  StockIcon,
  ReportsIcon,
  Logo,
  NavigationIcon,
  CloseIcon
} from '../../assets/icons';

import './navigation.styles.css';

const navLinksInfo = [
  { to: '/deliveries', label: 'Deliveries', Icon: DeliveryIcon },
  { to: '/sales', label: 'Sales', Icon: SaleIcon },
  { to: '/stock', label: 'Stock', Icon: StockIcon },
  { to: '/reports', label: 'Reports', Icon: ReportsIcon },
];

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentLocation } = useGlobalContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Sidebar for desktop */}
      <nav className="sidebar" aria-label="Primary navigation">
        <div className="logo">
          <NavLink to="/">
            <Logo />
            <span className="company-name">{currentLocation?.name}</span>
          </NavLink>
        </div>
        <ul>
          {navLinksInfo.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? 'nav-link selected' : 'nav-link'
                }
              >
                <span className="nav-icon">
                  <Icon />
                </span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile header with animated icon */}
      <div className="mobile-header">
        <div className="logo">
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="icon-wrapper">
            {menuOpen ? <CloseIcon /> : <NavigationIcon />}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
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
            <CloseIcon />
          </button>
          <ul>
            {navLinksInfo.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? 'nav-link selected' : 'nav-link'
                  }
                >
                  <span className="nav-icon">
                    <Icon />
                  </span>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
