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
    <div className="conteiner-hotel">
      <div>
        <RiShareForwardLine className="share" />
        <MdFavoriteBorder className="favorite" />
      </div>
      <img className="img-hotel" src={image} alt="image" />
      {discount ? (
        <div className="item-promotion-hotel">
          <p className="discount-hotel">{discount}</p>
          <p className="icon-border-hotel">
            <FaHotel className="icon-hotel-promo" />
          </p>
        </div>
      ) : null}

      <div>
        <h1 className="title-hotel">{name}</h1>
        <div className="items-availability-hotel">
          <div className="item-hotel">
            {" "}
            <MdLocalHotel className="icon-hotel" />
          </div>
          <div className="data-availability-hotel">
            <p className="availability-hotel">
              Desde <span className="item-date-hotel">{from}</span>
            </p>
            <p className="availability-hotel">
              Hasta <span className="item-date-hotel">{to}</span>
            </p>
          </div>
        </div>
        <div className="item-persons-hotel">
          <MdPeople className="persons-hotel" />
          <p>{persons} personas</p>
        </div>
        <div className="items-destination-hotel">
          <MdLocationOn className="icon-location-hotel" />
          <p className="destination-hotel">{destination.name}</p>
        </div>
      </div>
      <div className="items-price-hotel">
        <div className="price-data-hotel">
          <p className="price-hotel">Desde </p>
          {previousPrice ? (
            <p className="price-prev-hotel">${previousPrice}</p>
          ) : (
            <br></br>
          )}

          <p className="colorprice-hotel"> ${price}</p>
          <p className="text-taxes-hotel">Impuestos incluidos</p>
        </div>
        <div className="button-buy-hotel">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <button>Reservar</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardHotels;
