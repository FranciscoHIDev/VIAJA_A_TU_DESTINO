import React from "react";
import {
  FaRegCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMapMarkedAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
function CardTop({
  _id,
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
}) {
  return (
    <React.Fragment>
      <NavLink to={`/oferta/${_id}`}>
        <div className="bg-white mt-10 h-[480px] md:w-[400px] m-2 w-auto">
          <div>
            <img
              className="p-[1px] h-[250px] w-[400px]"
              src={image[0]}
              alt="image"
            />
            <button className="bg-[#ff3e02] px-2 py-2 rounded-lg text-white font-medium absolute mt-[-60px] ml-4">
              Desde ${price} MXN{" "}
            </button>
          </div>
          <div className="mt-3 ml-4 mr-4">
            <p className="uppercase font-bold text-[20px] text-[#333]">
              {title}
            </p>
            {category.name === "Tour" || category.name === "Hotel" ? (
              <div className="flex flex-row items-center mt-2">
                <FaMapMarkedAlt className="text-[#666] text-[20px]" />
                <p className="ml-[10px] text-[#666] font-[400] ">
                  Destino:{" "}
                  <span className="text-[15px] font-[600] text-[#666]">
                    {destination.name.charAt(0).toUpperCase() +
                      destination.name.slice(1).toLowerCase()}
                  </span>
                </p>
              </div>
            ) : null}

            <div className="flex flex-row items-center mt-2">
              <FaRegCalendarAlt className="text-[#666] text-[20px]" />
              <p className="ml-[10px] text-[#666] font-[400] ">
                Disponibilidad:{" "}
                <span className="text-[15px] font-[600] text-[#666]">
                  {availability}
                </span>
              </p>
            </div>

            {departure ? (
              <div className="flex flex-row items-center mt-2">
                <FaPlaneDeparture className="text-[#666] text-[20px]" />
                <p className="ml-[10px] text-[#666] font-[400]">
                  Saliendo desde:{" "}
                  <span className="text-[15px] font-[600] text-[#666]">
                    {departure}
                  </span>
                </p>
              </div>
            ) : null}

            {arrival ? (
              <div className="flex flex-row items-center mt-2">
                <FaPlaneArrival className="text-[#666] text-[20px]" />
                <p className="ml-[10px] text-[#666] font-[400]">
                  Llegando a:{" "}
                  <span className="text-[15px] font-[600] text-[#666]">
                    {arrival}
                  </span>
                </p>
              </div>
            ) : null}
            <div className="mt-4">
              <p className="text-[#666]">{summary}</p>
            </div>
          </div>
        </div>
      </NavLink>
    </React.Fragment>
  );
}

export default CardTop;
