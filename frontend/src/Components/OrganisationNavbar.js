import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { LayoutDashboard, UserPlus, User, LogOut } from 'lucide-react';
import "../styles/OrganisationNavbar.css"
const OrganisationNavbar = () => {
  const name = localStorage.getItem("name") || "Organisation";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <nav className="orgNavbar-navbar">
      <div className="orgNavbar-navbar-container">
        <Link to="/admin" className="orgNavbar-logo">
          <span className="menu-icon">☰</span>
          TipEase
        </Link>
        <ul className="orgNavbar-nav-links">
          <li>
            <Link to="/org/dashboard" className="orgNavbar-nav-link">
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/org/addService" className="orgNavbar-nav-link">
              <UserPlus size={20} />
              <span>Add Service Provider</span>
            </Link>
          </li>
          <li>
            <Link to="/org/profile" className="orgNavbar-nav-link">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <button className="orgNavbar-nav-link orgNavbar-logout-btn" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
        <div className="orgNavbar-welcome-message">Welcome, {name}</div>
      </div>
    </nav>
  );
};

export default OrganisationNavbar;
