import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import '../styles/ServiceProviderHelp.css';

const ServiceProviderHelp = () => {
  return (
    <div className="sp-help-container" style={{marginTop:'40px'}}>
      <h1 className="sp-help-title">How Can We Help You?</h1>
      <div className="sp-help-content">
        <div className="sp-help-card">
          <Mail className="sp-help-icon" />
          <h2>Email Support</h2>
          <p>Send us an email and we'll get back to you within 24 hours.</p>
          <a href="mailto:support@tipease.com" className="sp-help-link">support@tipease.com</a>
        </div>
        <div className="sp-help-card">
          <Phone className="sp-help-icon" />
          <h2>Phone Support</h2>
          <p>Call us directly for immediate assistance.</p>
          <a href="tel:+1234567890" className="sp-help-link">+1 (234) 567-890</a>
        </div>
        <div className="sp-help-card">
          <MessageCircle className="sp-help-icon" />
          <h2>Live Chat</h2>
          <p>Chat with our support team in real-time.</p>
          <button className="sp-help-button">Start Chat</button>
        </div>
      </div>
      <div className="sp-help-faq">
        <h2>Frequently Asked Questions</h2>
        <ul>
          <li>How do I update my profile information?</li>
          <li>What should I do if I'm having issues with payments?</li>
          <li>How can I view my earnings history?</li>
          <li>What are the best practices for increasing tips?</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceProviderHelp;
