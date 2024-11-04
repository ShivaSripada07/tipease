import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, matchPath } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomeComponent from './HomeComponent';
import Header from './Components/Header';
import Work from './Components/Work';
import What from './Components/What';
import Why from './Components/Why';
import Resource from './Components/Resource';
import Contact from './Components/Contact';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Verification from './Components/Verification';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './Components/AdminDashboard';
import AdminEditComponent from './Components/AdminEditComponent';
import ServiceEditComponent from './Components/ServiceEditComponent';
import AddOrganizationComponent from './Components/AddOrganisationComponent';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Organisation from './Components/Organisation';
import OrganisationDashboard from './Components/OrganisationDashboard';
import AddServiceProvider from './Components/AddServiceProvider';
import OrganisationProfile from './Components/OrganisationProfile';
import ServiceProvider from './Components/ServiceProvider';
import ServiceProviderDashboard from './Components/serviceProviderDashboard';
import ServiceProviderHelp from './Components/ServiceProviderHelp';
import ServiceProviderProfile from './Components/ServiceProviderProfile';
import UserDashboard from './Components/UserDashboard';
import HowWork from './Components/HowWork';
import UserResource from './Components/UserResource';
import UserProfile from './Components/UserProfile';
import PayTip from './Components/PayTip';
import ServiceProviderQR from './Components/ServiceProviderQR';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const location = useLocation();
  const hideHeaderPaths = ['/service/qr','/paytip/:serviceId','/user/profile','/user/resource','/user/how','/user','/service/profile','/service/help','/service/dashboard','/service','/org/profile','/admin', '/admin/edit', '/admin/addOrg', '/admin/dashboard', '/admin/profile','/org','/org/dashboard','/org/addService'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname) ||
    matchPath('/paytip/:serviceId', location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" exact index element={<HomeComponent />} />
        <Route path="/work" element={<Work />} />
        <Route path="/forwhat" element={<What />} />
        <Route path="/why" element={<Why />} />
        <Route path="/resource" element={<Resource />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<Verification />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/edit" element={<AdminEditComponent />} />
          <Route path="/admin/serviceEdit" element={<ServiceEditComponent />} />
          <Route path="/admin/addOrg" element={<AddOrganizationComponent />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />

          {/* Organization Routes */}
          <Route path="/org" element={<Organisation />} />
          <Route path="/org/dashboard" element={<OrganisationDashboard />} />
          <Route path="/org/addService" element={<AddServiceProvider />} />
          <Route path="/org/profile" element={<OrganisationProfile />} />

          {/* Service Provider Routes */}
          <Route path="/service" element={<ServiceProvider />} />
          <Route path="/service/dashboard" element={<ServiceProviderDashboard />} />
          <Route path="/service/help" element={<ServiceProviderHelp />} />
          <Route path="/service/profile" element={<ServiceProviderProfile />} />
          <Route path="/service/qr" element={<ServiceProviderQR />} />

          {/* User Routes */}
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/how" element={<HowWork />} />
          <Route path="/user/resource" element={<UserResource />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/paytip/:serviceId" element={<PayTip />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();