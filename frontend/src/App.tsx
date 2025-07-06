import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';

import Home from './pages/home/Home';
import Deliveries from './pages/deliveries/Deliveries';
import Sales from './pages/sales/Sales';
import Stock from './pages/stock/Stock';
import Reports from './pages/reports/Reports';

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <div className="app">
        <Navigation />
          <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/deliveries" element={<Deliveries />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
