
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from './ApiService';
import './EndRun.css'; 
import Trkac from "../assets/trkac.jpg";
import { Button } from './Button';  

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
    <div className="outer-container"  style={{ backgroundImage: `url(${Trkac})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="container">
        <div className="content-container">
          <h1 style={{ marginRight: '150px', color: 'white' }}>Završi trku</h1>
          <form>
            <label style={{ color: 'white' }}>
              Ukupno vreme:
              <input
                type="text"
                value={ukupnoVreme}
                onChange={(e) => setUkupnoVreme(e.target.value)}
              />
            </label>
            <br />
            <label style={{ color: 'white' }}>
              Predjeni kilometri:
              <input
                type="text"
                value={predjeniKm}
                onChange={(e) => setPredjeniKm(e.target.value)}
              />
            </label>
            <br />
            <Button
              type="button"
              onClick={handlePotvrdi}
              buttonStyle="btn--outline"
              buttonSize="btn--small"
              style={{ marginLeft: '150px' }}
            >
              Potvrdi
            </Button>
          </form>
        </div>
      </div>
      <div className="background-behind-container"></div>
    </div>
  );
  }  

export default EndRun;
