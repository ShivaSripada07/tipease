import React from 'react';
import '../styles/Business.css';
import { Grid } from 'lucide-react';

const businessTypes = [
  { title: 'Salons & Spas', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { title: 'Restaurants & Pubs', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { title: 'Hotels & Tourism', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { title: 'Bars & Nightlife', image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { title: 'Events & Entertainment', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { title: 'Partnerships', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
];
const Business = () => {
  return (
    <div className="business-container">
      <h1 className="business-title">
        Best <span className="highlight">tipping platform</span> for all business types
      </h1>
      <div className="business-grid">
        {businessTypes.map((business, index) => (
          <div key={index} className="business-card">
            <img src={business.image} alt={business.title} className="business-image" />
            <div className="business-overlay">
              <Grid className="business-icon" />
              <h2>{business.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Business;