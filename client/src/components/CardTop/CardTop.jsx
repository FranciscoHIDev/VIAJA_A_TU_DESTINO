import React from "react";
import { FaRegCalendarAlt, FaHotel, FaTicketAlt } from "react-icons/fa";
import { MdPeople, MdFlight } from "react-icons/md";

import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
function CardTop({
  _id,
  title,
  summary,
  category,
  image,
  price,

  availability,
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
      <div className="bg-white mt-10 h-[490px] md:w-[360px] m-2  w-auto rounded-[16px] border-[1px]">
        <NavLink to={`/oferta/${_id}`}>
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
            {category.name === "Paquete" ? (
              <div className="flex flex-row items-center mt-2">
                <p className=" mr-2 text-[#4b5563] font-[400] text-[14px]">
                  Incluye:
                </p>
                <div className="flex flex-row mr-4 rounded-md bg-[#fef2f2] py-1 px-1">
                  <MdFlight className="text-[#4b5563] text-[15px] mr-2 " />
                  <span className="text-[#ff6600] font-medium">Vuelo</span>
                </div>
                <div className="flex flex-row rounded-md bg-[#fef2f2] p-1">
                  <FaHotel className="text-[#4b5563] text-[15px] mr-2" />
                  <span className="text-[#ff6600] font-medium">Hotel</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-row items-center mt-2">
                <div className="flex flex-row mr-4 rounded-md bg-[#fef2f2] py-1 px-1">
                  <FaTicketAlt className="text-[#4b5563] text-[15px] mr-2 " />
                  <span className="text-[#ff6600] font-medium">
                    {" "}
                    Oferta Exlusiva
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-row items-center mt-1">
              <FaRegCalendarAlt className="text-[#4b5563] text-[15px]" />
              <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                Viajando en{" "}
                <span className="text-[14px] font-[400] text-[#4b5563]">
                  {availability}
                </span>
              </p>
            </div>
            {category.name === "Tour" ||
            category.name === "Vuelo" ||
            category.name === "Paquete" ? (
              <div className="flex flex-row items-center mt-2">
                <MdPeople className="text-[#4b5563] text-[16px]" />
                <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                  Precio por persona
                </p>
              </div>
            ) : (
              <div className="flex flex-row items-center mt-2">
                <MdPeople className="text-[#4b5563] text-[16px]" />
                <p className="ml-[10px] text-[#4b5563] font-[400] text-[14px]">
                  Precio por persona
                </p>
              </div>
            )}
            <hr className="border-t-1 w-3/8 mt-8" />
          </div>
          <p className=" px-2 pt-4 rounded-lg text-[#0e1734] font-ligth ml-4 text-[15px] mt-2">
            Desde
          </p>
          <p className="text-4xl px-5 font-[900] text-[#0e1734]">
            ${price} <span className="text-[17px] font-medium ">MXN</span>
          </p>
        </NavLink>
        <div className="flex justify-between  mt-4">
          <NavLink to={`/oferta/${_id}`}>
            <div className="flex bg-[#ff6600] w-[180px] h-14 justify-center items-center rounded-bl-lg">
              <p className="text-[16px] text-white font-bold">Ver oferta</p>
            </div>
          </NavLink>
          <a href="https://api.whatsapp.com/send/?phone=5219984954637&text&type=phone_number&app_absent=0">
            <div className="flex bg-[#f3f4f6] w-[180px]  h-14 justify-center items-center rounded-br-lg">
              <p className="text-[16px] font-bold text-[#0e1734]">WhatsApp</p>
            </div>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardTop;
