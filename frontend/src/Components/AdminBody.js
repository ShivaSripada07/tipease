import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminBody.css';

const AdminBody = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('http://localhost:4000/organisation');
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const fetchServiceProviders = async (orgId) => {
    try {
      const response = await axios.post('http://localhost:4000/serviceProvider/byOrg',{organisationId:orgId});
      setServiceProviders(response.data);
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };

  const handleOrgClick = (org) => {
    setSelectedOrg(org);
    fetchServiceProviders(org.organisationId);
  };

  return (
    <div className="admin-body">
      <h2 className="section-title">Organizations</h2>
      <div className="card-grid">
        {organizations.map((org) => (
          <div
            key={org.organisationId}
            className="card"
            onClick={() => handleOrgClick(org)}
          >
            <div className="card-image-container">
              <img
                src={org.imageUrl}
                alt={org.organisationName}
                className="org-image"
              />
            </div>
            <div className="card-content">
              <div className="org-info">
                <h3 className="org-name">{org.organisationName}</h3>
                <p className="org-location">{org.location}</p>
              </div>
              <div className="card-actions">
                <button className="action-btn edit-btn">Edit</button>
                <button className="action-btn delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedOrg && (
        <div className="service-providers-section">
          <h2 className="section-title">Service Providers for {selectedOrg.organisationName}</h2>
          <div className="card-grid">
            {serviceProviders.map((provider) => (
              <div key={provider.serviceId} className="card">
                <div className="card-image-container">
                  <img
                    src={provider.imageUrl}
                    alt={provider.name}
                    className="provider-image"
                  />
                </div>
                <div className="card-content">
                  <div className="provider-info">
                    <h3 className="provider-name">{provider.name}</h3>
                    <p className="provider-mobile">{provider.mobileNumber}</p>
                  </div>
                  <div className="card-actions">
                    <button className="action-btn edit-btn">Edit</button>
                    <button className="action-btn delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBody;