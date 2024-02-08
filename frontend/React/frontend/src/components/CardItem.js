import React from "react";

function CardItem({
  name,
  src,
  type,
  text,
}) {
  return (
    <li className="cards__item">
      <div className="cards__item__link">
        <figure
          className="cards__item__pic-wrap"
          data-category={type === "clients" ? "“" : name}
        >
          <img
            className="cards__item__img"
            src={src}
            alt={`Slika za ${name}`}
          />
        </figure>
        <div className="cards__item__info">
          <p className="cards__item__text">{text}</p>
          {type === "clients" ? (
            <h5 className="cards__item__title">{name}</h5>
          ) : (
            <></>
          )}
        </div>
      </div>
    </li>
  );
}

export default CardItem;
