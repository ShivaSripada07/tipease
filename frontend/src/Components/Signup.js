import React, { useState } from 'react';
import { User, Upload } from 'lucide-react';
import '../styles/Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    imageurl:'',
    imageFile: null,
    role: 'user',
    id: '',
    location: '',
    bankDetails: '',
    organisationId:''
  });
  const [previewUrl, setPreviewUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, imageFile: file }));
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'imageFile' && value instanceof File) {
        dataToSend.append('image', value);
      } else if (typeof value === 'string') {
        dataToSend.append(key, value);
      }
    });

    console.log('Form submitted:', dataToSend);
    navigate('/verify', { state: { data: formData } });
  };

  return (
    <div className="min-h-screen bg-tipease-dark flex items-center justify-center py-12 px-6 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-tipease-primary">
            TipEase
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign up for an account
          </h2>
        </div>
        <form className="mt-9 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="mobileNumber" className="sr-only">
                Mobile Number
              </label>
              <input 
                type="tel" 
                id="mobileNumber" 
                name="mobileNumber" 
                required
                placeholder="Mobile Number"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="image-url" className="sr-only">
                Image URL
              </label>
              <input
                id="image-url"
                name="imageurl"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Image URL"
                value={formData.imageurl}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-4">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Profile Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-tipease-primary hover:text-tipease-primary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-tipease-primary"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="imageFile"
                      type="file"
                      className="sr-only"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleInputChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          {previewUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Image Preview</h3>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-tipease-primary">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="role-user"
                name="role"
                type="radio"
                value="user"
                checked={formData.role === 'user'}
                onChange={handleInputChange}
                className="h-4 w-4 text-tipease-primary focus:ring-tipease-primary border-gray-300"
              />
              <label htmlFor="role-user" className="ml-2 block text-sm text-gray-900">
                User
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="role-organisation"
                name="role"
                type="radio"
                value="organisation"
                checked={formData.role === 'organisation'}
                onChange={handleInputChange}
                className="h-4 w-4 text-tipease-primary focus:ring-tipease-primary border-gray-300"
              />
              <label htmlFor="role-organisation" className="ml-2 block text-sm text-gray-900">
                Organisation
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="role-service-provider"
                name="role"
                type="radio"
                value="serviceProvider"
                checked={formData.role === 'serviceProvider'}
                onChange={handleInputChange}
                className="h-4 w-4 text-tipease-primary focus:ring-tipease-primary border-gray-300"
              />
              <label htmlFor="role-service-provider" className="ml-2 block text-sm text-gray-900">
                Service Provider
              </label>
            </div>
          </div>

          {(formData.role === 'organisation' || formData.role === 'serviceProvider') && (
            <div>
              <label htmlFor="id" className="sr-only">
                ID
              </label>
              <input
                id="id"
                name="id"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="ID"
                value={formData.id}
                onChange={handleInputChange}
              />
            </div>
          )}

          {formData.role === 'organisation' && (
            <div>
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>
          )}
                    {formData.role === 'serviceProvider' && (
            <div>
              <label htmlFor="organisation-id" className="sr-only">
                Organisation Id
              </label>
              <input
                id="organisation-id"
                name="organisationid"
                type="tel"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Organisation Id"
                value={formData.organisationId}
                onChange={handleInputChange}
              />
            </div>
          )}

          {formData.role === 'serviceProvider' && (
            <div>
              <label htmlFor="bank-details" className="sr-only">
                Bank Details
              </label>
              <input
                id="bank-details"
                name="bankDetails"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Bank Details"
                value={formData.bankDetails}
                onChange={handleInputChange}
              />
            </div>
          )}
          

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tipease-primary hover:bg-tipease-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tipease-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <User className="h-5 w-5 text-tipease-primary-dark group-hover:text-tipease-primary" aria-hidden="true" />
              </span>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Signup;