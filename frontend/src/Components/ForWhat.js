import React from 'react';
import { ArrowRight } from 'lucide-react';
import '../styles/ForWhat.css';

const ForWhat = () => {
  return (
    <div className="landing-page">
      <div className="content">
        <h1 className="title" style={{color:'#333'}}>
          Best <span className="highlight">digital tipping solution</span> for any type of business
        </h1>
        <p className="description">
          EasyTip helps all hospitality and service businesses collect, distribute and track digital tips with ease.
        </p>
        <button className="cta-button" style={{ fontSize: '1.1rem', fontWeight: '600' , width : '13.6rem' }}>
          Sign up for free! <ArrowRight className="icon" size={20} />
        </button>
      </div>
      <div className="image-container">
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="Delivery person"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default ForWhat;