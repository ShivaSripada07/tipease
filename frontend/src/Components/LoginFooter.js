import React from 'react';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import '../styles/LoginFooter.css';
import '../Images/american-express 1.webp';
import '../Images/App Store.webp';
import '../Images/Google play (1).webp';
import '../Images/Huawei.webp';
import '../Images/mastercard-seeklogo.com 1.webp';
import '../Images/visa (1) 1.webp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="login-footer">
      <div className="login-footer-content">
        <div className="login-footer-left">
          <h3>TipEase</h3>
          <p style={{color:'white'}}>The leading cashless tipping platform</p>
          <p style={{color:'white'}}>We help hospitality and service businesses collect and distribute cashless tips quickly and admin free. Our cashless tipping platform is simple and hassle-free for guests, staff and managers!</p>
        </div>
        <div className="login-footer-right">
          <div className="login-footer-column">
            <h4>Businesses</h4>
            <ul>
              <li>Salons & Spas</li>
              <li>Restaurants & Pubs</li>
              <li>Hotels & Tourism</li>
              <li>Bars & Nightclubs</li>
              <li>Sporting & Music Venues</li>
            </ul>
          </div>
          <div className="login-footer-column">
            <h4>Resources</h4>
            <ul>
              <li>Press & Blog</li>
              <li>Knowledge Centre</li>
              <li>Become a Partner</li>
              <li>Tax Resources</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="login-footer-bottom">
        <div className="login-social-icons">
          <Instagram size={24} />
          <Facebook size={24} />
          <Linkedin size={24} />
          <Youtube size={24} />
        </div>
        <div className="login-app-stores">
          <img src={require('../Images/App Store.webp')} alt="App Store" />
          <img src={require('../Images/Huawei.webp')} alt="App Gallery" />
          <img src={require('../Images/Google play (1).webp')} alt="Google Play" />
        </div>
        <div className="login-payment-methods">
          <img src={require('../Images/visa (1) 1.webp')} alt="Visa" />
          <img src={require('../Images/mastercard-seeklogo.com 1.webp')} alt="Mastercard" />
          <img src={require('../Images/american-express 1.webp')} alt="American Express" />
        </div>
        <div className="login-copyright">
          © 2024 TipEase. All Rights Reserved. 
          <Link to="/privacy-policy">Privacy Policy</Link> | 
          <Link to="/terms-of-use">Terms of Use</Link> | 
          <Link to="/subscription-terms-of-use">Subscription Terms of Use</Link>
        </div>
      </div>
    </footer>
  );
};

export default LoginFooter;
