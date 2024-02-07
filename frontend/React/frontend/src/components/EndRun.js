
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from './ApiService';
import './EndRun.css'; 

const EndRun = () => {
  const { planId } = useParams();
  const [ukupnoVreme, setUkupnoVreme] = useState('');
  const [predjeniKm, setPredjeniKm] = useState('');
  const [loggedInTrkacId, setLoggedInTrkacId] = useState(null);

  useEffect(() => {
    const loggedInTrkacInfo = apiService.getLoginInfo();
    setLoggedInTrkacId(loggedInTrkacInfo.id);
  }, []);

  const handlePotvrdi = async () => {
    try {
      await apiService.createRunningStatistics({
        ukupno_vreme: ukupnoVreme,
        predjeni_km: predjeniKm,
        plan_trke_id: planId,
        trkac_id: loggedInTrkacId,
      });
    } catch (error) {
      console.error('Greška pri završetku trke:', error);
    }
  };

  return (
    <div className="container">
      <h1>Završi trku</h1>
      <form>
        <label>
          Ukupno vreme:
          <input
            type="text"
            value={ukupnoVreme}
            onChange={(e) => setUkupnoVreme(e.target.value)}
          />
        </label>
        <br />
        <label>
          Predjeni kilometri:
          <input
            type="text"
            value={predjeniKm}
            onChange={(e) => setPredjeniKm(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handlePotvrdi}>
          Potvrdi
        </button>
      </form>
    </div>
  );
};

export default EndRun;
