import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/Welcome.css'

const Welcome = () => {
  return (
    <div className="Welcome-container">
      <h1 className="Welcome-title">
        Ready to <span className="Welcome-highlight">join</span> TipEase?
      </h1>
      <p className="Welcome-description">
        TipEase's innovative digital tipping platform supports hospitality and services business owners, staff
        and customers across the India by providing a seamless cashless tipping experience. Tell us more
        about your business in today!
      </p>
      <button className="Welcome-button">
        Sign up for free! <ArrowRight className="Welcome-icon" size={20} />
      </button>
    </div>
  );
};

export default Welcome;