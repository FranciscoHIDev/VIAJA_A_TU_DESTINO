import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { MdLocationOn, MdOutlineNightsStay } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import {
  FaHotel,
  FaRegCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getOffersById = async (_id) => {
    const { data } = await axios.get(`/api/offers/${_id}`);
    console.log(data);
    setOffer(data);
  };

  useEffect(() => {
    getOffersById(id);
  }, [id]);

  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow border-solid border-t-[3px] border-[#53b3cb] mb-40">
          <div className="flex felx-col">
            {offer.length !== 0 ? (
              <div className="flex flex-col">
                <div className="lg:w-[600px] lg:h-[400px] flex md:mx-2  mx-0 w-[88%]">
                  <img className="mr-4" src={offer.image[0]} alt="image" />
                  {/* <img src={offer.image[1]} alt="image" /> */}
                </div>
                <div className="flex flex-col-reverse lg:flex-row mt-8  mx-5 gap-20">
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <div>
                        <button className="bg-[#53b3cb] px-4  py-1 rounded-md text-white font-medium">
                          🔥{offer.promotion}
                        </button>
                      </div>
                      <div>
                        <h1 className="mt-3 text-3xl font-bold">
                          {offer.title}
                        </h1>
                        <p className="mt-2 text-[20px]">{offer.summary}</p>
                        <p className="mt-2 text-[#ff3e02] font-bold flex">
                          <span className="mt-1 mr-1">
                            <MdLocationOn />
                          </span>
                          {offer.destination.name}
                        </p>
                        <p className="mt-5 text-[17px]">
                          Creado el {offer.date} by {offer.author}
                        </p>
                        <p className="mt-2 text-2xl font-bold">
                          Detalles de la oferta
                        </p>
                        <p className="text-[18px] text-justify mt-2">
                          {offer.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="mt-5 text-[20px] font-semibold ">
                          Imagen de muestra
                        </p>
                        <img
                          className="mt-4 w-[600px] h-[400px]"
                          src={offer.sampleImages[0]}
                          alt="image-sample"
                        />
                      </div>
                      <div ref={targetRef}>
                        <p className="mt-10 text-2xl font-bold">
                          Fechas disponibles
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="w-[400px] h-[450px] border-none rounded-lg bg-white flex flex-col ">
                      <div className="bg-[#035373] py-2 rounded-tl-lg rounded-tr-lg border-b-2">
                        <p className="text-center text-[20px] font-semibold text-white uppercase">
                          Resumen
                        </p>
                      </div>
                      <div className="flex   justify-center bg-[#035373] pb-3 pt-3">
                        <div className="flex flex-row items-center text-white">
                          <ImPriceTag className="mr-2 mt-1" />
                          <p className="text-[20px] mr-2">Desde </p>
                          <p className="text-[25px]">${offer.price}</p>
                        </div>
                      </div>
                      <div className="mt-5 mx-3">
                        {offer.departure ? (
                          <div className="flex flex-row items-center">
                            <FaPlaneDeparture className="text-[#ff3e02] mr-2" />
                            <p className="text-[20px]">
                              Salida: <span>{offer.departure}</span>
                            </p>
                          </div>
                        ) : null}
                        {offer.arrival ? (
                          <div className="flex flex-row items-center mt-2">
                            <FaPlaneArrival className="text-[#ff3e02] mr-2" />
                            <p className="text-[20px]">
                              LLegada: <span>{offer.arrival}</span>
                            </p>
                          </div>
                        ) : null}
                        <div className="flex flex-row items-center mt-2">
                          <FaRegCalendarAlt className="text-[#ff3e02] mr-2" />
                          <p className="text-[20px]">
                            Disponibilidad: <span>{offer.availability}</span>
                          </p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                          <FaHotel className="text-[#ff3e02] mr-2" />
                          <p className="text-[20px]">
                            Hotel: <span>{offer.hotel}</span>
                          </p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                          <MdOutlineNightsStay className="text-[#ff3e02] text-[20px] mr-1" />
                          <p className="text-[20px]">
                            Estancia: <span>{offer.daysOfStay}</span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-20 flex justify-center ">
                        <button
                          onClick={scrollToTarget}
                          className="bg-[#ff3e02] p-2 rounded-md text-white font-bold"
                        >
                          Fechas disponibles
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </main>
        <footer className="mt-10">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Details;
