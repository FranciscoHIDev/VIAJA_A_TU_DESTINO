import React from "react";
import "./CardOffers.css";
import { FaSuitcase } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
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
}) {
  return (
    <div className="conteiner">
      <div>
        <RiShareForwardLine className="share" />
        <MdFavoriteBorder className="favorite" />
        <img className="img" src={image} alt="image" />
        <p className="buttonromotion">{promotion}</p>
      </div>
      <div className="items-category">
        <FaSuitcase className="icon" />
        <p className="category">{category}</p>
      </div>
      <div>
        <h1 className="title">{title}</h1>
        <p className="summary">{summary}</p>
        <p className="availability">
          Disponibilidad: <span className="item-date">{availability}</span>
        </p>
        <p>{departure}</p>
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
