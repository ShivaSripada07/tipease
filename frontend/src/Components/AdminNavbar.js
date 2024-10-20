import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminNavbar.css';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const name = localStorage.getItem("name") || "Admin";
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <nav className="admin-navbar">
      <div className="container">
        <Link to="/admin" className="logo">
          <span className="menu-icon">☰</span>
          TipEase
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/admin/dashboard" className="nav-link">
              <i className="bi bi-house-door"></i>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/addOrg" className="nav-link">
              <i className="bi bi-building"></i>
              Add Organisations
            </Link>
          </li>
          <li>
            <Link to="/admin/profile" className="nav-link">
              <i className="bi bi-person"></i>
              Profile
            </Link>
          </li>
          <li>
            <button className="nav-link" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </li>
        </ul>
        <div className="welcome-message">
          Welcome, {name}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;