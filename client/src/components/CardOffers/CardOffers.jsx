import React from "react";
import "./CardOffers.css";
import { FaSuitcase } from "react-icons/fa";
import { MdFavoriteBorder, MdLocationOn } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

function CardOffers({
  title,
  summary,
  promotion,
  category,
  image,
  price,
  destination,
  availability,
  hotel,
  departure,
  author,
  date,
}) {
  return (
    <div className="conteiner-offer">
      <div>
        <RiShareForwardLine className="share" />
        <MdFavoriteBorder className="favorite" />
        <img className="img" src={image} alt="image" />
        <p className="buttonromotion">{promotion}</p>
      </div>
      <div className="items-category">
        <img
          className="img-category"
          src={category.image}
          alt={category.name}
        />
        <p className="category">{category.name}</p>
      </div>
      <div>
        <div>
          <h1 className="title">{title}</h1>
          <p className="summary">{summary}</p>
          <p className="availability">
            Disponibilidad: <span className="item-date">{availability}</span>
          </p>
          {departure ? <p>Saliendo{departure}</p> : null}
        </div>

        <div className="items-destination">
          <MdLocationOn className="icon-location" />
          <p className="destination">{destination}</p>
        </div>
      </div>
      <div className="button">
        <p className="price">
          Desde
          <span className="colorprice"> ${price} </span>
        </p>
        <button>Ver oferta</button>
      </div>
    </div>
  );
}

export default CardOffers;
