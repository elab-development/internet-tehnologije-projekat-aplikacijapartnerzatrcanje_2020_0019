import React, { useEffect, useState } from 'react';
import { apiService } from './ApiService';
import Swal from 'sweetalert2';
import './PlanRun.css';
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Svi planovi trka</h1>
      <table>
        <thead>
          <tr>
            <th>Vreme</th>
            <th>Mesto</th>
            <th>Datum</th>
            <th>Planirani kilometri</th>
            <th>Komentari</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {planoviTrka.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.vreme}</td>
              <td>{plan.mesto}</td>
              <td>{plan.datum}</td>
              <td>{plan.planirani_km}</td>
              <td>
                <div>
                  {userRole === "user" && (
                    <button onClick={() => handlePrikaziKomentare(plan.id)}>Prikaži komentare</button>
                  )}
                  {userRole === "trkac" && (
                    <>
                      <input
                        type="text"
                        placeholder="Unesite komentar"
                        value={noviKomentari[plan.id] || ''}
                        onChange={(e) => setNoviKomentari({ ...noviKomentari, [plan.id]: e.target.value })}
                      />
                      <button onClick={() => handleKomentarSubmit(plan.id)}>Dodaj komentar</button>
                      <button onClick={() => handlePrikaziKomentare(plan.id)}>Prikaži komentare</button>
                      <button onClick={() => handleZavrsiTrku(plan.id)}>Završi trku</button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanRun;