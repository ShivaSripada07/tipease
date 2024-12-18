import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, IndianRupee, MapPin, Phone, Building } from 'lucide-react';
import "../styles/PayTip.css"
import axios from 'axios';
import QRCode from 'react-qr-code';
function PayTip() {
  const { serviceId } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tipAmount, setTipAmount] = useState(10);
  const [userRating, setUserRating] = useState(0);
  const [serviceRating,setServiceRating] = useState(0);
  const [showQRCode, setShowQRCode] = useState(false);
  useEffect(() => {
    const fetchServiceProvider = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          'http://localhost:4000/serviceProvider',
          { id: serviceId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.data[0]) {
          throw new Error('Failed to fetch service provider data');
        }
        console.log(response.data[0].bankDetails);
        const data = response.data[0]; 
        const orgResponse = await axios.post(
          'http://localhost:4000/organisation/byorg',
          { id: data.organisationId }  
        );
        data.organisationName = orgResponse.data[0].organisationName;
        data.location = orgResponse.data[0].location;
        data.mobileNumber = orgResponse.data[0].mobileNumber;
        setProvider(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceProvider();
  }, [serviceId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!provider) return <div className="error">No provider found</div>;

  const handleTipChange = (amount) => {
    setTipAmount(amount);
  };

  const handleCustomTipChange = (e) => {
    setTipAmount(Math.max(0, parseInt(e.target.value) || 0));
  };
  const upiLink = `upi://pay?pa=${provider.bankDetails}&pn=${provider.name}&am=${tipAmount}&cu=INR`;
  

  const handlePayTip = () => {
    console.log(upiLink);
    console.log(`Paying ₹${tipAmount} tip to ${provider.name}`);
    

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // Mobile: Open UPI app directly
        window.location.href = upiLink;
        console.log(`Paying ₹${tipAmount} tip to ${provider.name} from mobile `);
    } else {
      setShowQRCode(true); 
    }
};

  const handleRating = (rating) => {
    setUserRating(rating);
    // Here you would typically send this rating to your backend
    console.log(`User rated ${rating} stars`);
  };
  const handleServiceRating=(rating)=>
  {
    setServiceRating(rating);
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
          <h6>We value your feedback. How would you rate our service?</h6>
          <div className="rating">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={index < serviceRating ? 'filled' : ''}
              onClick={() => handleServiceRating(index + 1)}
            />
          ))}
        </div>
          <p className="service-message">
            Greetings! I'm {provider.name}, and I'm truly grateful for the opportunity to serve you today. Your generosity not only supports my dedication to excellent service but also encourages a culture of appreciation in our community.
          </p>
          <div className="org-details">
            <p><Building size={16} /> {provider.organisationName}</p>
            <p><MapPin size={16} /> {provider.location}</p>
            <p><Phone size={16} /> {provider.mobileNumber}</p>
          </div>
          <p className="service-id">Service ID: {provider.serviceId}</p>
        </div>
      </div>
      <div className="tip-section">
        <div className={` ${showQRCode ? "hidden":"" }`}>
        <h3>Choose Your Tip Amount</h3>
        <div className="tip-buttons">
          {[10, 15, 20, 25].map((amount) => (
            <button
              key={amount}
              className={`tip-button ${tipAmount === amount ? 'active' : ''}`}
              onClick={() => handleTipChange(amount)}
            >
              ₹{amount}
            </button>
          ))}
        </div>
        <div className="tip-input">
          <IndianRupee size={20} />
          <input
            type="tel"
            value={tipAmount}
            onChange={handleCustomTipChange}
            className="custom-tip"
            placeholder="Enter custom amount"
          />
        </div>
        <button className="pay-button" onClick={handlePayTip}>
          <IndianRupee size={20} />
          Pay Tip
        </button>
        </div>
        {showQRCode && (
                <div className="mt-4 flex flex-col items-center">
                    <h2>Scan the QR Code to Pay</h2>
                    <div style={{ height: "auto", margin: "0 auto", width: "100%" }}>
  <QRCode
    size={256}
    style={{ maxWidth: "100%", width: "100%" }}
    value={upiLink}
    viewBox={`0 0 256 256`}
  />
</div>
                </div>
            )}
        
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
      <div className="thank-you-message">
        <p>Thank you for taking the time to recognize our service with a tip. Your generosity is deeply appreciated and motivates us to continually enhance our service quality.</p>
        <p>We look forward to welcoming you back soon for another exceptional experience!</p>
      </div>
    </div>
  );
}

export default PayTip;