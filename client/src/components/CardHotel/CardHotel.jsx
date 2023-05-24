import React, { useState, useEffect } from "react";
import { FaHotel } from "react-icons/fa";
import {
  MdFavoriteBorder,
  MdLocationOn,
  MdPeople,
  MdLocalHotel,
} from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function CardHotel({
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  const loader = () => {
    return (
      <SkeletonTheme baseColor="#ebebeb" highlightColor="#f8f8f8">
        <div className="mt-[30px] rounded-[20px] bg-white md:w-[390px] md:h-[490px] m-[15px] border-none w-[350px] h-[490px]">
          <div className="flex flex-row mt-8 md:ml-[300px] ml-[260px]">
            <div className="mr-2">
              {" "}
              <Skeleton width={30} height={30} circle={true} />
            </div>
            <div>
              {" "}
              <Skeleton width={30} height={30} circle={true} />
            </div>
          </div>
          <div>{<Skeleton width={120} height={40} />}</div>
          <div className="mt-[100px] flex flex-row ml-[20px]">
            {<Skeleton width={40} height={25} />}
            <span className="ml-[10px]">
              {<Skeleton width={90} height={25} />}
            </span>
          </div>
          <div className="ml-[20px]">
            {" "}
            {<Skeleton width={180} height={25} />}
          </div>
          <div className="ml-[20px]">
            {" "}
            {<Skeleton width={305} height={25} />}
          </div>
          <div className="ml-[20px]">
            {" "}
            {<Skeleton width={305} height={25} />}
          </div>
          <div className="ml-[20px]">
            {" "}
            {<Skeleton width={230} height={25} />}
          </div>
          <div className="ml-[20px]">
            {" "}
            {<Skeleton width={230} height={25} />}
          </div>
          <div className="mt-8 flex flex-row justify-between mx-[20px]">
            <div> {<Skeleton width={120} height={30} />}</div>
            <div> {<Skeleton width={120} height={30} />}</div>
          </div>
        </div>
      </SkeletonTheme>
    );
  };

  if (loading) {
    return loader();
  } else {
    return (
      <div className="mt-[30px] rounded-[20px] bg-[#fff] w-[390px] h-[465px] border-none m-[15px] ">
        <div>
          <div>
            <RiShareForwardLine className="cursor-pointer bg-[hsla(0,0%,100%,.5)] rounded-[50%] absolute text-[25px] md:ml-[300px] ml-[260px] mt-[20px] text-[#323231] opacity-[80%]" />
            <MdFavoriteBorder className="cursor-pointer bg-[hsla(0,0%,100%,.5)] rounded-[50%] absolute text-[25px] md:ml-[340px] ml-[300px] mt-[20px] text-[#323231] opacity-[80%]" />
          </div>
          <img
            className="w-[390px] h-[200px] rounded-tl-[20px] rounded-tr-[20px]"
            src={image}
            alt="image"
          />
          {discount ? (
            <div className="flex flex-row items-center absolute mt-[-180px] rounded-tr-[100px] rounded-br-[100px] pl-[10px] h-[50px] text-[1em] font-[500]  bg-[#f4991a] text-[#fff]">
              <p className="text-[19px] drop-shadow-[0.1em_0.1em_0.1em_black]">
                {discount}
              </p>
              <p className="ml-[10px] bg-[#fff] rounded-[100%] w-[50px] h-[50px]">
                <FaHotel className="text-[#035373] text-[32px] ml-[9px] mt-[8px]" />
              </p>
            </div>
          ) : null}
        </div>
        <div>
          <h1 className="text-[18px] text-[#035373] mx-[20px] mt-2">{name}</h1>
          <div className="flex flex-row mt-2">
            <div className="mt-[20px] ml-[20px]">
              {" "}
              <MdLocalHotel className="text-[19px] text-[#323231] mt-[-16px] " />
            </div>
            <div>
              <p className="ml-[10px] text-[#323231] font-[300]">
                Desde{" "}
                <span className="text-[15px] font-[600] text-[#323231]">
                  {from}
                </span>
              </p>
              <p className="ml-[10px] text-[#323231] font-[300]">
                Hasta{" "}
                <span className="text-[15px] font-[600] text-[#323231] ml-1">
                  {to}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-row ml-[20px] items-center mt-2">
            <MdPeople className="mr-[10px] text-[20px] text-[#323231]" />
            <p>{persons} personas</p>
          </div>
          <div className="flex flex-row items-center ml-[20px] mt-2">
            <MdLocationOn className="text-[#ff3302] text-[20px] mr-[10px]" />
            <p className="text-[15px] font-[600] text-[#323231] drop-shadow-[0.1em_0.1em_0.4em_#ff3e02]">
              {destination.name}
            </p>
          </div>
        </div>
        <div className="flex flex-row-reverse m-[30px] justify-between">
          <div className="flex flex-col items-center mt-[-50px]">
            <p className="text-[15px]">Desde </p>
            {previousPrice ? (
              <p className="text-[20px] line-through">${previousPrice}</p>
            ) : (
              <br></br>
            )}

            <p className="text-[#ff3e02] font-bold text-[20px]"> ${price}</p>
            <p className="text-[14px] text-[#323231]">Impuestos incluidos</p>
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
    );
  }
}

export default CardHotel;
