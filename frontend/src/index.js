import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" exact element={<HomeComponent />} />
      <Route path="/work" element={<Work/>} />
      <Route path="/forwhat" element={<What/>} />
      <Route path="/why" element={<Why/>}/>
      <Route path="/resource" element={<Resource/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path = '/verify' element = {<Verification/>}/>
    </Routes>
    <ToastContainer />
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
