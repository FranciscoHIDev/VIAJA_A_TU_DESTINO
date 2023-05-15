import React from "react";
import "./CardPackage.css";
import { FaHotel, FaPlaneDeparture, FaSuitcase } from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdLocationOn,
  MdPeople,
  MdLocalHotel,
} from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";

function CardPackage({
  departure,
  destination,
  image,
  hotel,
  promotion,
  price,
  previousPrice,
  persons,
  from,
  to,
  link,
}) {
  return (
    <div className="conteiner-package">
      <div>
        <div>
          <RiShareForwardLine className="share" />
          <MdFavoriteBorder className="favorite" />
        </div>
        <img className="img-package" src={image} alt="image" />

        {promotion ? (
          <div className="item-promotion-package">
            <p className="discount-package">{promotion}</p>
            <p className="icon-border-package">
              <FaSuitcase className="icon-package-promo" />
            </p>
          </div>
        ) : null}
        <div className="item-hotel-package">
          <p className="hotel-package">{hotel}</p>
          <div className="items-destination-package">
            <MdLocationOn className="icon-location-package" />
            <p className="destination-package">{destination.name}</p>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="item-departure-package">
            <div className="icon-departure-package">
              <FaPlaneDeparture />
              <p className="text-departure-package">Saliendo desde</p>
            </div>

            <p className="departure-package"> {departure}</p>
          </div>

          <div className="items-availability-package">
            <div className="item-package">
              {" "}
              <MdLocalHotel className="icon-package" />
            </div>
            <div className="data-availability-package">
              <p className="availability-package">
                Desde <span className="item-date-package">{from}</span>
              </p>
              <p className="availability-package">
                Hasta <span className="item-date-package">{to}</span>
              </p>
            </div>
          </div>
          <div className="item-persons-package">
            <MdPeople className="persons-package" />
            <p>{persons} personas</p>
          </div>
        </div>
        <div className="items-price-package">
          <div className="price-data-package">
            <p className="price-package">Desde </p>
            {previousPrice ? (
              <p className="price-prev-package">${previousPrice}</p>
            ) : (
              <br></br>
            )}

            <p className="colorprice-package"> ${price}</p>
            <p className="text-taxes-package">Impuestos incluidos</p>
          </div>
          <div className="button-buy-package">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <button>Reservar</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardPackage;
