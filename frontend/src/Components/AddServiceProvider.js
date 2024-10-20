import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import "../styles/AddServiceProvider.css";

const AddServiceProvider = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    serviceId: '',
    imageUrl: '',
    bankDetails: '',
    role: 'serviceProvider',
    organisationId: localStorage.getItem('id')
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/serviceProvider/add', formData);
      toast.success("Service provider added successfully");
      navigate('/organisation/dashboard');
    } catch (error) {
      toast.error("Failed to add service provider");
      console.error('Error adding service provider:', error);
    }
  };

  return (
    <div className="add-service-provider-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Add Service Provider</h2>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="form-group">
              <label htmlFor={key} className="form-label">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              <input
                type={key === 'email' ? 'email' : key === 'password' ? 'password' : key === 'mobileNumber' || key === 'serviceId' || key === 'organisationId' ? 'number' : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                required
                className="form-input"
                readOnly={key === 'role' || key === 'organisationId'}
              />
            </div>
          ))}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/org')}
              className="back-btn"
            >
              <ArrowLeft className="btn-icon" />
              Back
            </button>
            <button
              type="submit"
              className="add-btn"
            >
              <Save className="btn-icon" />
              Add Service Provider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddServiceProvider;