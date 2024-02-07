import React, { useEffect, useState } from 'react';
import { apiService } from './ApiService';
import Swal from 'sweetalert2';
import './PlanRun.css';
import { useNavigate } from "react-router-dom";
import { Button } from './Button';

const PlanRun = () => {
  const navigate = useNavigate();
  const [planoviTrka, setPlanoviTrka] = useState([]);
  const [komentari, setKomentari] = useState({});
  const [noviKomentari, setNoviKomentari] = useState({});
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const userRole = apiService.getLoginInfo().role;

  useEffect(() => {
    apiService.getPlanoviTrka().then((response) => {
      setPlanoviTrka(response.data.data || []);
    });
  }, []);

  const fetchKomentari = async (planTrkeId) => {
    try {
      setLoadingComments(true);
      const komentariData = await apiService.getKomentari(planTrkeId);
      setKomentari((prev) => ({ ...prev, [planTrkeId]: komentariData }));

      if (komentariData.length > 0) {
        const htmlString = komentariData.map((komentar) => `<p>${komentar.Tekst}</p>`).join('');

        console.log('Tekst komentara:', htmlString);
        console.log('Komentari data:', komentariData);

        Swal.fire({
          title: 'Komentari',
          html: htmlString,
          icon: 'info',
          showConfirmButton: false,
          customClass: {
            content: 'left-align',
          },
        });
      } else {
        Swal.fire({
          title: 'Nema komentara',
          text: 'Nema komentara za ovaj plan trke.',
          icon: 'info',
        });
      }
    } catch (error) {
      console.error('Greška pri dohvatanju komentara:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleKomentarSubmit = async (planTrkeId) => {
    try {
      const loggedInTrkacId = apiService.getLoginInfo().id;
      const komentarData = {
        tekst: noviKomentari[planTrkeId] || '',
        plan_trke_id: planTrkeId,
        trkac_id: loggedInTrkacId,
      };

      await apiService.addKomentar(komentarData);
      setNoviKomentari({ ...noviKomentari, [planTrkeId]: '' });
      fetchKomentari(planTrkeId);
    } catch (error) {
      console.error('Greška pri dodavanju komentara:', error);
    }
  };

  const handlePrikaziKomentare = async (planTrkeId) => {
    try {
      setLoadingComments(true);
      setSelectedPlanId(planTrkeId);
      await fetchKomentari(planTrkeId);

      if (userRole === "user") {
        navigate(`/komentari/${planTrkeId}`);
      }
    } finally {
      setLoadingComments(false);
    }
  };

  const handleZavrsiTrku = (planId) => {
    navigate(`/zavrsi-trku/${planId}`);
  };

  return (
    <div className="comments-run-container" style={{ textAlign: 'center' }}>
      <h1>Svi planovi trka</h1>
      <table className="comments-table" style={{ margin: 'auto', marginBottom: "100px" }}>
        <thead>
          <tr>
            <th style={{ color: 'white' }}>Vreme</th>
            <th style={{ color: 'white' }}>Mesto</th>
            <th style={{ color: 'white', width: "400px" }}>Datum</th>
            <th style={{ color: 'white' }}>Planirani kilometri</th>
            <th style={{ color: 'white', width: "400px" }}>Komentari</th>
            <th style={{ color: 'white' }}>Akcije</th>

          </tr>
        </thead>
        <tbody>
          {planoviTrka.map((plan) => (
            <tr key={plan.id}>
              <td style={{ color: 'white' }}>{plan.vreme}</td>
              <td style={{ color: 'white' }}>{plan.mesto}</td>
              <td style={{ color: 'white' }}>{plan.datum}</td>
              <td style={{ color: 'white' }}>{plan.planirani_km}</td>

              <td>
                <div>
                  {userRole === "user" && (
                    <Button
                      type="button"
                      onClick={() => handlePrikaziKomentare(plan.id)}
                      buttonStyle="btn--outline"
                      buttonSize="btn--medium"
                    >
                      Prikaži komentare
                    </Button>

                  )}
                  {userRole === "trkac" && (
                    <>
                      <input
                        type="text"
                        placeholder="Unesite komentar"
                        value={noviKomentari[plan.id] || ''}
                        onChange={(e) => setNoviKomentari({ ...noviKomentari, [plan.id]: e.target.value })}
                        style={{ width: '130px' }}
                      />
                      <Button
                        type="button"
                        onClick={() => handleKomentarSubmit(plan.id)}
                        buttonStyle="btn--outline"
                        buttonSize="btn--medium"
                      >
                        Dodaj komentar
                      </Button>
                      <Button
                        type="button"
                        onClick={() => handlePrikaziKomentare(plan.id)}
                        buttonStyle="btn--outline"
                        buttonSize="btn--medium"
                        style={{ marginTop: '20px' }}
                      >
                        Prikaži komentare
                      </Button>
                    </>
                  )}
                </div>
              </td>
              <td>
                <button onClick={() => handleZavrsiTrku(plan.id)}
                  style={{
                    backgroundColor: '#ba714c',
                    color: '#ffffff',
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '10px',
                    width: "120px",
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#302e2d'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ba714c'}
                >Završi trku</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="background-behind-container"></div>
    </div>
  );
};

export default PlanRun;