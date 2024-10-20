// eslint-disable-next-line react-hooks/exhaustive-deps
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminBody.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminBody = () => {
  const navigate = useNavigate();
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [serviceProviders, setServiceProviders] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetchOrganizations();
  },[]);

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
      const response = await axios.post(
        'http://localhost:4000/serviceProvider/byOrg',
        { organisationId: orgId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setServiceProviders(response.data);
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };

  const handleOrgClick = (org) => {
    setSelectedOrg(org);
    fetchServiceProviders(org.organisationId);
  };
  const handleEdit = (org) =>{
      navigate('./edit',{state:{data:org , reloc:'/org'}});
  };
  const handleDelete = async (org) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete ${org.organisationName}?`);
  
    if (confirmDelete) {
      try {
        const response = await axios.delete('http://localhost:4000/organisation/delete', {
          headers: {
            Authorization: `Bearer ${token}`
          },
          data: { organisationName: org.organisationName }
        });
        
        if (response.status === 200) {
          toast.success("Deleted successfully");
          window.location.reload();
          //console.log(`${org.organisationName} has been deleted.`);
        } else {
          toast.error("Unable to delete.Try again later");
          console.log(`Failed to delete ${org.organisationName}.`);
        }
      } catch (error) {
        console.error("Error occurred while deleting the organisation:", error);
      }
    } else {
      console.log(`${org.organisationName} deletion cancelled.`);
    }
  };
  const handleServiceEdit = (provider)=>
  {
    navigate('/admin/serviceEdit', { state: { data: provider, reloc: '/org' } });
  };
  const handleServiceDelete = async(provider)=>
  {
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
          window.location.reload();
        } else {
          toast.error("Unable to delete.Try again later");
          console.log(`Failed to delete ${provider.name}.`);
        }
      } catch (error) {
        console.error("Error occurred while deleting the organisation:", error);
      }
    } else {
      console.log(`${provider.name} deletion cancelled.`);
    }
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
                <button className="action-btn edit-btn" onClick={()=>handleEdit(org)}>Edit</button>
                <button className="action-btn delete-btn" onClick={()=>handleDelete(org)}>Delete</button>
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
                    <button className="action-btn edit-btn" onClick={()=>handleServiceEdit(provider)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={()=>handleServiceDelete(provider)}>Delete</button>
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