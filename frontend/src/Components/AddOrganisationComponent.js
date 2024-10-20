import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AddOrganizationComponent.css';

const AddOrganizationComponent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    organisationId: '',
    organisationName: '',
    location: '',
    mobileNumber: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const token = localStorage.getItem("token");
        await axios.post('http://localhost:4000/organisation/add', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      toast.success("Organization added successfully");
      navigate('/admin');
    } catch (error) {
      toast.error("Failed to add organization");
      console.error('Error adding organization:', error);
    }
  };

  return (
    <div className="add-organization-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Add Organization</h2>
        </div>
        <form onSubmit={handleSubmit} className="add-form">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="form-group">
              <label htmlFor={key} className="form-label">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              <input
                type={key === 'email' ? 'email' : key === 'password' ? 'password' : key === 'mobileNumber' || key === 'organisationId' ? 'tel' : 'text'}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          ))}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin')}
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
              Add Organization
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrganizationComponent;