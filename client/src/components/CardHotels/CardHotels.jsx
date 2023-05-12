import React from "react";
import "./CardHotel.css";
import { FaSuitcase } from "react-icons/fa";
import { MdFavoriteBorder, MdLocationOn } from "react-icons/md";
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
        <img className="img" src={image} alt="image" />
        <p className="buttonromotion">{ discount}</p>
      </div>
      <div className="items-category">
        <img className="img-category" src={image} alt={image} />
        {/* <p className="category">{category.name}</p> */}
      </div>
      <div>
        {/* <h1 className="title">{title}</h1>
        <p className="summary">{summary}</p>
        <p className="availability">
          Disponibilidad: <span className="item-date">{availability}</span>
        </p>
        <p>{departure}</p> */}
        <div className="items-destination">
          <MdLocationOn className="icon-location" />
          <p className="destination">{destination}</p>
          {/* <p>
        Creado por {author} el {date}
      </p> */}
        </div>
      </div>
      <div className="button">
        <p className="price">
          Desde
          <span className="colorprice"> ${price} </span>
        </p>

        <button>Reservar</button>
      </div>
    </div>
  );
}

export default CardHotels;
