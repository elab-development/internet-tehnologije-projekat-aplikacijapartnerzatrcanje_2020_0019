import React from "react";
import MyPlan from "../MyPlan";
import "../MyPlans.css";
import { Button } from "../Button";

function MyPlans({ data, deleteAPlan }) {
  const headingStyle = {
    color: "#fff",
    "margin-top": "-50px",
  };

  return (
    <div>
      {data.length === 0 ? (
        <>
          <div className="cards1">
            <h1 style={headingStyle}>Trenutno nemate nijedan plan za trku!</h1>
            <p className="app-text">Pronadji jedan već sad!</p>
            <div className="main-btns">
              <Button
                buttonStyle="btn--outline"
                buttonSize="btn--large"
                onClick={() => {
                  window.location.href = "/pronadji-prijatelja";
                }}>
                PRONAĐI PARTNERA ZA TRCANJE!
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="cards2">
            <h1>Tvoji dogovoreni planovi trka!</h1>
            <div className="cards__container">
              <div className="cards__wrapper">
                <ul className="cards__items1">
                  {data.map((item) => (
                    <MyPlan
                      obj={item}
                      deleteAPlan={deleteAPlan}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MyPlans;
