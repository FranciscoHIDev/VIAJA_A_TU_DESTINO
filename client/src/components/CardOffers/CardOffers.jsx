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
  buyLinks,
}) {
  return (
    <div className="conteiner-offer">
      <div>
        <RiShareForwardLine className="share" />
        <MdFavoriteBorder className="favorite" />
        <img className="img-offer" src={image} alt="image" />
        <p className="buttonromotion-offer">{promotion}</p>
      </div>
      <div className="items-category-offer">
        <img
          className="img-category-offer"
          src={category.image}
          alt={category.name}
        />
        <p className="category-offer">{category.name}</p>
      </div>
      <div>
        <div>
          <h1 className="title-offer">{title}</h1>
          <p className="summary-offer">{summary}</p>
          <p className="availability-offer">
            Disponibilidad:{" "}
            <span className="item-date-offer">{availability}</span>
          </p>

          <p className="departure-offer">
            Saliendo: <span className="item-departure-offer">{departure}</span>
          </p>
        </div>

        <div className="items-destination-offer">
          <MdLocationOn className="icon-location-offer" />
          <p className="destination-offer">{destination}</p>
        </div>
      </div>
      <div className="button-offer">
        <p className="price-offer">
          Desde
          <span className="colorprice-offer"> ${price} </span>
        </p>
        <a href={buyLinks} target="_blank" rel="noopener noreferrer">
          <button>Ver oferta</button>
        </a>
      </div>
    </div>
  );
}

export default CardOffers;
