import React from "react";
import "./CardOffers.css";
import {
  FaSuitcase,
  FaRegCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";
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
  arrival,
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
          <div className="item-availability-offer">
            <FaRegCalendarAlt className="icons-color" />
            <p className="availability-offer">
              Disponibilidad:{" "}
              <span className="item-date-offer">{availability}</span>
            </p>
          </div>
          {departure ? (
            <div className="item-departure-offer">
              <FaPlaneDeparture className="icons-color" />
              <p className="departure-offer">
                Salida:{" "}
                <span className="location-departure-offer">{departure}</span>
              </p>
            </div>
          ) : null}
        </div>
        {arrival ? (
          <div className="item-arrival-offer">
            <FaPlaneArrival className="icons-color" />
            <p className="arrival-offer">
              Llegada:{" "}
              <span className="location-departure-offer">{arrival}</span>
            </p>
          </div>
        ) : (
          <br></br>
        )}

        {category.name === "Hotel" ? (
          <div className="items-destination-offer">
            <MdLocationOn className="icon-location-offer" />
            <p className="destination-offer">{destination.name}</p>
          </div>
        ) : null}
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
