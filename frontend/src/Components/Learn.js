import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/Learn.css';
import '../Images/WhatsApp Image 2024-10-18 at 23.14.54.jpeg';
const Learn = () => {
  return (
    <div className="learn-container">
      <div className="content">
        <h2 className="title">
          Want to find out more about how our tipping platform can help your business?
        </h2>
        <button className="learn-button">
          LEARN MORE <ArrowRight className="arrow-icon" size={20} />
        </button>
      </div>
      <div className="image-container">
        <img
          src={require('../Images/WhatsApp Image 2024-10-18 at 23.14.54.jpeg')}
          alt="Woman using smartphone"
          className="woman-image"
        />
      </div>
      <div className="tag">TipEase</div>
    </div>
  );
};

export default Learn;