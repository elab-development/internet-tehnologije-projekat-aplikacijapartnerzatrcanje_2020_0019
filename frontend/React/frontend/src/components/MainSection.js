import React from "react";
import "../App.css";
import "./MainSection.css";


function MainSection() {
  

  return (
    <>
      <div className="main-container">
        <image src="https://cdn-fhgnd.nitrocdn.com/gdRlBjBJEsIflRZaDbcgjDdgJxndYJwu/assets/static/optimized/rev-6bb43f7/wp-content/uploads/2022/11/waltz.jpg" />
        <h1>Pronađi i ti svog idealnog partnera za trčanje</h1>
        <div className="main-btns">
        </div>
      </div>
      <div className="main-text">
        <h1>Čemu je namenjena aplikacija?</h1>
        <h3>Running-Partner aplikacija je tvoj idealan saputnik u trcanju!</h3>
        <p>
        Planiraj svoje trčanje sa preciznim detaljima - vreme, mesto i kilometraža.
        Poveži se sa trkačima širom sveta, deli svoje trčanje i ostavi podršku kroz komentare. 
        Prati svoj napredak na profilu, sa detaljnim informacijama o pređenoj kilometraži i drugim parametrima.
        Uživaj u interaktivnoj mapi koja ti omogućava da vidiš trkače u blizini. 
        </p>
       
        <p>
        Sa Running-Partner, trčanje postaje još uzbudljivije - pridruži se zajednici koja te podržava i motiviše! 🏃‍♂️🌍✨
        </p>
      </div>
      
    </>
  );
}

export default MainSection;