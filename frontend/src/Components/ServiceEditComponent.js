import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/ServiceEditComponent.css'

const ServiceEditComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobileNumber: '',
    serviceId: '',
    imageUrl: '',
    bankDetails: '',
    role: '',
    organisationId: ''
  });

  useEffect(() => {
    if (location.state && location.state.data) {
      const { _id, ...rest } = location.state.data;
      setFormData(rest);
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { password, organisationId, serviceId, ...dataToSubmit } = formData;
      const payload = {
        ...dataToSubmit,
        serviceId: formData.serviceId 
      };
      const token = localStorage.getItem("token");
      await axios.patch('http://localhost:4000/serviceProvider/edit', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      toast.success("Service provider updated successfully");
      navigate('/admin');
      
    } catch (error) {
      toast.error("Failed to update service provider details");
      navigate(location.state.reloc);
    }
  };
  

  const isFieldDisabled = (field) => ['password', 'organisationId', 'serviceId','role'].includes(field);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="bg-[#1d2a35] py-6 px-8">
          <h2 className="text-3xl font-extrabold text-white text-center">Edit Service Provider</h2>
        </div>
        <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </label>
                {isFieldDisabled(key) ? (
                  <div className="relative">
                    <input
                      type={key === 'password' ? 'password' : 'text'}
                      id={key}
                      name={key}
                      value={key === 'password' ? '********' : value}
                      readOnly
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                    <Lock className="absolute right-3 top-2 h-5 w-5 text-gray-400" />
                  </div>
                ) : (
                  <input
                    type={key === 'email' ? 'email' : key === 'mobileNumber' ? 'tel' : 'text'}
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#05aa6d] focus:border-[#05aa6d] transition duration-150 ease-in-out sm:text-sm"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(location.state.reloc)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#05aa6d] hover:bg-[#048f5b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#05aa6d] transition duration-150 ease-in-out transform hover:scale-105"
            >
              <Save className="h-5 w-5 mr-2" />
              Update Service Provider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceEditComponent;