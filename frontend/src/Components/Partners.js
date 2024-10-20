import React from 'react';
import '../styles/Partners.css';
import '../Images/dodoPub.webp';
import '../Images/ollique.webp';
import '../Images/residenceINN.webp';
import '../Images/sassoon.webp';
import '../Images/toniAndGuy.webp';

const Partners = () => {
  const partners = [
    { name: 'TONI&GUY', logo: require('../Images/dodoPub.webp') },
    { name: 'URBAN RETREAT', logo: require('../Images/ollique.webp') },
    { name: 'DODO PUB CO', logo: require('../Images/residenceINN.webp') },
    { name: 'SASSOON SALON', logo: require('../Images/sassoon.webp') },
    { name: 'BIANCO', logo: require('../Images/toniAndGuy.webp') },
  ];

  return (
    <section className="partners">
      <div>
        <h1 style={{textAlign:'center',fontSize:'2rem'}}>Trusted by leading hospitality businesses</h1>
      </div>
      <div className="container">
        <div className="partner-logos" style={{marginLeft:'18%'}}>
          {partners.map((partner, index) => (
            <div key={index} className="partner-logo">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;