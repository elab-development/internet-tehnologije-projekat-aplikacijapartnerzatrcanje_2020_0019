import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
  
      
      if (response.status === 201) {
        
        localStorage.setItem('authToken', response.data.access_token);
  
       
        console.log('Korisnik uspešno logovan.');
        
        
  
      } else {
       
        console.log('Neuspešno logovanje.');
  
        
      }
  
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="login-container">
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="login-input"
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="login-input"
        onChange={handleInputChange}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
