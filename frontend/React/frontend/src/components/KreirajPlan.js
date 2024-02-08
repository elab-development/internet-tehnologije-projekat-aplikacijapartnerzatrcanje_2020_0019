import React from 'react';
import RunForm from './RunForm';
import './KreirajPlan.css';
import { apiService } from './ApiService';
import Swal from 'sweetalert2';

const KreirajPlan = () => {
  const handleRunFormSubmit = async (formData) => {

    try {
      const response = await apiService.createRunningPlan(formData);
      console.log('Response from server:', response);

      Swal.fire({
        icon: 'success',
        title: 'Plan trke je uspešno kreiran!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Error submitting run form:', error);
      Swal.fire({
        icon: 'error',
        title: 'Došlo je do greške prilikom kreiranja plana trke.',
      });
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

