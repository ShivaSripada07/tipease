import React from 'react';
import '../styles/ResContent.css';

const ResContent = () => {
  return (
    <div className="report-page">
      <h1 className="title" style={{color:'#333'}}>How do I <span className="highlight">report</span> my cashless tips?</h1>
      <p className="description">
        TipEase is a platform to collect tips so we are not at liberty to advise on individual tax cases
        but we can help direct you to the right information.
      </p>
      <p className="sub-description">
        Select from the options below to understand how you can report your tips.
      </p>
      <div className="options-container">
        <div className="option">
          <img 
            src="https://plus.unsplash.com/premium_photo-1663050711804-ba519522ef5f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Self-employed person"
            className="option-image"
          />
          <button className="option-button">I am self-employed</button>
        </div>
        <div className="option">
          <img 
            src="https://images.unsplash.com/photo-1616587896595-51352538155b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8" 
            alt="Employees"
            className="option-image"
          />
          <button className="option-button">I am an employee</button>
        </div>
      </div>
    </div>
  );
};

export default ResContent;