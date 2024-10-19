import React, { useState , useEffect } from 'react';
import { User } from 'lucide-react';
import '../styles/Login.css';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const recData = location.state?.data;
  useEffect(() => {
      toast.success("Verification successful");
  }, [recData]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios.post('http://localhost:4000/login', {
      email: formData.email,
      password: formData.password
    })
    .then(response => {
      if (response && response.data) {
        console.log(response.data);
        const { token, name, email, role } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        
        const roleActions = {
            user: () => {
                //console.log("Logged in as user");
                navigate("/userDashboard");
                toast.success(`Welcome, ${name}`);
            },
            admin: () => {
                //console.log("Logged in as admin");
                navigate("/adminDashboard");
                toast.success(`Welcome, ${name}`);
            },
            organisation: () => {
                //console.log("Logged in as organisation");
                navigate("/organisationDashboard");
                toast.success(`Welcome, ${name}`);
            },
            serviceProvider: () => {
              //console.log("Logged in as service provider");
              navigate("/serviceproviderDashboard");
              toast.success(`Welcome, ${name}`);
            },
            default: () => {
                console.log("Unknown role");
                toast.error("Unknown role. Please contact support.");
                navigate("/");
            }
        };  
        (roleActions[role] || roleActions.default)();
      }
    })
    .catch(err => {
      toast.error('Login failed! Please check your credentials.');
    });
  };
  
  return (
    <div className="min-h-screen bg-tipease-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-tipease-primary">
            TipEase
          </h1>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-tipease-primary focus:border-tipease-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tipease-primary hover:bg-tipease-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tipease-primary transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <User className="h-5 w-5 text-tipease-primary-dark group-hover:text-tipease-primary" aria-hidden="true" />
              </span>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
