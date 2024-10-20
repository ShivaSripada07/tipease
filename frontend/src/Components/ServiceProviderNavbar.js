import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, HelpCircle, User, LogOut } from 'lucide-react';
import '../styles/ServiceProviderNavbar.css'

const ServiceProviderNavbar = () => {
  const name = localStorage.getItem("name") || "Service Provider";
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="sp-navbar">
      <div className="sp-navbar-container">
        <Link to="/servicer" className="sp-logo">
          <span className="sp-menu-icon"> ☰ </span>
            TipEase
        </Link>
        <ul className="sp-nav-links">
          <li>
            <Link to="/service/dashboard" className="sp-nav-link">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/service/help" className="sp-nav-link">
              <HelpCircle size={20} />
              <span>Help</span>
            </Link>
          </li>
          <li>
            <Link to="/service/profile" className="sp-nav-link">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button className="sp-nav-link sp-logout-btn" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
        <div className="sp-welcome-message">Welcome, {name}</div>
      </div>
    </nav>
  );
};

export default ServiceProviderNavbar;
