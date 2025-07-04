import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Deliveries from "./pages/deliveries/Deliveries";

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div className="app">
        {/* Sidebar for desktop */}
        <nav className="sidebar">
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

        {/* Mobile hamburger */}
        <div className="mobile-header">
          <div className="logo">
            <Link to="/">LOGO</Link>
          </div>
          <button className="hamburger" onClick={toggleMenu}>
            ☰
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            <button className="close-btn" onClick={closeMenu}>
              ×
            </button>
            <ul>
              <li><Link to="/deliveries" onClick={closeMenu}>Deliveries</Link></li>
              <li><Link to="/sales" onClick={closeMenu}>Sales</Link></li>
              <li><Link to="/stock" onClick={closeMenu}>Stock</Link></li>
              <li><Link to="/reports" onClick={closeMenu}>Reports</Link></li>
            </ul>
          </div>
        )}
          <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/sales" element={<div>Sales Content</div>} />
            <Route path="/stock" element={<div>Stock Content</div>} />
            <Route path="/reports" element={<div>Reports Content</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
