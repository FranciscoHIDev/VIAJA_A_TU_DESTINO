import React from "react";
import "./CardHotel.css";
import { FaSuitcase, FaGift } from "react-icons/fa";
import { MdFavoriteBorder, MdLocationOn, MdPeople } from "react-icons/md";
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
      <div className="item-promotion">
        <p>{discount}</p>
        <p className="icon-border">
          <FaGift className="icon" />
        </p>
      </div>

      <div>
        <h1 className="title">{name}</h1>
        <div className="items-availability">
          <p className="availability">
            Desde <span className="item-date">{from}</span>
          </p>
          <p className="availability">
            Hasta <span className="item-date">{to}</span>
          </p>
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
          <p className="price-prev">${previousPrice}</p>
          <p className="colorprice"> ${price} </p>
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
