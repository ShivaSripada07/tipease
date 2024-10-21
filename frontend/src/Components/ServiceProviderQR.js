import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/ServiceProviderQR.css";

const ServiceProviderQR = () => {
  const [serviceProvider, setServiceProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        const token = localStorage.getItem('token');
        const name = localStorage.getItem("name");
        const response = await axios.post('http://localhost:4000/serviceProvider/byName', { name }        ,
            { headers: { Authorization: `Bearer ${token}` } });
        const { _id, password, ...rest } = response.data[0];
        setServiceProvider(rest);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching service provider data:', error);
        setLoading(false);
      }
    };

    fetchServiceProvider();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!serviceProvider) {
    return <div className="error">Error loading service provider data</div>;
  }

  return (
    <div className="sp-qr-container">
      <div className="sp-qr-card">
        <h1 className="sp-qr-title">Your TipEase QR Code</h1>
        <div className="sp-qr-content">
          <div className="sp-qr-info">
            <img src={serviceProvider.imageUrl} alt={serviceProvider.name} className="sp-qr-image" />
            <h2>{serviceProvider.name}</h2>
            <p>Service ID: {serviceProvider.serviceId}</p>
          </div>
          <div className="sp-qr-code">
            <img src={serviceProvider.qrCode} alt="QR Code" className="sp-qr-code-image" />
          </div>
        </div>
        <div className="sp-qr-instructions">
          <p className="sp-qr-main-text">Scan this QR code to pay a tip as a gesture of gratitude</p>
          <p>Your support is greatly appreciated and helps us continue providing excellent service</p>
          <p>Thank you for using TipEase - Making tipping easy and convenient!</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviderQR;