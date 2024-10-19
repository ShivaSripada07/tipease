/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState , useRef } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Verification() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const backendotp = useRef(null); 
  const receiveData = location.state?.data;

  useEffect(() => {
    axios
      .post('http://localhost:4000/otp', { email: receiveData?.email })
      .then((response) => {
        backendotp.current = response.data.otp; 
      })
      .catch((error) => {
        console.error('Error sending OTP:', error);
      });
  }, []); 
  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = async() => {
    if (backendotp.current) {
      if (Number(backendotp.current) === Number(code)) {
        toast.success('Verification successful');
        const msg = "from verification";
        navigate('/login',{state:{data:msg}});
      } else {
        toast.error('Verification unsuccessful');
        navigate('/');
      }
    }
  };
  return (
    <>
      <div className="min-h-screen bg-tipease-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div>
            <h1 className="text-center text-4xl font-extrabold text-tipease-primary">
              TipEase
            </h1>
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            A verification code has been sent to your email address<br />
            <span className="mt-6 font-medium text-center text-base font-bold text-gray-900">{receiveData?.email}</span>
            </h2>
          </div>
          <form className="mt-8 space-y-6">
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
                  type="code"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                  placeholder="Enter Code"
                />
              </div>
            </div>
            <div>
              <button
              onClick={handleVerify}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tipease-primary hover:bg-tipease-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tipease-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                </span>
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
