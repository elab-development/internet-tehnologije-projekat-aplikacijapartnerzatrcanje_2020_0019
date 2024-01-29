import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards({ data1, data2, title, type, makeAPlan, star1, star2 }) {
  return (
    <div className="cards">
      <h1>{title}</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {data1 &&
              data1.map((item) => (
                <CardItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  name={item.name}
                  src={item.src}
                  checked={item.checked}
                  star={item.star}
                  type={type}
                  makeAPlan={makeAPlan}
                  star1={star1}
                  star2={star2}
                />
              ))}
          </ul>
          {data2 != null ? (
            <ul className="cards__items">
              {data2 &&
                data2.map((item) => (
                  <CardItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    name={item.name}
                    src={item.src}
                    checked={item.checked}
                    star={item.star}
                    type={type}
                    makeAPlan={makeAPlan}
                    star1={star1}
                    star2={star2}
                  />
                ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cards;