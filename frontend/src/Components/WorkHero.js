import React from 'react';
import '../styles/WorkHero.css';
import '../Images/download-1.webp';

const WorkHero = () => {
  return (
    <section className="work-hero">
      <div className="work-hero-content">
        <div className="work-hero-text">
          <h1>
            TipEase's <span className="work-highlight">cashless tipping</span> platform lets customers tip staff directly
          </h1>
          <p>
            TipEase makes tipping discreet and effortless! Customers scan, tip and pay in 3 seconds, no apps required! Staff earn more and receive tips instantly.
          </p>
          <button className="work-cta-btn">Sign up for free!</button>
        </div>
        <div className="work-hero-image">
          <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Happy staff member" />
        </div>
      </div>
    </section>
  );
};

export default WorkHero;