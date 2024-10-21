import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import "../styles/UserProfile.css";
import UserNavbar from './UserNavbar';

const UserProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    imageUrl: '',
    role: '',
    username: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
        const token = localStorage.getItem("token");
        const name = localStorage.getItem("name");
        
        const response = await axios.get('http://localhost:4000/user/Name', {
            headers: {
                name: name,
                Authorization: `Bearer ${token}` // Assuming you want to pass the token too
            }
        });
        
        console.log(response.data); // Check if you're logging response.data
        
        // Assuming the response is an array and you want the first item
        if (response.data && response.data.length > 0) {
            const { password, ...rest } = response.data[0]; // If response is an array
            setFormData(rest);
        } else {
            throw new Error('No user found');
        }
    } catch (error) {
        toast.error("Failed to fetch user data");
        console.error('Error fetching user data:', error);
    }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:4000/user/editUser', formData);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
    <UserNavbar/>
    <div className="user-profile-container">
      <div className="user-profile-form-card">
        <div className="user-profile-form-header">
          <h2 className="user-profile-form-title">User Profile</h2>
        </div>
        <form onSubmit={handleSubmit} className="user-profile-form">
          <div className="user-profile-image-preview">
            <img src={formData.imageUrl} alt="User" className="user-profile-image" />
          </div>
          {Object.entries(formData).map(([key, value]) => (
            key !== 'imageUrl' && (
              <div key={key} className="user-profile-form-group">
                <label htmlFor={key} className="user-profile-form-label">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                <input
                  type={key === 'email' ? 'email' : key === 'mobileNumber' ? 'number' : 'text'}
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  disabled={key === 'email' || key === 'role'}
                  className="user-profile-form-input"
                />
              </div>
            )
          ))}
          <div className="user-profile-form-group">
            <label htmlFor="imageUrl" className="user-profile-form-label">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="user-profile-form-input"
            />
          </div>
          <div className="user-profile-form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="user-profile-back-btn"
            >
              <ArrowLeft className="user-profile-btn-icon" />
              Back
            </button>
            <button
              type="submit"
              className="user-profile-save-btn"
            >
              <Save className="user-profile-btn-icon" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    </>

  );
};

export default UserProfile;