import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mail, User, Phone, MapPin } from 'lucide-react';
import '../styles/Profile.css';

const Profile = () => {
    const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem("name") || "Admin");
  const [email, setEmail] = useState(localStorage.getItem("email") || "admin@example.com");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [location, setLocation] = useState(localStorage.getItem("location") || "");
  const [profileImage, setProfileImage] = useState(localStorage.getItem("profileImage") || "");

  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("location", location);
    localStorage.setItem("profileImage", profileImage);
  }, [name, email, phone, location, profileImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 style={{color:'white'}}>Admin Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-image-container">
            <div className="profile-image">
              {profileImage ? (
                <img src={profileImage} alt="Profile" />
              ) : (
                <div className="profile-placeholder">
                  <User size={64} />
                </div>
              )}
            </div>
            <label htmlFor="imageUpload" className="image-upload-label">
              <Camera size={24} />
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <div className="profile-details">
            <div className="profile-field">
              <User className="field-icon" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="profile-field">
              <Mail className="field-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
              />
            </div>
            <div className="profile-field">
              <Phone className="field-icon" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your Phone Number"
              />
            </div>
            <div className="profile-field">
              <MapPin className="field-icon" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your Location"
              />
            </div>
          </div>
        </div>
        <div className="profile-actions">
          <button className="save-button" onClick={()=>navigate('/admin')}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;