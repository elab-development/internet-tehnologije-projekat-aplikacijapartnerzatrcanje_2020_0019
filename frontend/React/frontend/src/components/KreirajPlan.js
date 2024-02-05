import React from 'react';
import RunForm from './RunForm';
import './KreirajPlan.css';
import { apiService } from './ApiService';

const KreirajPlan = () => {
  const handleRunFormSubmit = async (formData) => {
    try {
      // Ovde možete dodati logiku za obradu odgovora ili redirekciju
      const response = await apiService.createRunningPlan(formData);
      console.log('Response from server:', response);
    } catch (error) {
      console.error('Error submitting run form:', error);
      // Ovde možete dodati logiku za prikazivanje poruke o grešci korisniku
    }
  };

  return (
    <div>
      <h1>Kreiraj plan</h1>
      <RunForm onSubmit={handleRunFormSubmit} />
    </div>
  );
};

export default KreirajPlan;

