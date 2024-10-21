import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/ServiceProviderProfile.css';

const ServiceProviderProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    serviceId: '',
    imageUrl: '',
    bankDetails: '',
    role: '',
    organisationId: ''
  });

  useEffect(() => {
    fetchServiceProviderData();
  }, []);

  const fetchServiceProviderData = async () => {
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const response = await axios.post('http://localhost:4000/serviceProvider', { id }      ,
        { headers: { Authorization: `Bearer ${token}` } });
      const {__v ,qrCode,_id, password, ...rest } = response.data[0];
      setFormData(rest);
    } catch (error) {
      toast.error("Failed to fetch service provider data");
      console.error('Error fetching service provider data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const updatedFormData = {
        ...formData,
        id
      };
      await axios.patch('http://localhost:4000/serviceProvider/edit', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="sp-profile-container">
      <div className="sp-profile-form-card">
        <div className="sp-profile-form-header">
          <h2 className="sp-profile-form-title">Service Provider Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="sp-profile-form">
          <div className="sp-profile-image-preview">
            <img src={formData.imageUrl} alt="Service Provider" className="sp-profile-image" />
          </div>
          {Object.entries(formData).map(([key, value]) => (
            key !== 'imageUrl' && (
              <div key={key} className="sp-profile-form-group">
                <label htmlFor={key} className="sp-profile-form-label">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <input
                  type={key === 'email' ? 'email' : key === 'mobileNumber' || key === 'serviceId' || key === 'organisationId' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={key === 'email' || key === 'role' || key === 'organisationId' || key === 'serviceId'}
                  className="sp-profile-form-input"
                />
              </div>
            )
          ))}
          <div className="sp-profile-form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="sp-profile-back-btn"
            >
              <ArrowLeft className="sp-profile-btn-icon" />
              Back
            </button>
            <button
              type="submit"
              className="sp-profile-save-btn"
            >
              <Save className="sp-profile-btn-icon" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceProviderProfile;
