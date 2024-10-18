import React from 'react';
import { Instagram, Facebook, Linkedin, Youtube, Mail, MapPin } from 'lucide-react';
import '../styles/ContactTemplate.css'

const ContactTemplate = () => {
  return (
    <div className="ContactTemplate-container">
      <h1 className="ContactTemplate-title">
        <span className="ContactTemplate-highlight">Get in touch</span> with us. We're here to assist you.
      </h1>
      <p className="ContactTemplate-description">
        Whether you would like to receive more information, join our team or need connection support, we are happy to
        hear from you and help any way we can.
      </p>
      <div className="ContactTemplate-content">
        <div className="ContactTemplate-info">
          <h2 className="ContactTemplate-subtitle">Let's talk</h2>
          <p className="ContactTemplate-text">
            Need support or have a question about TipEase? We're here to help.
          </p>
          <h3 className="ContactTemplate-company">Contact Details</h3>
          <div className="ContactTemplate-contact">
            <Mail size={20} style={{marginTop:'0.1rem'}}/>
            <span>teamtipease@gmail.com</span>
          </div>
          <div className="ContactTemplate-contact">
            <MapPin size={20} style={{marginTop:'0.1rem'}}/>
            <span>
              Hitech City,<br />
              Hyderbad, 501510<br />
              India
            </span>
          </div>
          <div className="ContactTemplate-social">
            <Instagram size={24} />
            <Facebook size={24} />
            <Linkedin size={24} />
            <Youtube size={24} />
          </div>
        </div>
        <form className="ContactTemplate-form">
          <div className="ContactTemplate-formRow">
            <div className="ContactTemplate-formGroup">
              <label htmlFor="firstName">First name*</label>
              <input type="text" id="firstName" required />
            </div>
            <div className="ContactTemplate-formGroup">
              <label htmlFor="lastName">Last name*</label>
              <input type="text" id="lastName" required />
            </div>
          </div>
          <div className="ContactTemplate-formRow">
            <div className="ContactTemplate-formGroup">
              <label htmlFor="email">Email*</label>
              <input type="email" id="email" required />
            </div>
            <div className="ContactTemplate-formGroup">
              <label htmlFor="phone">Phone Number*</label>
              <input type="tel" id="phone" required />
            </div>
          </div>
          <div className="ContactTemplate-formRow">
          </div>
          <div className="ContactTemplate-formGroup">
            <label>Select Subject*</label>
            <div className="ContactTemplate-radioGroup">
              <label>
                <input type="radio" name="subject" value="generalInquiry" />
                General Inquiry
              </label>
              <label>
                <input type="radio" name="subject" value="customerSupport" />
                Customer Support
              </label>
              <label>
                <input type="radio" name="subject" value="signUp" />
                Sign up
              </label>
            </div>
          </div>
          <div className="ContactTemplate-formGroup">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="4"></textarea>
          </div>
          <button type="submit" className="ContactTemplate-submit" style={{marginTop:'1rem'}}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactTemplate;