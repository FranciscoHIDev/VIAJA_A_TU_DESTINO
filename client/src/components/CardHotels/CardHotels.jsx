import React from "react";
import "./CardHotel.css";
import { FaHotel } from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdLocationOn,
  MdPeople,
  MdLocalHotel,
} from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

function CardHotels({
  name,
  image,
  persons,
  discount,
  price,
  previousPrice,
  destination,
  from,
  to,
  link,
}) {
  return (
    <div className="conteiner">
      <div>
        <RiShareForwardLine className="share" />
        <MdFavoriteBorder className="favorite" />
      </div>
      <img className="img" src={image} alt="image" />
      {discount ? (
        <div className="item-promotion">
          <p>{discount}</p>
          <p className="icon-border">
            <FaHotel className="icon" />
          </p>
        </div>
      ) : null}

      <div>
        <h1 className="title">{name}</h1>
        <div className="items-availability">
          <div className="item-hotel">
            {" "}
            <MdLocalHotel className="icon-hotel" />
          </div>
          <div className="data-availability">
            <p className="availability">
              Desde <span className="item-date">{from}</span>
            </p>
            <p className="availability">
              Hasta <span className="item-date">{to}</span>
            </p>
          </div>
        </div>
        <div className="item-persons">
          <MdPeople className="persons" />
          <p>{persons} personas</p>
        </div>
        <div className="items-destination">
          <MdLocationOn className="icon-location" />
          <p className="destination">{destination.name}</p>
        </div>
      </div>
      <div className="items-price">
        <div className="price-data">
          <p className="price">Desde </p>
          {previousPrice ? (
            <p className="price-prev">${previousPrice}</p>
          ) : (
            <br></br>
          )}

          <p className="colorprice"> ${price}</p>
          <p className="text-taxes">Impuestos incluidos</p>
        </div>
        <div className="button-buy">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button>Reservar</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardHotels;
