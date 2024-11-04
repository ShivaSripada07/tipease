import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const UnauthorizedError = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-16 h-16 text-[#05aa6d]" />
        </div>
        <h1 className="text-3xl font-bold text-[#05aa6d] mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">
          Oops! It seems you don't have permission to access this page. Please log in to continue.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-[#05aa6d] hover:bg-[#048f5b] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Log In
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-[#05aa6d] font-medium py-3 px-6 rounded-lg border border-gray-200 hover:border-[#05aa6d] transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedError;