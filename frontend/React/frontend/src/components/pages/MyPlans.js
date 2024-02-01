import React, { useState, useEffect } from "react";
import MyPlan from "../MyPlan";
import "../MyPlans.css";
import { Button } from "../Button";
import Calendar from "../Calendar";

function MyPlans({ data, deleteAPlan, isDarkMode }) {
  const headingStyle = {
    color: "#fff",
    marginTop: "-50px",
  };

  const [calendarPlans, setCalendarPlans] = useState([]);

  useEffect(() => {
    const updatedCalendarPlans = data.map((item) => ({
      date: new Date(item.date), 
      isScheduled: true,
    }));

    setCalendarPlans(updatedCalendarPlans);
  }, [data]);

  const addToCalendar = (plan) => {
    console.log("Dodato u kalendar:", plan.date);

    const updatedCalendarPlans = calendarPlans.map((calendarPlan) => ({
      ...calendarPlan,
      isSelected: calendarPlan.date.getDate() === plan.date.getDate(),
    }));

    setCalendarPlans(updatedCalendarPlans);
  };

  return (
    <div className={`cards-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {data.length === 0 ? (
        <div className="cards1">
          <h1 style={headingStyle}>Trenutno nemate nijedan plan za trku!</h1>
          <p className="app-text">Pronadji jedan već sad!</p>
          <div className="main-btns">
            <Button
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              onClick={() => {
                window.location.href = "/pronadji-prijatelja";
              }}
            >
              PRONAĐI PARTNERA ZA TRČANJE!
            </Button>
          </div>
        </div>
      ) : (
        <div className="cards2">
          <h2>TVOJI DOGOVORENI PLANOVI TRKA:</h2>
          <div className="cards__container">
            <div className="cards__wrapper">
              <ul className="cards__items1">
                {data.map((item) => (
                  <MyPlan
                    key={item.id}
                    obj={item}
                    deleteAPlan={deleteAPlan}
                    addToCalendar={() => addToCalendar(item)}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="calendar-container">
        <h2>Zakazane trke</h2>
        <Calendar calendarPlans={calendarPlans} onDateClick={addToCalendar} />
      </div>
    </div>
  );
}

export default MyPlans;
