import React from "react";
import { Button } from "./Button";

function MyPlan({ obj, deleteAPlan }) {
  return (
    <>
      <li className="cards__item">
        <div className="cards__item__link">
          <figure
            className="cards__item__pic-wrap1"
            data-category={"Zakazan termin"}>
            <img className="cards__item__img" src={obj.src} alt="Slika" />
          </figure>
          <div className="cards__item__info">
            <h5 className="cards__item__title1">{obj.name}</h5>
            <p>{obj.date}</p>
            <div className="star-container">
              <ul>
                <li>
                  <Button
                    className="btns"
                    buttonStyle="btn--primary"
                    buttonSize="btn--medium"
                    link={"/moji-planovi"}
                    id={obj.id}
                    onClick={deleteAPlan}>
                    Otkaži plan trke
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default MyPlan;
