import React from 'react';
import '../styles/CashlessTippingProcess.css'

const CashlessTippingProcess = () => {
  const steps = [
    {
      title: 'Scan',
      description: 'Customers simply scan a QR code from their mobile phone camera to access our tipping platform. No app required!',
      image: 'https://media.istockphoto.com/id/960497630/photo/qr-code-payment-e-wallet-cashless-technology-concept-man-scanning-tag-in-coffee-shop-accepted.webp?a=1&b=1&s=612x612&w=0&k=20&c=mtvS-sOWc6h7sh3XdDKruzltwLQksFkbj5mJjtFSIbw='
    },
    {
      title: 'Tip',
      description: 'They then choose how much tip they would like to leave and can also leave a review and rating at the same time',
      image: 'https://media.istockphoto.com/id/1159438399/photo/woman-in-a-cafe-shopping-online-with-credit-card.jpg?s=1024x1024&w=is&k=20&c=KIxAq8b8KKS6XXKLF8PoGjj_HnAuFjB_QcWFr8QGwMU='
    },
    {
      title: 'Pay',
      description: 'The tip is sent directly to the staff members(s) with real-time notifications and they can track and view all tip transactions for full transparency.',
      image: 'https://images.unsplash.com/photo-1556741533-411cf82e4e2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8'
    }
  ];

  return (
    <section className="cashless-tipping-process">
      <h2>How does <span className="highlight">cashless tipping</span> work?</h2>
      <p className="description">
        If your business accepts tips, TipEase's cashless tipping platform is for you! Customers simply scan a
        QR code with their smartphone to leave a contactless tip, rating and review.
      </p>
      <div className="process-steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="step-image">
              <img src={step.image} alt={`${step.title} process`} />
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CashlessTippingProcess;