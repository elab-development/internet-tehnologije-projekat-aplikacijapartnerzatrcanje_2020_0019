import React from 'react';
import './Calendar.css';

const Calendar = ({ calendarPlans, onDateClick }) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const currentDate = new Date().getDate();
  
    const generateCalendarDays = (calendarPlans) => {
      const days = [];
  
      for (let i = 1; i <= daysInMonth; i++) {
        const planForDay = calendarPlans.find(
          (plan) => plan.date.getDate() === i
        );
  
        const isPlanScheduled = planForDay && planForDay.isScheduled;
        const isSelected = planForDay && planForDay.isSelected;
  
        const isCurrentDate = i === currentDate;
  
        days.push(
          <div
            key={i}
            className={`day ${isPlanScheduled ? 'scheduled' : ''} ${isSelected ? 'selected' : ''} ${isCurrentDate ? 'current-date' : ''}`}
            onClick={() => onDateClick(i)}
          >
            {i}
          </div>
        );
      }
  
      return days;
    };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="weekdays">
          <span>Ned</span>
          <span>Pon</span>
          <span>Uto</span>
          <span>Sre</span>
          <span>Čet</span>
          <span>Pe</span>
          <span>Sub</span>
        </div>
        <div className="days">{generateCalendarDays(calendarPlans)}</div>
      </div>
    </div>
  );
};

export default Calendar;


  