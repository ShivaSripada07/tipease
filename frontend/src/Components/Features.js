import React from 'react';
import '../styles/Features.css';

const Features = () => {
  const features = [
    "TipEase helps businesses collect and distribute tips to their employees",
    "Customers can leave a tip with no app required",
    "TipEase processes and distributes tips which reduces costs for businesses",
    "Tip recipients benefit from increased tips and transparency"
  ];

  return (
    <section className="features">
      <div className="container">
        <div className="features-image">
          <img src="https://images.unsplash.com/photo-1556742208-999815fca738?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="TipEase in action" />
        </div>
        <div className="features-content">
          <h2 style={{ color: 'white' }}>TipEase has created <span className="highlight">a new way</span> to collect and distribute tips!</h2>
          <ul className="feature-list">
            {features.map((feature, index) => (
              <li key={index}>
                <span className="check-icon">✓</span>
                <span style={{ color: 'white' }}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Features;