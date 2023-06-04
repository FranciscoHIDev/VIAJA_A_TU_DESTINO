import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../components/CardsBanners/Carrusel.css";

function Details() {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getOffersById = async (_id) => {
    const { data } = await axios.get(`/api/offers/${_id}`);
    setOffer(data);
  };

  useEffect(() => {
    getOffersById(id);
  }, [id]);

  const mobileSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const desktopSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 6000,
  };
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow border-solid border-t-[3px] border-[#53b3cb] mb-40">
          <div className="flex felx-col ">
            {offer.length !== 0 ? (
              <div className="flex flex-col">
                <div className="container md:px-0 mx-10 px-10 md:mx-8 items-center ">
                  <Slider {...mobileSettings} className="  md:hidden">
                    {offer.image.map((e, index) => (
                      <div key={index} className="w-[400px] h-[310px]">
                        <img                          
                          className="w-auto h-auto"
                          src={e}
                          alt="image"
                        />
                      </div>
                    ))}
                  </Slider>

                  <Slider {...desktopSettings} className="hidden md:block">
                    {offer.image.map((e, index) => (
                      <img
                        key={index}
                        className="w-[504px] h-[420px]"
                        src={e}
                        alt="image"
                      />
                    ))}
                  </Slider>
                </div>
                <div className="flex flex-col-reverse lg:flex-row mt-8  md:mx-10 mx-5 gap-20">
                  <div className="flex flex-col md:mt-0 mt-[-30px]">
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
                          className="mt-4 md:w-[600px] md:h-[400px]"
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
                    <div className="md:w-[400px] md:h-[450px] border-none rounded-lg bg-white flex flex-col md:mt-0 mt-5">
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
                            <p className="md:text-[20px]">
                              Salida:{" "}
                              <span className="md:text-[20px] text-[15px]">
                                {offer.departure}
                              </span>
                            </p>
                          </div>
                        ) : null}
                        {offer.arrival ? (
                          <div className="flex flex-row items-center mt-2">
                            <FaPlaneArrival className="text-[#ff3e02] mr-2" />
                            <p className="md:text-[20px]">
                              LLegada:{" "}
                              <span className="md:text-[20px] text-[15px]">
                                {offer.arrival}
                              </span>
                            </p>
                          </div>
                        ) : null}
                        <div className="flex flex-row items-center mt-2">
                          <FaRegCalendarAlt className="text-[#ff3e02] mr-2" />
                          <p className="md:text-[20px]">
                            Disponibilidad:{" "}
                            <span className="md:text-[20px] text-[15px]">
                              {offer.availability}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                          <FaHotel className="text-[#ff3e02] mr-2" />
                          <p className="md:text-[20px]">
                            Hotel:{" "}
                            <span className="md:text-[20px] text-[15px]">
                              {offer.hotel}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                          <MdOutlineNightsStay className="text-[#ff3e02] text-[20px] mr-1" />
                          <p className="md:text-[20px]">
                            Estancia:{" "}
                            <span className="md:text-[20px] text-[15px]">
                              {offer.daysOfStay}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="md:mt-20 mt-14 md:mb-0 mb-10 flex justify-center ">
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
