import React from "react";
import {
  FaRegCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMapMarkedAlt,
} from "react-icons/fa";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
function CardTop({
  _id,
  title,
  summary,
  category,
  image,
  price,
  destination,
  availability,
  departure,
  arrival,
}) {
  CardTop.propTypes = {
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    category: PropTypes.string,
    image: PropTypes.string.isRequired,
    price: PropTypes.number,
    destination: PropTypes.string,
    availability: PropTypes.string,
    departure: PropTypes.string,
    arrival: PropTypes.string,
  };
  return (
    <React.Fragment>
      <NavLink to={`/oferta/${_id}`}>
        <div className="bg-white mt-10 h-[520px] md:w-[360px] m-2  w-auto rounded-[16px] border-[1px]">
          <div>
            <img
              className="p-[5px] h-[227px] w-[360px] rounded-[20px]"
              src={image[0]}
              alt="image"
            />
            <button className="bg-black px-2 py-1 rounded-lg text-white font-bold absolute mt-[-200px] ml-4 text-[12px]">
              💳 Hasta 12 MSI
            </button>
          </div>
          <div className="mt-3 ml-4 mr-4">
            <p className=" font-bold text-[18px] text-[#0e1734]">{title}</p>
            <div className="mt-2">
              <p className="text-[#4b5563] text-[14px]">{summary}</p>
            </div>
            {category.name === "Tour" ||
            category.name === "Hotel" ||
            category.name === "Paquete" ? (
              <div className="flex flex-row items-center mt-2">
                <FaMapMarkedAlt className="text-[#4b5563] text-[15px]" />
                <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                  Destino:{" "}
                  <span className="text-[14px] font-[500] text-[#4b5563]">
                    {destination.name.charAt(0).toUpperCase() +
                      destination.name.slice(1).toLowerCase()}
                  </span>
                </p>
              </div>
            ) : null}

            <div className="flex flex-row items-center mt-1">
              <FaRegCalendarAlt className="text-[#4b5563] text-[15px]" />
              <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                Disponibilidad:{" "}
                <span className="text-[14px] font-[500] text-[#4b5563]">
                  {availability}
                </span>
              </p>
            </div>
            <hr className="border-t-1 w-3/8 mt-8" />

            {/* {departure ? (
              <div className="flex flex-row items-center mt-2">
                <FaPlaneDeparture className="text-[#4b5563] text-[15px]" />
                <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                  Saliendo desde:{" "}
                  <span className="text-[14px] font-[500] text-[#4b5563]">
                    {departure}
                  </span>
                </p>
              </div>
            ) : null}

            {arrival ? (
              <div className="flex flex-row items-center mt-2">
                <FaPlaneArrival className="text-[#4b5563] text-[15px]" />
                <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                  Llegando a:{" "}
                  <span className="text-[14px] font-[500] text-[#4b5563]">
                    {arrival}
                  </span>
                </p>
              </div>
            ) : null} */}
          </div>
          <p className=" px-2 pt-2 rounded-lg text-[#0e1734] font-ligth ml-4 text-[15px]">
            Desde
          </p>
          <p className="text-2xl px-5 font-[900] text-[#0e1734]">
            ${price} <span className="text-[17px] font-medium ">MXN</span>
          </p>
          <div className="flex justify-between  mt-2">
            <div className="flex bg-[#ff6600] w-[180px] h-16 justify-center items-center rounded-bl-lg">
              <p className="text-[20px] text-white font-bold">Ver oferta</p>
            </div>
            <div className="flex bg-[#f3f4f6] w-[180px] justify-center items-center rounded-br-lg">
              <p className="text-[20px] font-bold text-[#0e1734]">WhatsApp</p>
            </div>
          </div>
        </div>
      </NavLink>
    </React.Fragment>
  );
}

export default CardTop;
