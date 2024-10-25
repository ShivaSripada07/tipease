import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import "../styles/OrganisationProfile.css"
const OrganisationProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    organisationId: '',
    organisationName: '',
    location: '',
    mobileNumber: '',
    imageUrl: ''
  });
  useEffect(() => {
    fetchOrganisationData();
  }, []);
  const fetchOrganisationData = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.post('http://localhost:4000/organisation/byorg', {id});
      const { _id, ...rest } = response.data[0];
      setFormData(rest); 
    } catch (error) {
      toast.error("Failed to fetch organisation data");
      console.error('Error fetching organisation data:', error);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id"); // Get the id from localStorage
      const updatedFormData = {
        ...formData,
        id 
      };
      await axios.patch('http://localhost:4000/organisation/edit', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Organisation updated successfully");
    } catch (error) {
      toast.error("Failed to update organisation");
      console.error('Error updating organisation:', error);
    }
  };
  return (
    <div className="org-profile-container">
      <div className="org-profile-form-card">
        <div className="org-profile-form-header">
          <h2 className="org-profile-form-title">Organisation Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="org-profile-profile-form">
          <div className="org-profile-image-preview">
            <img src={formData.imageUrl} alt="Organisation" className="org-profile-org-image" />
          </div>
          {Object.entries(formData).map(([key, value]) => (
            key !== 'imageUrl' && (
              <div key={key} className="org-profile-form-group">
                <label htmlFor={key} className="org-profile-form-label">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <input
                  type={key === 'email' ? 'email' : key === 'mobileNumber' || key === 'organisationId' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={key === 'email' || key === 'role' || key === 'organisationId'}
                  className="org-profile-form-input"
                />
              </div>
            )
          ))}
          <div className="org-profile-form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="org-profile-back-btn"
            >
              <ArrowLeft className="org-profile-btn-icon" />
              Back
            </button>
            <button
              type="submit"
              className="org-profile-save-btn"
            >
              <Save className="org-profile-btn-icon" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OrganisationProfile;