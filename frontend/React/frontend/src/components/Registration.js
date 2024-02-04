import React, { useState } from 'react';
import { apiService } from './ApiService';  

const Registration = () => {
  const [formData, setFormData] = useState({
    ime: '',
    prezime: '',
    datum_rodjenja: '',
    pol: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      const response = await apiService.register(formData);
      
      apiService.setToken(response.data.access_token);
      console.log(response.data);

      apiService.setLoginInfo(response.data.role, formData.email);
    } catch (error) {

      console.error('Greška prilikom registracije:', error);
    }
  };

  return (
    <div className="registration-container"> 
      <input type="text" name="ime" placeholder="Ime" onChange={handleInputChange} />
      <input type="text" name="prezime" placeholder="Prezime" onChange={handleInputChange} />
      <input type="date" name="datum_rodjenja" placeholder="Datum rođenja" onChange={handleInputChange} />
      <input type="text" name="pol" placeholder="Pol" onChange={handleInputChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
      <button className="registration-button" onClick={handleRegistration}>Register</button> 
    </div>
  );
};

export default Registration;
