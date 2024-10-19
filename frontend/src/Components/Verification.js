/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const backendotp = useRef(null); 
  const receiveData = location.state?.data;

  useEffect(() => {
    if (receiveData?.email) {
      axios
        .post('http://localhost:4000/otp', { email: receiveData.email })
        .then((response) => {
          backendotp.current = response.data.otp; 
        })
        .catch((error) => {
          console.error('Error sending OTP:', error);
          toast.error('Failed to send OTP. Please try again.');
          navigate('/');
        });
    } else {
      toast.error('No email provided for verification.');
      navigate('/');
    }
  }, []); 

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault(); 
    if (!backendotp.current) {
      toast.error('OTP has not been received yet.');
      return;
    }
    if (Number(backendotp.current) === Number(code)) {
      const msg = "from verification";
      try {
        if (receiveData.role === "user") {
          await axios.post('http://localhost:4000/user/addUser', {
            email: receiveData.email,
            password: receiveData.password,
            mobileNumber: receiveData.mobileNumber,
            imageUrl: receiveData.imageurl, 
            role: "user",
            username: receiveData.name
          });
        } else if (receiveData.role === "organisation") {
          await axios.post('http://localhost:4000/organisation/add', {
            email: receiveData.email,
            password: receiveData.password,
            mobileNumber: receiveData.mobileNumber,
            imageUrl: receiveData.imageurl, 
            role: "organisation",
            organisationName: receiveData.name,
            organisationId: receiveData.id,
            location: receiveData.location
          });
        } else {
          await axios.post('http://localhost:4000/serviceProvider/add', {
            email: receiveData.email,
            password: receiveData.password,
            mobileNumber: receiveData.mobileNumber,
            imageUrl: receiveData.imageurl, 
            role: "serviceProvider",
            name: receiveData.name,
            bankDetails: receiveData.bankDetails
          });
        }
        navigate('/login', { state: { data: msg } });
      } catch (error) {
        console.error('Error during verification process:', error);
        toast.error('An error occurred during verification. Please try again.');
      }
    } else {
      toast.error('Verification unsuccessful. Incorrect code.');
      navigate('/');
    }
  };
  return (
    <div className="min-h-screen bg-tipease-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-tipease-primary">
            TipEase
          </h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            A verification code has been sent to your email address<br />
            <span className="mt-6 font-medium text-center text-base font-bold text-gray-900">
              {receiveData?.email}
            </span>
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleVerify}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="code" className="sr-only">
                Enter Code
              </label>
              <input
                onChange={handleChange}
                id="code"
                name="code"
                value={code}
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
                           placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary 
                           focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Enter Code"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent 
                         text-sm font-medium rounded-md text-white bg-tipease-primary 
                         hover:bg-tipease-primary-dark focus:outline-none focus:ring-2 
                         focus:ring-offset-2 focus:ring-tipease-primary transition-all 
                         duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
