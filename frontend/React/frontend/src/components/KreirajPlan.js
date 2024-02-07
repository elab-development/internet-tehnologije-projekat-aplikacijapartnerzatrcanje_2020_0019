import React from 'react';
import RunForm from './RunForm';
import './KreirajPlan.css';
import { apiService } from './ApiService';

const KreirajPlan = () => {
  const handleRunFormSubmit = async (formData) => {
    try {
      const response = await apiService.createRunningPlan(formData);
      console.log('Response from server:', response);
    } catch (error) {
      console.error('Error submitting run form:', error);
    }
  };

  return (
    <div className="container-kreiraj-plan">
    <h1 className="title-kreiraj-plan">Kreiraj plan</h1>
    <div className="run-form-container-kreiraj-plan">
      <RunForm onSubmit={handleRunFormSubmit} />
    </div>
    <div className="background-behind-container"></div>
  </div>
  );
};

export default KreirajPlan;

