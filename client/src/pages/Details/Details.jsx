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
        <main className="flex-grow border-solid border-t-[1px]  mb-40 ">
          <div className="  flex felx-col">
            {offer.length !== 0 ? (
              <div className="flex flex-col ">
                <div className="flex flex-col justify-center border rounded-xl mt-5 md:mx-10 py-10 bg-white">
                  <div className="md:ml-10 mb-10 px-2">
                    <h1 className="md:mt-3 md:text-3xl text-[20px] font-bold text-[#0260fe] text-left">
                      {offer.title}
                    </h1>
                    <p className="text-[18px] font-medium mt-2">
                      {offer.summary}
                    </p>
                  </div>
                  <div className=" block md:container  w-screen px-3 justify-center">
                    <Slider {...mobileSettings} className="  md:hidden">
                      {offer.image.map((e, index) => (
                        <div key={index}>
                          <img
                            className="w-[400px] h-[270px]"
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
                          className="w-[650px] h-[420px] px-1 rounded-xl "
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
                        <p className="mt-4 text-2xl font-bold text-[#3794ff] flex  items-center">
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
                        <p className="mt-5 text-[20px] font-semibold text-[#ff6600] ">
                          Imagen de muestra
                        </p>
                        <div className="  md:w-[700px] md:h-[400px] px-2 w-[320px] h-[200px]">
                          <Slider {...imageSettings} className="block">
                            {offer.sampleImages.map((e, index) => (
                              <div key={index}>
                                <img
                                  key={index}
                                  className="mt-4 w-full h-full md:w-full md:h-full "
                                  src={e}
                                  alt="image"
                                  onClick={() => setOpen(false)}
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
                          <p className="mt-10 mb-3 text-2xl font-bold flex text-[#3794ff] items-center">
                            <span className="mr-2">
                              <FaRegCalendarAlt />
                            </span>{" "}
                            Fechas disponibles
                          </p>
                          <p className="text-[20px] text-[#ff6600] font-semibold">
                            ¡Da click en la fecha que te interese!
                          </p>
                          <div className="flex justify-between md:px-10 px-5 bg-[#0260fe] mx-[5px]  font-medium mb-[-4px] text-[15px] text-white py-3 mt-3">
                            <p>IDA</p>
                            <p>VUELTA</p>
                            <p className="ml-[-40px]">PRECIO DESDE</p>
                            <p></p>
                          </div>

                          <div className="bg-[#f9fafa]">
                            {offer.buyLinks.map((e, index) => (
                              <div
                                key={index}
                                className="border bg-white m-1 p-2 block hover:bg-[#3794ff] md:px-5 px-2 hover:text-white"
                              >
                                <a
                                  href={e.link}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="cursor-pointer"
                                >
                                  <div className="flex items-center justify-between text-[#035373] md:font-[500]  text-[15px] md:text-[16px] hover:text-white">
                                    <p>{e.departureDate}</p>
                                    <p>{e.returnDate}</p>
                                    <p>${e.price}</p>
                                    <p className="flex">
                                      {" "}
                                      <div className=" flex items-center bg-[#ff6600] p-1 rounded-md text-white">
                                        Reservar
                                        <FaArrowRight className="text-white ml-1" />
                                      </div>
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
                              <button className="bg-[#ff6600] p-2 rounded-xl text-white text-2xl hover:bg-[#53b3cb]">
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
                        <div className="bg-[#0260fe] py-2 rounded-tl-lg rounded-tr-lg border-b-2">
                          <p className="text-center text-[20px] font-semibold text-white uppercase">
                            Resumen
                          </p>
                        </div>
                        <div className="flex   justify-center bg-[#3794ff] pb-3 pt-3">
                          <div className="flex flex-row items-center text-white">
                            <ImPriceTag className="mr-2 mt-1 text-[16px]" />
                            <p className="md:text-[20px] text-[16px] mr-1 font-600">
                              Desde{" "}
                            </p>
                            <p className="text-[25px]  font-bold">
                              ${offer.price}
                              <span className="ml-2">MXN</span>
                            </p>
                            {offer.category.name === "Hotel" ? (
                              <p className="md:pl-4 pl-2">Precio por noche</p>
                            ) : null}
                            {offer.category.name === "Paquete" ? (
                              <p className="md:pl-3 pl-2 font-medium text-[14px]">
                                Precio por persona
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-5 mx-5">
                          {offer.departure ? (
                            <div className="flex flex-row items-center">
                              <FaPlaneDeparture className="text-[#ff6600] mr-2 text-[16px]" />
                              <p className="md:text-[19px] text-[15px] font-[400]">
                                Salida:{" "}
                                <span className="md:text-[19px] text-[15px] font-[300]">
                                  {offer.departure}
                                </span>
                              </p>
                            </div>
                          ) : null}
                          {offer.arrival ? (
                            <div className="flex flex-row items-center mt-2">
                              <FaPlaneArrival className="text-[#ff6600] mr-2 text-[16px]" />
                              <p className="md:text-[19px] font-[400] text-[15px]">
                                LLegada:{" "}
                                <span className="md:text-[19px] text-[15px] font-[300]">
                                  {offer.arrival}
                                </span>
                              </p>
                            </div>
                          ) : null}
                          <div className="flex flex-row items-center mt-2">
                            <FaRegCalendarAlt className="text-[#ff6600] mr-2 text-[16px]" />
                            <p className="md:text-[19px] font-[400] text-[15px]">
                              Disponibilidad:{" "}
                              <span className="md:text-[19px] text-[15px] font-[300]">
                                {offer.availability}
                              </span>
                            </p>
                          </div>
                          {offer.category.name === "Paquete" ||
                          offer.category.name === "Hotel" ? (
                            <div className="flex flex-row items-center mt-2">
                              <FaHotel className="text-[#ff6600] mr-2 text-[16px]" />
                              <p className="md:text-[19px] font-[400] text-[15px]">
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
                              <MdOutlineNightsStay className="text-[#ff6600]  mr-1 text-[20px]" />
                              <p className="md:text-[19px] font-[400] text-[15px]">
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
                            className="bg-[#ff6600] p-2 rounded-md text-[#fff] font-[500] hover:bg-[#53b3cb] text-[15px]"
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
