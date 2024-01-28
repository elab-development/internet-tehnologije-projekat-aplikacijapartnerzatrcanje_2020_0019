import React from 'react';
import RunForm from '../RunForm';

const RunTracking = () => {
  const handleRunSubmit = (runData) => {
    console.log('Submitted Run Data:', runData);
  };

  return (
    <div>
      <h1>Unesite parametre za trku!</h1>
      <RunForm onSubmit={handleRunSubmit} />
    </div>
  );
};


export default RunTracking;