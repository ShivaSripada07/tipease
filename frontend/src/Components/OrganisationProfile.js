import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, DollarSign, MapPin, Phone, Building } from 'lucide-react';
import "../styles/PayTip.css"
import axios from 'axios';

function PayTip() {
  const { serviceId } = useParams();
  const [provider, setProvider] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipAmount, setTipAmount] = useState(5);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const providerResponse = await axios.post(
          'http://localhost:4000/serviceProvider',
          { id: serviceId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (!providerResponse.data[0]) {
          throw new Error('Failed to fetch service provider data');
        }
        
        const providerData = providerResponse.data[0];
        setProvider(providerData);

        const orgResponse = await axios.post(
          'http://localhost:4000/organisation/byorg',
          { id: providerData.organisationId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!orgResponse.data) {
          throw new Error('Failed to fetch organization data');
        }

        setOrganization(orgResponse.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!provider || !organization) return <div className="error">No data found</div>;

  const handleTipChange = (amount) => {
    setTipAmount(amount);
  };

  const handlePayTip = () => {
    console.log(`Paying $${tipAmount} tip to ${provider.name}`);
  };

  const handleRating = (rating) => {
    setUserRating(rating);
  };

  return (
    <div className="paytip-container">
      <h1 className="site-title">TipEase</h1>
      <div className="paytip-card">
        <div className="provider-image">
          <img src={provider.imageUrl} alt={provider.name} />
        </div>
        <div className="provider-info">
          <h2>{provider.name}</h2>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={index < Math.round(provider.rating) ? 'filled' : ''}
                onClick={() => handleRating(index + 1)}
              />
            ))}
            <span className="rating-text">{provider.rating ? provider.rating.toFixed(1) : 'N/A'}</span>
          </div>
          <p className="service-message">
            Hello, I'm {provider.name}. Thank you for allowing me to serve you today. Your generosity is greatly appreciated and helps support my passion for excellent service.
          </p>
          <div className="org-details">
            <p><Building size={16} /> {organization.organisationName}</p>
            <p><MapPin size={16} /> {organization.location}</p>
            <p><Phone size={16} /> {organization.mobileNumber}</p>
          </div>
          <p className="service-id">Service ID: {provider.serviceId}</p>
        </div>
      </div>
      <div className="tip-section">
        <h3>Choose Your Tip Amount</h3>
        <div className="tip-buttons">
          {[5, 10, 15, 20].map((amount) => (
            <button
              key={amount}
              className={`tip-button ${tipAmount === amount ? 'active' : ''}`}
              onClick={() => handleTipChange(amount)}
            >
              ${amount}
            </button>
          ))}
          <input
            type="tel"
            value={tipAmount}
            onChange={(e) => setTipAmount(Math.max(0, parseInt(e.target.value) || 0))}
            className="custom-tip"
            placeholder="Custom"
          />
        </div>
        <button className="pay-button" onClick={handlePayTip}>
          <DollarSign size={20} />
          Pay Tip
        </button>
      </div>
      <div className="user-rating-section">
        <h3>Rate Your Experience</h3>
        <div className="user-rating">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={index < userRating ? 'filled' : ''}
              onClick={() => handleRating(index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PayTip;