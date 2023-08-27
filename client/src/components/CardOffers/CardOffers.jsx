import React, { useEffect, useState } from "react";
import {
  FaRegCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";
import { MdFavoriteBorder, MdLocationOn } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function CardOffers({
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
        <div
          className="mt-[30px] rounded-[20px] bg-[#fff] w-[330px] h-[490px] m-[12px] border-none 
        "
        >
          <div>
            <RiShareForwardLine className="cursor-pointer bg-[hsla(0,0%,100%,.5)] rounded-[50%] absolute text-[30px] md:ml-[245px] ml-[245px] mt-[20px] text-[#323231] opacity-[80%] p-[2px]" />
            <MdFavoriteBorder className="cursor-pointer bg-[hsla(0,0%,100%,.5)] rounded-[50%] absolute text-[30px] md:ml-[285px] ml-[285px] mt-[20px] text-[#323231] opacity-[80%] p-[2px]" />
            <img
              className="w-[330px] h-[200px] rounded-tl-[20px] rounded-tr-[20px]"
              src={image[0]}
              alt="image"
            />
            <p className="absolute mt-[-180px] rounded-tr-[8px] rounded-br-[8px] px-[1.2em] py-[0.6em] text-[1em] font-[500] bg-[hsla(0,0%,100%,.8)] text-[#323231]">
              {promotion}
            </p>
          </div>
          <div className="flex flex-row items-center mt-2">
            <img
              className="w-[20px] ml-[20px] mr-[10px]"
              src={category.image}
              alt={category.name}
            />
            <p className="text-[20px] text-[#323231]">{category.name}</p>
          </div>
          <div>
            <div>
              <h1 className="text-[17px] text-[#035373] ml-[20px] font-[600] uppercase">
                {title}
              </h1>
              <p className="ml-[20px] mb-3 font-light">{summary}</p>
              <div className="flex flex-row items-center ml-[20px]">
                <FaRegCalendarAlt className="text-[#ff3e02]" />
                <p className="ml-[10px] text-[#323231] font-[400] ">
                  Disponibilidad:{" "}
                  <span className="text-[15px] font-[600] text-[#323231]">
                    {availability}
                  </span>
                </p>
              </div>
              {departure ? (
                <div className="flex flex-row items-center ml-[20px]">
                  <FaPlaneDeparture className="text-[#ff3e02]" />
                  <p className="ml-[10px] text-[#323231] font-[400]">
                    Salida:{" "}
                    <span className="text-[15px] font-[600] text-[#323231]">
                      {departure}
                    </span>
                  </p>
                </div>
              ) : null}
            </div>
            {arrival ? (
              <div className="flex flex-row items-center ml-[20px]">
                <FaPlaneArrival className="text-[#ff3e02]" />
                <p className="ml-[10px] text-[#323231] font-[400]">
                  Llegada:{" "}
                  <span className="text-[15px] font-[600] text-[#323231]">
                    {arrival}
                  </span>
                </p>
              </div>
            ) : (
              <br></br>
            )}
            {category.name === "Hotel" && "Tour" ? (
              <div className="flex flex-row items-center ml-[20px] mt-[-20px] ">
                <MdLocationOn className="text-[#ff3e02] mr-[5px] text-[20px]" />
                <p className="text-[15px] font-[600] text-[#323231]">
                  {destination.name}
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex flex-row-reverse justify-between items-center m-[30px] ">
            <p className="text-[15px]">
              Desde
              <span className="text-[#ff3e02] font-bold text-[20px]">
                {" "}
                ${price}{" "}
              </span>
            </p>

            <NavLink to={`/oferta/${_id}`}>
              <button className="rounded-md border border-[#242424] bg-[#ff] py-[0.4em] px-[1.2em]   hover:bg-[#ff3e02] hover:text-[#fff] hover:border-[#ff3e02]">
                Ver oferta
              </button>
            </NavLink>
          </div>
        </div>
      </NavLink>
    </React.Fragment>
  );
}

export default CardOffers;
