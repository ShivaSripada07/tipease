import React from 'react';
import '../styles/Hero.css';
import { useNavigate } from 'react-router-dom';


const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h2>TipEase is the best <span className="highlight">cashless tipping platform</span> for your business!</h2>
          <p>TipEase helps your team earn more tips and reduce costs for your business! Empower your team with TipEase and make tipping fair.</p>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Happy employee using TipEase" />
        </div>
      </div>
    </section>
  );
};

export default Hero;