import React, { useState, useEffect } from "react";
import { FaHotel, FaPlaneDeparture, FaSuitcase } from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdLocationOn,
  MdPeople,
  MdLocalHotel,
} from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import Loading from "./../Loading/Loading";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  });

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="mt-[30px] rounded-[20px] bg-[#fff] w-[390px] h-[465px] border-none m-[15px]  ">
        <div>
          <div>
            <RiShareForwardLine className="cursor-pointer bg-[hsla(0,0%,100%,.5)] rounded-[50%] absolute text-[25px] md:ml-[300px] ml-[260px] mt-[20px] text-[#323231] opacity-[80%]" />
            <MdFavoriteBorder className="cursor-pointer bg-[hsla(0,0%,100%,.5)] rounded-[50%] absolute text-[25px] md:ml-[340px] ml-[300px] mt-[20px] text-[#323231] opacity-[80%]" />
          </div>
          <img
            className="w-[390px] h-[200px] rounded-tr-[20px] rounded-tl-[20px]"
            src={image}
            alt="image"
          />

          {promotion ? (
            <div className="flex flex-row items-center absolute mt-[-180px] rounded-tr-[100px] rounded-br-[100px] pl-[10px] h-[50px] text-[1em] font-[500]  bg-[#f4991a] text-[#fff]">
              <p className="text-[19px] drop-shadow-[0.1em_0.1em_0.1em_black]">
                {promotion}
              </p>
              <p className="ml-[10px] bg-[#fff] rounded-[100%] w-[50px] h-[50px]">
                <FaSuitcase className="text-[#035373] text-[35px] ml-[7px] mt-[6px]" />
              </p>
            </div>
          ) : null}
          <div className="flex flex-col  absolute">
            <p className="text-[18px] mt-[-80px] ml-[20px] text-[#fff] drop-shadow-[0.1em_0.1em_0.1em_black]">
              {hotel}
            </p>
            <div className="flex flex-row items-center ml-[15px] ">
              <MdLocationOn className="text-[#ff3e02] mr-[5px] text-[20px]" />
              <p className="text-[15px] font-[600] text-[#fff] drop-shadow-[0.1em_0.1em_0.1em_rgb(255,62,2)]">
                {destination.name}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <div className="flex flex-col ml-[20px] mt-4">
              <div className="flex flex-row items-center">
                <FaPlaneDeparture />
                <p className="ml-[10px] text-[#323231] font-[300]">
                  Saliendo desde
                </p>
              </div>

              <p className="mt-[-3px] ml-[26px] text-[#323231] font-[500] ">
                {departure}
              </p>
            </div>

            <div className="flex flex-row ]">
              <div className="mt-[20px] ml-[20px]">
                <MdLocalHotel className="text-[19px] text-[#323231] mt-[-9px] mr-2" />
              </div>
              <div className="mt-2">
                <p className=" text-[#323231] font-[300] mb-[-2px] ">
                  Desde{" "}
                  <span className="text-[15px] font-[600] text-[#323231] ">
                    {from}
                  </span>
                </p>
                <p className=" text-[#323231] font-[300]">
                  Hasta
                  <span className="text-[15px] font-[600] text-[#323231] ml-2">
                    {to}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-row ml-[20px] items-center mt-2">
              <MdPeople className="mr-[5px] text-[20px] text-[#323231]" />
              <p>{persons} personas</p>
            </div>
          </div>
          <div className="flex flex-row-reverse m-[30px]  justify-between ">
            <div className="flex flex-col items-center mt-[-40px]">
              <p className="text-[15px]">Desde </p>
              {previousPrice ? (
                <p className="text-[20px] line-through text-[#323231]">
                  ${previousPrice}
                </p>
              ) : (
                <br></br>
              )}

              <p className="text-[#ff3e02] text-[20px] font-bold"> ${price}</p>
              <p className="text-[#323231] text-[15px]">Impuestos incluidos</p>
            </div>
            <div className="flex  text-[#323231]">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <button className="rounded-md border border-[#242424] bg-[#ff] py-[0.4em] px-[1.2em]   hover:bg-[#ff3e02] hover:text-[#fff] hover:border-[#ff3e02]">
                  Reservar
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardPackage;
