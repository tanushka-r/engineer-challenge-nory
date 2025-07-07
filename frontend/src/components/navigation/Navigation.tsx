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
  { to: '/deliveries', label: 'Deliveries', dataCy: 'nav-deliveries', Icon: DeliveryIcon },
  { to: '/sales', label: 'Sales', dataCy: 'nav-sales', Icon: SaleIcon },
  { to: '/stock', label: 'Stock', dataCy: 'nav-stock', Icon: StockIcon },
  { to: '/reports', label: 'Reports', dataCy: 'nav-reports', Icon: ReportsIcon },
];

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentLocation } = useGlobalContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Sidebar for desktop */}
      <nav className="sidebar" aria-label="Primary navigation" data-cy="navigation">
        <div className="logo">
          <NavLink to="/" data-cy="nav-home">
            <Logo />
            <span className="company-name">{currentLocation?.name}</span>
          </NavLink>
        </div>
        <ul>
          {navLinksInfo.map(({ to, label, Icon, dataCy }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? 'nav-link selected' : 'nav-link'
                }
                data-cy={dataCy}
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
            <span className="company-name">{currentLocation?.name}</span>
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
