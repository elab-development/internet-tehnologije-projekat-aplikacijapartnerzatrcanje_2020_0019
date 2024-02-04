import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'; 

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
      const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
      const responseData = response.data;
  
      // Provera uspešnosti registracije
      if (responseData && responseData.data) {
        console.log('Registracija uspešna:', responseData.data);
        // Dodatne akcije koje želite preduzeti nakon uspešne registracije
      } else {
        console.log('Neuspešna registracija. Server vraća:', responseData);
      }
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
