import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import "../styles/UserNavbar.css";

const UserNavbar = () => {
    const [showQrReader, setShowQrReader] = useState(false);
    const [isScannerRunning, setIsScannerRunning] = useState(false); 
    const name = localStorage.getItem("name") || "User";
    const navigate = useNavigate();
    const qrScannerRef = useRef(null);
  
    useEffect(() => {
      const startScanner = async () => {
        if (showQrReader && !isScannerRunning) {
          const html5QrCode = new Html5Qrcode("qr-reader-custom");
          qrScannerRef.current = html5QrCode;
          
          const qrCodeSuccessCallback = (decodedText) => {
            handleScan(decodedText);
          };
  
          const config = { fps: 10, qrbox: { width: 250, height: 250 } };
          
          try {
            await html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback, handleError);
            setIsScannerRunning(true);
          } catch (err) {
            handleError(err);
          }
        }
      };
  
      const stopScanner = async () => {
        if (qrScannerRef.current && isScannerRunning) {
          try {
            await qrScannerRef.current.stop();
            setIsScannerRunning(false); 
          } catch (err) {
            console.error("Error stopping the scanner:", err);
          }
        }
      };
  
      if (showQrReader) {
        startScanner();
      } else {
        stopScanner();
      }
  
      return () => {
        stopScanner(); 
      };
    }, [showQrReader, isScannerRunning]);
  
    const handleLogout = () => {
      localStorage.clear();
      navigate('/');
    };
  
    const handleScan = (decodedText) => {
      window.open(decodedText, '_blank');
      setShowQrReader(false);
    };
  
    const handleError = (err) => {
      console.error("QR Scanner Error:", err);
    };
  
    const toggleScanner = () => {
      setShowQrReader(prev => !prev);
    };
  
    return (
      <nav className="user-navbar-custom">
        <div className="user-container-custom">
          <Link to="/user" className="user-logo-custom">
            <span className="user-menu-icon-custom">☰</span>
            <span style={{color:'#05aa6d'}}>TipEase</span>
          </Link>
          <ul className="user-nav-links-custom">
            <li>
              <Link to="/user/how" className="user-nav-link-custom" aria-label="How it works">
                <i className="bi bi-info-circle"></i>
                How it works
              </Link>
            </li>
            <li>
              <Link to="/user/resource" className="user-nav-link-custom" aria-label="Resources">
                <i className="bi bi-book"></i>
                Resources
              </Link>
            </li>
            <li>
              <button className="user-nav-link-custom" onClick={toggleScanner} aria-label="Scan QR code">
                <i className="bi bi-qr-code-scan"></i>
                Scan
              </button>
            </li>
            <li>
              <Link to="/user/profile" className="user-nav-link-custom" aria-label="Profile">
                <i className="bi bi-person"></i>
                Profile
              </Link>
            </li>
            <li>
              <button className="user-nav-link-custom" onClick={handleLogout} aria-label="Logout">
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </li>
          </ul>
          <div className="user-welcome-message-custom" style={{color:'#05aa6d'}}>
            Welcome, {name}
          </div>
        </div>
        {showQrReader && (
          <div className="qr-reader-modal-custom">
            <div className="qr-reader-container-custom">
              <button className="close-qr-reader-custom" onClick={() => setShowQrReader(false)} aria-label="Close QR reader">×</button>
              <div id="qr-reader-custom" style={{ width: '100%', maxWidth: '400px' }}></div>
            </div>
          </div>
        )}
      </nav>
    );
};

export default UserNavbar;
