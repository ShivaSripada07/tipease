import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="menu-icon">☰</span>
          <h1 style={{ color: 'white', fontSize: '1.6rem' }}>TipEase</h1>
        </div>
        <nav className="nav">
          <a href="#">How it works</a>
          <a href="#">Who is it for</a>
          <a href="#">Why TipEase</a>
          <a href="#">Resources</a>
          <a href="#">Contact Us</a>
        </nav>
        <div className="actions">
          <button className="signup-btn">Sign up for free!</button>
          <a href="#" className="login-link">Login</a>
          <div className="language-selector">
            <span className="globe-icon">🌐</span>
            <span className="arrow-icon">▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;