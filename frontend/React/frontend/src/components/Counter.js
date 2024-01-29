import React, { useState, useEffect } from 'react';

const PoslovanjeCounter = () => {
  const [godinePoslovanja, setGodinePoslovanja] = useState(0);
  const [zadovoljniKorisnici, setZadovoljniKorisnici] = useState(0);
  const [brojGradova, setBrojGradova] = useState(0);

  useEffect(() => {
    const startCounter = () => {
      let startTimestamp = Date.now();

      const updateCounterValues = () => {
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - startTimestamp) / 1000;

        // Prilagodite faktore za brži rast
        setGodinePoslovanja(Math.floor(elapsedSeconds * 2)); // Uvećava se za 2 svake sekunde
        setZadovoljniKorisnici(Math.floor(elapsedSeconds * 3000)); // Uvećava se za 3000 svake sekunde
        setBrojGradova(Math.floor(elapsedSeconds * 6)); // Uvećava se za 6 svake sekunde
      };

      const intervalId = setInterval(updateCounterValues, 100); // Ažuriranje vrednosti svakih 100ms (prilagodite prema potrebi)

      const stopTimeoutId = setTimeout(() => {
        clearInterval(intervalId);
        // Postavljanje tačnih vrednosti na kraju
        setGodinePoslovanja(10);
        setZadovoljniKorisnici(15000);
        setBrojGradova(30);
      }, 5000); // Zaustavljanje intervala nakon 5 sekundi

      // Cleanup funkcija za brisanje intervala kada komponenta unmount-uje ili kada se pokrene cleanup
      return () => {
        clearInterval(intervalId);
        clearTimeout(stopTimeoutId);
      };
    };

    startCounter();
  }, []);

  return (
    <div>
      <h2>Uspešno poslovanje</h2>
      <p>{godinePoslovanja} godina uspešnog poslovanja</p>
      <p>{zadovoljniKorisnici} zadovoljnih korisnika</p>
      <p>Prisutni u {brojGradova} gradova</p>
    </div>
  );
};

export default PoslovanjeCounter;