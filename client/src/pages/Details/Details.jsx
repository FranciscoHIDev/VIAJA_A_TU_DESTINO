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
  FaArrowRight,
  FaClipboardList,
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

  useEffect(() => {
    const getOffersById = async (_id) => {
      const { data } = await axios.get(`/api/offers/${_id}`);
      setOffer(data);
    };
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
    autoplaySpeed: 3000,
    arrows: false,
  };

  const desktopSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };
  const imageSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow border-solid border-t-[3px] border-[#53b3cb] mb-40">
          <div className="  flex felx-col items-center ">
            {offer.length !== 0 ? (
              <div className="flex flex-col ">
                <div className="flex items-center justify-center">
                  <div className="block md:container  w-screen">
                    <Slider {...mobileSettings} className="  md:hidden">
                      {offer.image.map((e, index) => (
                        <div key={index}>
                          <img
                            className="w-[500px] h-[270px]"
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
                          className="w-[650px] h-[420px] px-1"
                          src={e}
                          alt="image"
                        />
                      ))}
                    </Slider>
                  </div>
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
                        <h1 className="mt-3 text-2xl font-bold text-[#035373] uppercase">
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
                          Publicado el {offer.date} by {offer.author}
                        </p>
                        <p className="mt-2 text-2xl font-bold text-[#253777] flex  items-center">
                          <span className="mr-2">
                            <FaClipboardList />
                          </span>
                          Detalles de la oferta
                        </p>

                        <p
                          className="mt-3 text-[18px] text-neutral-800"
                          dangerouslySetInnerHTML={{
                            __html: offer.description,
                          }}
                        ></p>
                      </div>

                      <div className="flex flex-col items-center">
                        <p className="mt-5 text-[20px] font-semibold text-[#253777] ">
                          Imagen de muestra
                        </p>
                        <div className="  md:w-[700px] md:h-[400px] px-2 w-[320px] h-[200px]">
                          <Slider {...imageSettings} className="block">
                            {offer.sampleImages.map((e, index) => (
                              <div key={index}>
                                <img
                                  key={index}
                                  className="mt-4 w-[320px] h-[200px] md:w-[700px] md:h-[400px] "
                                  src={e}
                                  alt="image"
                                />
                              </div>
                            ))}
                          </Slider>
                        </div>
                      </div>
                      {offer.category.name === "Paquete" ||
                      offer.category.name === "Hotel" ||
                      offer.category.name === "Vuelo" ? (
                        <div ref={targetRef}>
                          <p className="mt-10 mb-5 text-2xl font-bold flex text-[#253777] items-center">
                            <span className="mr-2">
                              <FaRegCalendarAlt />
                            </span>{" "}
                            Fechas disponibles
                          </p>
                          <div className="flex justify-between md:px-10 px-5 bg-[#b6b5b5] mx-[5px]  font-medium mb-[-4px] text-[15px]">
                            <p>IDA</p>
                            <p>VUELTA</p>
                            <p className="ml-[-40px]">PRECIO</p>
                            <p></p>
                          </div>

                          <div>
                            {offer.buyLinks.map((e, index) => (
                              <div
                                key={index}
                                className="border bg-white m-1 p-2 block hover:bg-[#53b3cb] md:px-5 px-2"
                              >
                                <a
                                  href={e.link}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center justify-between text-[#035373] md:font-[500] hover:text-white text-[15px] md:text-[16px]">
                                    <p>{e.departureDate}</p>
                                    <p>{e.returnDate}</p>
                                    <p>${e.price}</p>
                                    <p className="flex">
                                      {" "}
                                      <span>Reservar </span>
                                      <span className="mt-1 ml-2">
                                        <FaArrowRight className="text-[#ff3e02]" />
                                      </span>
                                    </p>
                                  </div>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {offer.category.name === "Tour" ? (
                      <div className="flex mt-14 justify-center">
                        {offer.buyLinks.map((e, index) => (
                          <div key={index}>
                            <a
                              href={e.link}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="cursor-pointer"
                            >
                              <button className="bg-[#ff3e02] p-2 rounded-xl text-white text-2xl hover:bg-[#53b3cb]">
                                IR A LA OFERTA
                              </button>
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {offer.category.name === "Paquete" ||
                  offer.category.name === "Hotel" ||
                  offer.category.name === "Vuelo" ? (
                    <div className="">
                      <div className="md:w-[380px] md:h-[420px] border-none rounded-lg bg-white flex flex-col md:mt-0 mt-5">
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
                            {offer.category.name === "Hotel" ? (
                              <p className="pl-4">Precio por noche</p>
                            ) : null}
                            {offer.category.name === "Paquete" ? (
                              <p className="pl-4">Precio por persona</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-5 mx-5">
                          {offer.departure ? (
                            <div className="flex flex-row items-center">
                              <FaPlaneDeparture className="text-[#ff3e02] mr-2" />
                              <p className="md:text-[19px] font-[400]">
                                Salida:{" "}
                                <span className="md:text-[19px] text-[15px] font-[300]">
                                  {offer.departure}
                                </span>
                              </p>
                            </div>
                          ) : null}
                          {offer.arrival ? (
                            <div className="flex flex-row items-center mt-2">
                              <FaPlaneArrival className="text-[#ff3e02] mr-2" />
                              <p className="md:text-[19px] font-[400]">
                                LLegada:{" "}
                                <span className="md:text-[19px] text-[15px] font-[300]">
                                  {offer.arrival}
                                </span>
                              </p>
                            </div>
                          ) : null}
                          <div className="flex flex-row items-center mt-2">
                            <FaRegCalendarAlt className="text-[#ff3e02] mr-2" />
                            <p className="md:text-[19px] font-[400]">
                              Disponibilidad:{" "}
                              <span className="md:text-[19px] text-[15px] font-[300]">
                                {offer.availability}
                              </span>
                            </p>
                          </div>
                          {offer.category.name === "Paquete" ||
                          offer.category.name === "Hotel" ? (
                            <div className="flex flex-row items-center mt-2">
                              <FaHotel className="text-[#ff3e02] mr-2" />
                              <p className="md:text-[19px] font-[400]">
                                Hotel:{" "}
                                <span className="md:text-[19px] text-[15px] font-[300]">
                                  {offer.hotel}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <br></br>
                          )}
                          {offer.category.name === "Paquete" ||
                          offer.category.name === "Hotel" ? (
                            <div className="flex flex-row items-center mt-2">
                              <MdOutlineNightsStay className="text-[#ff3e02] text-[20px] mr-1" />
                              <p className="md:text-[19px] font-[400]">
                                Estancia:{" "}
                                <span className="md:text-[19px] text-[15px] font-[300]">
                                  {offer.daysOfStay}
                                </span>
                              </p>
                            </div>
                          ) : null}
                        </div>
                        <div className="md:mt-10 mt-12 md:mb-0 mb-10 flex justify-center ">
                          <button
                            onClick={scrollToTarget}
                            className="bg-[#ff3e02] p-2 rounded-md text-[#fff] font-[500] hover:bg-[#53b3cb]"
                          >
                            Fechas disponibles
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
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
