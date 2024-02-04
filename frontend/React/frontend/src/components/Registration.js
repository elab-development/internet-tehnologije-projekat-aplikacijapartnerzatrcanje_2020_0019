import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'; 

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      console.log(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="registration-container"> 
      <input type="text" name="name" placeholder="Full Name" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button className="registration-button" onClick={handleRegistration}>Register</button> 
    </div>
  );
};

export default Registration;
