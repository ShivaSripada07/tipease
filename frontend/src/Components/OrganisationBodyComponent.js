import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/OrganisationBodyComponent.css"
const OrganisationBodyComponent = () => {
  const navigate = useNavigate();
  const [serviceProviders, setServiceProviders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  const fetchServiceProviders = async () => {
    try {
      const organisationId = localStorage.getItem("id");
      if (!organisationId) {
        throw new Error('Organisation ID not found');
      }
      console.log('Organisation ID:', organisationId);
      const serviceProvidersResponse = await axios.post(
        `http://localhost:4000/serviceProvider/byOrg`, 
        {
          organisationId: organisationId 
        }
      );
      //console.log('Service Providers Response:', serviceProvidersResponse.data);
      setServiceProviders(serviceProvidersResponse.data);
    } catch (error) {
      //console.error('Error fetching service providers:', error);
      if (error.response) {
        //console.error('Response data:', error.response.data);
        //console.error('Response status:', error.response.status);
      }
      toast.error('Failed to fetch service providers');
    }
  };
  
  const handleEdit = (provider) => {
    navigate('/admin/serviceEdit', { state: { data: provider, reloc: '/org' } });
  };
  const handleDelete = async (provider) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${provider.name}?`);
  
    if (confirmDelete) {
      try {
        const response = await axios.delete('http://localhost:4000/serviceProvider/delete', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { name: provider.name }
        });
        
        if (response.status === 200) {
          toast.success("Deleted successfully");
          fetchServiceProviders(); 
        } else {
          toast.error("Unable to delete. Try again later");
        }
      } catch (error) {
        //console.error("Error occurred while deleting the service provider:", error);
        toast.error("Failed to delete service provider");
      }
    }
  };

  return (
    <div className="orgBody-organisation-body">
      <h2 className="orgBody-section-title">Service Providers</h2>
      <div className="orgBody-card-grid">
        {serviceProviders.map((provider) => (
          <div key={provider.id} className="orgBody-card">
            <div className="orgBody-card-image-container">
              <img
                src={provider.imageUrl}
                alt={provider.name}
                className="orgBody-provider-image"
              />
            </div>
            <div className="orgBody-card-content">
              <div className="orgBody-provider-info">
                <h3 className="orgBody-provider-name">{provider.name}</h3>
                <p className="orgBody-provider-email">{provider.email}</p>
                <p className="orgBody-provider-mobile">{provider.mobileNumber}</p>
              </div>
              <div className="orgBody-card-actions">
                <button className="orgBody-action-btn orgBody-edit-btn" onClick={() => handleEdit(provider)}>Edit</button>
                <button className="orgBody-action-btn orgBody-delete-btn" onClick={() => handleDelete(provider)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganisationBodyComponent;
