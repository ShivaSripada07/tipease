import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
        <span className="menu-icon" style={{ fontSize: '2rem', marginTop: '-20px' }}>☰</span>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ color: 'white', fontSize: '1.6rem' }}>TipEase</h1>
          </Link>
        </div>
        <nav className="nav" style={ { marginTop : '-10px' , fontSize : '1.1rem'}}>
          <Link to="/work">How it works</Link>
          <Link to="/forwhat">Who is it for</Link>
          <Link to="/why">Why TipEase</Link>
          <Link to="/resource">Resources</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
        <div className="actions" style={{marginTop : '-7px'}}>
          <button className="signup-btn" onClick={() => navigate('/signup')}>Sign up for free!</button>
          <Link to="/login" className="login-link">Login</Link>
          <div className="language-selector">
            <span className="globe-icon">
              <i className="bi bi-globe" style={{ color: 'white' }}></i>
            </span>
            <span className="arrow-icon" style={{ color: 'white' }}>▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;