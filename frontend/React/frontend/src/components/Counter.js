import React, { useState, useEffect } from 'react';
import chart from '../assets/chart.png';
import kalendar from '../assets/kalendar.png';
import mapa from '../assets/mapa.png';



const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    width: '460px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '600px',
    height: '250px',
    background: '#302e2d',
    borderRadius: '8px',
    margin: '5px',
    color: 'white',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '200px',
    width: '200px',
    marginTop: "20px"
  },
  logo: {
    height: '80px',
    width: '80px',
  },
  text: {
    fontSize: '1.04rem',
    marginTop: '7px',
  },
  textBroj: {
    fontSize: '1.5rem',
    fontWeight: 'bold'

  }
};

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

        setGodinePoslovanja(Math.floor(elapsedSeconds * 2));
        setZadovoljniKorisnici(Math.floor(elapsedSeconds * 3000));
        setBrojGradova(Math.floor(elapsedSeconds * 6));
      };

      const intervalId = setInterval(updateCounterValues, 100);

      const stopTimeoutId = setTimeout(() => {
        clearInterval(intervalId);
        setGodinePoslovanja(10);
        setZadovoljniKorisnici(15000);
        setBrojGradova(30);
      }, 5000);

      return () => {
        clearInterval(intervalId);
        clearTimeout(stopTimeoutId);
      };
    };

    startCounter();
  }, []);

  return (
    <div style={styles.wrapper}>

      <div style={styles.section}>
        <div style={styles.iconContainer}>
          <img src={kalendar} alt="Logo" style={styles.logo} />
        </div>
        <p style={styles.textBroj}>{godinePoslovanja}+ </p>
        <p style={styles.text}>godina poslovanja</p>
      </div>

      <div style={styles.section}>
        <div style={styles.iconContainer}>
          <img src={chart} alt="Logo" style={styles.logo} />
        </div>
        <p style={styles.textBroj}>{zadovoljniKorisnici}+ </p>
        <p style={styles.text}>zadovoljnih korisnika</p>
      </div>

      <div style={styles.section}>
        <div style={styles.iconContainer}>
          <img src={mapa} alt="Logo" style={styles.logo} />
        </div>
        <p style={styles.textBroj}>{brojGradova}+ </p>
        <p style={styles.text}>prisutnih gradova</p>
      </div>
    </div>
  );
};

export default PoslovanjeCounter;