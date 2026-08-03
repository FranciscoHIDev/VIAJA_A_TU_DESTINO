import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { MdOutlineNightsStay, MdAlarm } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import {
  FaHotel,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaWhatsapp,
  FaArrowRight,
  FaStar,
  FaShieldAlt,
  FaCreditCard,
  FaPlaneDeparture,
  FaPlaneArrival,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../components/CardsBanners/Carrusel.css";

function Details() {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);
  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getOffersById = async (_id) => {
      const { data } = await axios.get(`/api/offers/${_id}`);
      setOffer(data);
    };
    getOffersById(id);
  }, [id]);

  const [openGallery, setOpenGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = Array.isArray(offer?.image)
    ? offer.image.filter(Boolean)
    : offer?.image
      ? [offer.image]
      : [];

  const openImageGallery = (index = 0) => {
    if (!galleryImages.length) return;

    setCurrentImage(index);
    setOpenGallery(true);
  };

  const [viewers, setViewers] = useState(Math.floor(Math.random() * 43) + 8);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        // Cambia entre -3 y +3
        const change = Math.floor(Math.random() * 7) - 3;

        let next = prev + change;

        // Mantener entre 8 y 50
        if (next < 8) next = 8;
        if (next > 50) next = 50;

        return next;
      });
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const [relatedOffers, setRelatedOffers] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  useEffect(() => {
    const getRelatedOffers = async () => {
      if (!offer?._id) return;

      try {
        setLoadingRelated(true);

        /*
         * Cambia "/api/offers" únicamente si tu endpoint
         * para obtener todas las ofertas es diferente.
         */
        const response = await axios.get("/api/offers");

        const offersData = Array.isArray(response.data)
          ? response.data
          : response.data?.offers || [];

        const currentCategory = offer.category?.name || offer.category || "";

        const currentDestination =
          offer.destination?.name || offer.destination || offer.location || "";

        const filteredOffers = offersData
          .filter((relatedOffer) => {
            const relatedId = relatedOffer._id || relatedOffer.id;

            if (String(relatedId) === String(offer._id)) {
              return false;
            }

            const relatedCategory =
              relatedOffer.category?.name || relatedOffer.category || "";

            const relatedDestination =
              relatedOffer.destination?.name ||
              relatedOffer.destination ||
              relatedOffer.location ||
              "";

            const sameCategory =
              currentCategory && relatedCategory === currentCategory;

            const sameDestination =
              currentDestination && relatedDestination === currentDestination;

            return sameCategory || sameDestination;
          })
          .slice(0, 4);

        setRelatedOffers(filteredOffers);
      } catch (error) {
        console.error("Error al obtener ofertas relacionadas:", error);

        setRelatedOffers([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    getRelatedOffers();
  }, [offer]);
  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <header>
          <NavBar />
        </header>

        <main className="flex-1">
          <section className="relative overflow-hidden rounded-b-3xl shadow-2xl lg:h-[640px]">
            {/* Imagen */}

            <img
              src={galleryImages[0]}
              alt={offer.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-r from-[#022B57]/95 via-[#022B57]/75 to-[#022B57]/35"></div>

            <div className="relative z-20 mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:h-full lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-10 lg:py-0">
              {/* ========================= */}
              {/* IZQUIERDA */}
              {/* ========================= */}

              <div className="w-full max-w-3xl">
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="flex items-center gap-2 rounded-full bg-[#ff6600] px-3 py-2 text-xs font-semibold text-white shadow-lg sm:px-5 sm:text-sm lg:text-base">
                    <MdAlarm className="font-bold text-[17px]" />
                    Quedan pocas fechas disponibles
                  </span>
                </div>

                <h1 className="mt-6 break-words text-2xl font-black leading-tight text-white sm:mt-8 sm:text-4xl lg:text-5xl">
                  {offer.title}
                </h1>

                <p className="mt-4 text-base leading-relaxed text-white/90 sm:mt-6 sm:text-lg lg:text-xl">
                  {offer.summary}
                </p>

                {/* UBICACION */}

                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-base text-white sm:mt-8 sm:gap-8 sm:text-lg">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-[#ff6600]" />
                    Cancún
                  </div>

                  <div className="flex items-center gap-2">⭐⭐⭐⭐</div>
                </div>

                {/* TARJETAS */}

                <div className="mt-4 grid grid-cols-3 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:flex lg:gap-5">
                  <div className="flex min-w-0 flex-col items-center justify-center rounded-2xl bg-white px-3 py-4 text-center shadow-xl sm:px-5 sm:py-5 lg:px-6">
                    <div className="text-sm text-gray-500">Hasta</div>

                    <div className="text-3xl font-black text-[#ff6600]">
                      12 MSI
                    </div>
                  </div>

                  <div className="flex min-w-0 flex-col items-center justify-center rounded-2xl bg-white px-3 py-4 text-center shadow-xl sm:px-5 sm:py-5 lg:px-6">
                    <div className="items-center text-xs text-gray-500 sm:text-sm">
                      <p>👀 Personas interesadas</p>
                    </div>

                    <div className="text-3xl font-black text-[#0260fe] justify-center">
                      <p>{viewers}</p>
                    </div>
                  </div>

                  <div className="col-span-1 flex items-center justify-center rounded-2xl bg-red-500 px-4 py-4 text-center text-white shadow-xl sm:col-span-1 sm:px-5 sm:py-5 lg:px-6">
                    <div className="font-bold">Últimos lugares</div>
                  </div>
                </div>
              </div>

              {/* ========================= */}
              {/* DERECHA */}
              {/* ========================= */}

              <div className="h-auto w-full overflow-hidden rounded-3xl border-4 border-sky-100 bg-white shadow-2xl sm:max-w-[520px] sm:self-center lg:h-[480px] lg:w-[390px] lg:max-w-none lg:shrink-0 lg:self-auto">
                <div className="flex flex-wrap items-baseline justify-center gap-x-1 bg-[#0260fe] p-4 text-center">
                  <p className="mr-1 tracking-widest text-white">Desde</p>
                  <p className="mr-1 text-2xl font-black text-white">
                    ${offer.price}
                  </p>
                  <p className="text-white/90">MXN por persona</p>
                </div>

                <div className="space-y-3 p-4 sm:p-5 lg:p-4">
                  <div className="flex justify-between gap-4 lg:gap-0">
                    <span>
                      <FaHotel className="inline mr-2" />
                      Hotel
                    </span>

                    <span className="min-w-0 break-words text-right">
                      {offer.hotel}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 lg:gap-0">
                    <span>
                      <FaCalendarAlt className="inline mr-2" />
                      Estancia
                    </span>

                    <span className="min-w-0 break-words text-right">
                      {offer.daysOfStay}
                    </span>
                  </div>

                  {/* <div className="flex justify-between gap-4 lg:gap-0">
                    <span>
                      <FaPlaneDeparture className="inline mr-2" />
                      Salida
                    </span>

                    <span className="min-w-0 break-words text-right">
                      {offer.departure}
                    </span>
                  </div> */}

                  <div className="flex justify-between gap-4 lg:gap-0">
                    <span>Disponibilidad</span>

                    <span className="min-w-0 break-words text-right">
                      {offer.availability}
                    </span>
                  </div>

                  <hr />

                  <div className="space-y-2 bg-orange-100 p-2 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FaShieldAlt className="text-[#0260fe]" />
                      Pago 100% seguro
                    </div>

                    <div className="flex items-center gap-3">
                      <FaCreditCard className="text-[#0260fe]" />
                      Paga a meses sin intereses
                    </div>

                    <div className="flex items-center gap-3">
                      <FaStar className="text-[#ff6600]" />
                      Confirmación inmediata
                    </div>
                  </div>

                  <button
                    onClick={scrollToTarget}
                    className="w-full bg-[#ff6600] text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition flex items-center justify-center gap-3"
                  >
                    Ver Fechas Disponibles
                    <FaArrowRight />
                  </button>

                  <a
                    href={`https://wa.me/529984954637?text=${encodeURIComponent(
                      `Hola, me interesa la oferta: ${offer.title}.

Oferta: https://www.viajaatudestino.com/oferta/${offer.slug || offer._id}

Quiero consultar fechas y disponibilidad.`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full border-2 border-[#25D366] text-[#25D366] py-4 rounded-xl font-bold hover:bg-[#25D366] hover:text-white transition flex items-center justify-center gap-3"
                  >
                    <FaWhatsapp />
                    Hablar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          {/* BARRA DE CONFIANZA */}
          {/* ========================================================= */}

          <section className="relative z-30 mx-auto -mt-6 max-w-7xl px-4 sm:-mt-8 sm:px-5 lg:-mt-10">
            <div className="grid  grid-cols-4  overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-4 px-2">
              <div className="flex  justify-center items-center gap-3 border-b border-gray-100 p-4 sm:border-r sm:p-6 lg:border-b-0">
                <div className="flex sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 sm:text-2xl text-[18px]">
                  🛡️
                </div>

                <div>
                  <p className="font-bold text-gray-900 text-[10px] sm:text-lg">
                    Seguro
                  </p>
                  <p className="mt-1 text-[9px] text-gray-500 sm:text-sm">
                    Compra protegida
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 border-b border-gray-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                <div className="flex sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 sm:text-2xl text-[18px]">
                  🔥
                </div>

                <div>
                  <p className="font-bold text-gray-900 text-[10px] sm:text-lg">
                    Verificada
                  </p>
                  <p className="mt-1  text-gray-500 text-[9px] sm:text-sm">
                    Seleccionada por expertos
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 border-b border-gray-100 p-4 sm:border-b-0 sm:border-r sm:p-6">
                <div className="flex  sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 sm:text-2xl text-[18px]">
                  💬
                </div>

                <div>
                  <p className="font-bold text-gray-900 text-[10px] sm:text-lg">
                    Asesoría
                  </p>
                  <p className="mt-1 text-[9px] text-gray-500 sm:text-sm">
                    Antes y durante tu viaje
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4 p-4 sm:p-6">
                <div className="flex sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 sm:text-2xl text-[18px]">
                  💳
                </div>

                <div className="items-center">
                  <p className="font-bold text-gray-900 text-[10px] sm:text-lg">
                    Paga a MSI
                  </p>
                  <p className="mt-1 text-[9px] text-gray-500 sm:text-sm">
                    Con tarjetas participantes
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          {/* PRESENTACIÓN DE LA OFERTA */}
          {/* ========================================================= */}

          <section className="bg-[#f7f9fc] py-14 sm:py-16 lg:pb-20 lg:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-5">
              <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#ff6600]">
                    Conoce esta oferta
                  </span>

                  <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                    Una escapada que vale la pena
                  </h2>

                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
                    Descubre las instalaciones, habitaciones y experiencias que
                    podrás disfrutar durante tu estancia.
                  </p>
                </div>
              </div>

              {/* GALERÍA DE IMÁGENES */}
              {/* ========================================================= */}

              {galleryImages.length > 0 ? (
                <>
                  <div className="grid h-auto grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:gap-3 lg:h-[520px] lg:grid-cols-4 lg:grid-rows-2 lg:rounded-3xl">
                    {/* IMAGEN PRINCIPAL */}

                    <button
                      type="button"
                      onClick={() => openImageGallery(0)}
                      className="
          group
          relative
          col-span-2
          h-[230px]
          sm:h-[360px]
          cursor-zoom-in
          overflow-hidden
          text-left
          lg:row-span-2
          lg:h-full
        "
                      aria-label="Abrir imagen principal"
                    >
                      <img
                        src={galleryImages[0]}
                        alt={`${offer.title} imagen principal`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition duration-300 group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-2xl shadow-xl">
                          🔍
                        </div>
                      </div>

                      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
                        <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-[#023e73] shadow-lg backdrop-blur">
                          Vista principal
                        </span>
                      </div>
                    </button>

                    {/* IMAGEN 2 */}

                    <button
                      type="button"
                      onClick={() => openImageGallery(1)}
                      className="
          group
          relative
          h-[135px]
          sm:h-[170px]
          cursor-zoom-in
          overflow-hidden
          lg:h-full
        "
                      aria-label="Abrir fotografía 2"
                    >
                      <img
                        src={galleryImages[1] || galleryImages[0]}
                        alt={`${offer.title} instalación`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-xl shadow-lg">
                          🔍
                        </span>
                      </div>
                    </button>

                    {/* IMAGEN 3 */}

                    <button
                      type="button"
                      onClick={() => openImageGallery(2)}
                      className="
          group
          relative
          h-[135px]
          sm:h-[170px]
          cursor-zoom-in
          overflow-hidden
          lg:h-full
        "
                      aria-label="Abrir fotografía 3"
                    >
                      <img
                        src={galleryImages[2] || galleryImages[0]}
                        alt={`${offer.title} amenidades`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-xl shadow-lg">
                          🔍
                        </span>
                      </div>
                    </button>

                    {/* IMAGEN 4 */}

                    <button
                      type="button"
                      onClick={() => openImageGallery(3)}
                      className="
          group
          relative
          h-[135px]
          sm:h-[170px]
          cursor-zoom-in
          overflow-hidden
          lg:h-full
        "
                      aria-label="Abrir fotografía 4"
                    >
                      <img
                        src={galleryImages[3] || galleryImages[0]}
                        alt={`${offer.title} habitación`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition duration-300 group-hover:opacity-100">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-xl shadow-lg">
                          🔍
                        </span>
                      </div>
                    </button>

                    {/* IMAGEN 5 / VER TODAS */}

                    <button
                      type="button"
                      onClick={() => openImageGallery(0)}
                      className="
          group
          relative
          h-[135px]
          sm:h-[170px]
          cursor-pointer
          overflow-hidden
          lg:h-full
        "
                      aria-label="Ver todas las fotografías"
                    >
                      <img
                        src={galleryImages[4] || galleryImages[0]}
                        alt={`${offer.title} experiencia`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 px-4 text-center transition duration-300 group-hover:bg-black/60">
                        <span className="text-2xl">📷</span>

                        <span className="mt-2 rounded-xl border border-white/50 bg-white/95 px-4 py-3 text-sm font-bold text-[#023e73] shadow-lg">
                          Ver todas las fotos
                        </span>

                        <span className="mt-2 text-xs font-semibold text-white">
                          {galleryImages.length} fotografías
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* VISOR LIGHTBOX */}

                  <Lightbox
                    open={openGallery}
                    close={() => setOpenGallery(false)}
                    index={currentImage}
                    slides={galleryImages.map((image, index) => ({
                      src: image,
                      alt: `${offer.title} fotografía ${index + 1}`,
                    }))}
                    plugins={[Zoom, Thumbnails]}
                    carousel={{
                      finite: galleryImages.length <= 1,
                    }}
                    controller={{
                      closeOnBackdropClick: true,
                    }}
                    zoom={{
                      maxZoomPixelRatio: 3,
                      zoomInMultiplier: 2,
                      doubleTapDelay: 300,
                      doubleClickDelay: 300,
                      doubleClickMaxStops: 2,
                      keyboardMoveDistance: 50,
                      wheelZoomDistanceFactor: 100,
                      pinchZoomDistanceFactor: 100,
                      scrollToZoom: true,
                    }}
                    thumbnails={{
                      position: "bottom",
                      width: 110,
                      height: 70,
                      border: 2,
                      borderRadius: 10,
                      padding: 4,
                      gap: 12,
                    }}
                    styles={{
                      container: {
                        backgroundColor: "rgba(1, 25, 48, 0.96)",
                      },
                    }}
                  />
                </>
              ) : (
                <div className="flex h-[320px] items-center justify-center rounded-3xl bg-gray-100">
                  <div className="text-center">
                    <div className="text-5xl">🏨</div>

                    <p className="mt-4 font-bold text-gray-500">
                      No hay fotografías disponibles
                    </p>
                  </div>
                </div>
              )}

              {/* DESCRIPCIÓN */}

              <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 lg:grid-cols-1 lg:gap-8">
                <article className="rounded-3xl bg-white p-5 shadow-sm sm:p-7 lg:col-span-2 lg:p-9">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                      🧳
                    </div>

                    <div>
                      <h3 className="text-3xl font-black text-[#023e73] sm:text-4xl">
                        Detalles de la oferta
                      </h3>
                    </div>
                  </div>

                  <div
                    className="prose mt-7 max-w-none text-base leading-8 text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: offer.description,
                    }}
                  />
                </article>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          {/* FECHAS DISPONIBLES */}
          {/* ========================================================= */}

          {offer.category?.name === "Paquete" ||
          offer.category?.name === "Hotel" ||
          offer.category?.name === "Vuelo" ? (
            <section
              ref={targetRef}
              className="bg-white py-14 sm:py-16 lg:py-20"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-5">
                {/* ENCABEZADO */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#0260fe]">
                      Reserva tu viaje
                    </span>

                    <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                      Fechas disponibles
                    </h2>

                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
                      Elige la fecha que mejor se adapte a tu viaje y consulta
                      el precio disponible.
                    </p>
                  </div>

                  <div className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4 sm:w-auto">
                    <p className="text-sm font-semibold text-gray-500">
                      Precio de esta oferta desde
                    </p>

                    <p className="mt-1 break-words text-2xl font-black text-[#ff6600] sm:text-3xl">
                      ${offer.price.toLocaleString("es-MX")}
                      <span className="ml-2 text-base font-semibold text-gray-500">
                        MXN
                      </span>
                    </p>
                  </div>
                </div>

                {/* AVISO */}

                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:gap-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    💡
                  </div>

                  <div>
                    <p className="font-bold text-[#023e73]">
                      Selecciona la opción que te interese
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      Al presionar “Ver oferta”, serás dirigido al proveedor
                      para consultar disponibilidad, condiciones y completar la
                      compra.
                    </p>
                  </div>
                </div>

                {/* TARJETAS */}

                <div className="mt-10 grid gap-5">
                  {offer.buyLinks?.length > 0 ? (
                    offer.buyLinks.map((item, index) => {
                      const formattedPrice = Number(
                        String(item.price || 0).replace(/,/g, ""),
                      ).toLocaleString("es-MX");

                      return (
                        <article
                          key={`${item.departureDate}-${item.returnDate}-${index}`}
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            window.open(
                              item.link,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              window.open(
                                item.link,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            }
                          }}
                          className="
    group
    cursor-pointer
    overflow-hidden
    rounded-3xl
    border
    border-gray-300
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-[#0260fe]
    hover:shadow-xl
  "
                        >
                          <div className="grid items-stretch lg:grid-cols-[1.1fr_1.1fr_0.8fr_1fr_0.8fr]">
                            {/* SALIDA */}

                            <div className="border-b border-gray-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                Salida
                              </p>

                              <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
                                  <FaPlaneDeparture />
                                </div>

                                <div>
                                  <p className="text-xl font-black text-[#023e73]">
                                    {item.departureDate}
                                  </p>

                                  {item.departureCity ? (
                                    <p className="mt-1 text-sm text-gray-500">
                                      Desde {item.departureCity}
                                    </p>
                                  ) : (
                                    <p className="mt-1 text-sm text-gray-500">
                                      Fecha de inicio
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* REGRESO */}

                            <div className="border-b border-gray-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                Regreso
                              </p>

                              <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-[#ff6600]">
                                  <FaPlaneArrival />
                                </div>

                                <div>
                                  <p className="text-xl font-black text-[#023e73]">
                                    {item.returnDate}
                                  </p>

                                  <p className="mt-1 text-sm text-gray-500">
                                    Fecha de regreso
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* ESTANCIA */}

                            <div className="border-b border-gray-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                Estancia
                              </p>

                              <div className="mt-3 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                  <MdOutlineNightsStay />
                                </div>

                                <div>
                                  <p className="text-lg font-black text-[#023e73]">
                                    {item.daysOfStay ||
                                      item.nights ||
                                      offer.daysOfStay ||
                                      "Consultar"}
                                  </p>

                                  <p className="mt-1 text-sm text-gray-500">
                                    Duración del viaje
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* PRECIO */}

                            <div className="border-b border-gray-100 p-4 sm:p-6 lg:border-b-0 lg:border-r">
                              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                Precio desde
                              </p>

                              <p className="mt-2 text-3xl font-black text-[#0260fe]">
                                ${formattedPrice}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                MXN por persona
                              </p>

                              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                Disponible
                              </div>
                            </div>

                            {/* BOTÓN */}

                            <div className="flex items-center p-4 sm:p-6">
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="
      flex
      w-full
      items-center
      justify-center
      gap-3
      rounded-xl
      bg-[#ff6600]
      px-5
      py-4
      font-bold
      text-white
      shadow-md
      transition-all
      duration-300
      hover:bg-orange-600
      hover:shadow-lg
    "
                              >
                                Ver oferta
                                <FaArrowRight />
                              </a>
                            </div>
                          </div>

                          {/* INFORMACIÓN COMPLEMENTARIA */}

                          <div className="flex flex-col items-start justify-between gap-4 border-t border-gray-100 bg-[#f8fafc] px-4 py-4 sm:px-6 lg:flex-row lg:items-center">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                              <span className="flex items-center gap-2">
                                <FaCheckCircle className="text-green-500" />
                                Precio sujeto a disponibilidad
                              </span>

                              <span className="flex items-center gap-2">
                                <FaCreditCard className="text-[#0260fe]" />
                                Consulta meses sin intereses
                              </span>

                              <span className="flex items-center gap-2">
                                <FaShieldAlt className="text-[#0260fe]" />
                                Compra con proveedor autorizado
                              </span>
                            </div>

                            {item.people ? (
                              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#023e73] shadow-sm">
                                👥 {item.people} personas
                              </span>
                            ) : null}
                          </div>
                        </article>
                      );
                    })
                  ) : (
                    <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-14 text-center">
                      <div className="text-5xl">📅</div>

                      <h3 className="mt-4 text-2xl font-black text-[#023e73]">
                        No hay fechas publicadas
                      </h3>

                      <p className="mx-auto mt-3 max-w-xl text-gray-600">
                        Comunícate con uno de nuestros asesores para consultar
                        nuevas fechas y disponibilidad.
                      </p>

                      <a
                        href="https://wa.me/529981234567"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white transition hover:bg-green-600"
                      >
                        <FaWhatsapp />
                        Consultar por WhatsApp
                      </a>
                    </div>
                  )}
                </div>

                {/* NOTA FINAL */}

                {offer.buyLinks?.length > 0 ? (
                  <div className="mt-8 rounded-2xl bg-[#023e73] p-5 text-white sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xl font-black">
                          ¿No encontraste la fecha que necesitas?
                        </p>

                        <p className="mt-2 text-sm leading-relaxed text-white/75">
                          Nuestros asesores pueden ayudarte a localizar otras
                          fechas, hoteles o ciudades de salida.
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/529984954637?text=${encodeURIComponent(
                          `✈️ Hola, me interesa la oferta: ${offer.title}.

🔗 Oferta: https://www.viajaatudestino.com/oferta/${offer.slug || offer._id}

Quiero consultar fechas y disponibilidad. 😊`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white transition hover:bg-green-600"
                      >
                        <FaWhatsapp />
                        Solicitar otra fecha
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}
          {/* ========================================================= */}
          {/* CAPTURA DE LA OFERTA DEL PROVEEDOR */}
          {/* ========================================================= */}

          <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-10">
            {/* Decoración */}

            <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />

            <div className="pointer-events-none absolute -right-28 bottom-0 h-72 w-72 rounded-full bg-orange-100/60 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              {/* ENCABEZADO */}

              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#0260fe] sm:text-sm">
                  Vista de Ejemplo
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                  Imagen de muestra
                </h2>

                <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                  Esta imagen corresponde a una vista de referencia de la oferta
                  disponible en el sitio
                </p>
              </div>

              {/* CAPTURA */}

              <div className="mx-auto mt-10 max-w-5xl">
                <div className="relative">
                  {/* Resplandor */}

                  <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-[#0260fe]/20 via-blue-100/30 to-[#ff6600]/20 blur-2xl" />

                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl sm:rounded-3xl sm:p-4">
                    {/* BARRA TIPO NAVEGADOR */}

                    <div className="mb-3 flex items-center gap-2 rounded-xl bg-[#f4f6f8] px-3 py-3 sm:px-4">
                      <div className="flex shrink-0 gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-400 sm:h-3 sm:w-3" />

                        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400 sm:h-3 sm:w-3" />

                        <span className="h-2.5 w-2.5 rounded-full bg-green-400 sm:h-3 sm:w-3" />
                      </div>

                      <div className="ml-1 min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-2 text-center text-[10px] text-gray-400 shadow-sm sm:ml-3 sm:px-4 sm:text-xs">
                        https://agencias.viajaatudestino.com
                      </div>
                    </div>

                    {/* IMAGEN */}

                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:rounded-2xl">
                      <img
                        src={offer.sampleImages}
                        alt={`Captura de la oferta de ${offer.sampleImages}`}
                        loading="lazy"
                        className="h-auto max-h-[750px] w-full object-contain"
                      />
                    </div>

                    {/* INFORMACIÓN INFERIOR */}

                    <div className="mt-3 flex flex-col gap-4 rounded-xl bg-[#f8fafc] p-4 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:px-5">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-lg">
                          ✅
                        </div>

                        <div>
                          <p className="text-sm font-black text-[#023e73]">
                            Oferta consultada directamente en la web
                          </p>

                          <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                            El precio y la disponibilidad pueden cambiar antes
                            de completar la reservación.
                          </p>
                        </div>
                      </div>

                      {offer.buyLinks?.[0]?.link ? (
                        <a
                          href={offer.buyLinks[0].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full shrink-0 items-center justify-center gap-3 rounded-xl bg-[#ff6600] px-6 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg sm:w-auto"
                        >
                          Consultar oferta
                          <FaArrowRight />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* NOTA */}

                <p className="mt-6 text-center text-xs leading-relaxed text-gray-400 sm:text-sm">
                  Imagen utilizada únicamente como referencia. Consulta el
                  precio final, los servicios incluidos y las políticas antes de
                  pagar.
                </p>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          {/* INFORMACIÓN IMPORTANTE */}
          {/* ========================================================= */}

          <section className="bg-[#f8f9fc] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-5">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                {/* ENCABEZADO */}

                <div className="lg:sticky lg:top-24">
                  <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#0260fe]">
                    Antes de reservar
                  </span>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                    Información importante
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
                    Revisa estas condiciones antes de seleccionar una fecha y
                    completar tu reservación.
                  </p>

                  <div className="mt-8 rounded-3xl bg-[#023e73] p-5 text-white shadow-lg sm:p-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                      🛡️
                    </div>

                    <h3 className="mt-5 text-2xl font-black">
                      Compra con tranquilidad
                    </h3>

                    <p className="mt-3 leading-relaxed text-white/75">
                      Verifica el precio final, las políticas de cancelación y
                      los servicios incluidos antes de realizar el pago.
                    </p>

                    <button
                      type="button"
                      onClick={scrollToTarget}
                      className="mt-7 w-full rounded-xl bg-[#ff6600] px-6 py-4 font-bold text-white transition hover:bg-orange-600"
                    >
                      Consultar fechas disponibles
                    </button>
                  </div>
                </div>

                {/* TARJETAS */}

                <div className="grid gap-5 sm:grid-cols-2">
                  {[
                    {
                      icon: "👥",
                      title: "Precio por persona",
                      description:
                        "La tarifa publicada generalmente corresponde a una persona en habitación doble.",
                    },
                    {
                      icon: "📅",
                      title: "Sujeto a disponibilidad",
                      description:
                        "Los lugares y habitaciones disponibles pueden agotarse en cualquier momento.",
                    },
                    {
                      icon: "💰",
                      title: "Cambios de precio",
                      description:
                        "Las tarifas pueden cambiar sin previo aviso hasta confirmar la reservación.",
                    },
                    {
                      icon: "📄",
                      title: "Términos y condiciones",
                      description:
                        "Cada proveedor establece sus propias condiciones de compra, cambio y cancelación.",
                    },
                    {
                      icon: "❌",
                      title: "Políticas de cancelación",
                      description:
                        "Algunas tarifas pueden ser no reembolsables o generar cargos por modificación.",
                    },
                    {
                      icon: "🪪",
                      title: "Documentación",
                      description:
                        "Las personas viajeras deberán presentar identificación y documentos vigentes.",
                    },
                    {
                      icon: "💳",
                      title: "Promociones bancarias",
                      description:
                        "Los meses sin intereses dependen del banco, la tarjeta y el proveedor participante.",
                    },
                    {
                      icon: "🧳",
                      title: "Gastos no incluidos",
                      description:
                        "No se incluyen gastos personales, propinas ni servicios no señalados expresamente.",
                    },
                  ].map((item) => (
                    <article
                      key={item.title}
                      className="group rounded-3xl border border-gray-100 bg-[#f8fafc] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-xl sm:p-6"
                    >
                      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                        {item.icon}
                      </div>

                      <h3 className="mt-5 text-xl font-black text-[#023e73]">
                        {item.title}
                      </h3>

                      <p className="mt-3 leading-relaxed text-gray-600">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          {/* CTA FINAL WHATSAPP */}
          {/* ========================================================= */}

          <section className="relative overflow-hidden bg-[#023e73] py-14 sm:py-16 lg:py-20">
            {/* DECORACIÓN */}

            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0260fe]/30 blur-3xl" />
            <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#ff6600]/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-10 lg:p-14">
                <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold uppercase tracking-wide text-orange-300">
                      Atención personalizada
                    </span>

                    <h2 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                      ¿Listo para vivir esta experiencia?
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                      Escríbenos por WhatsApp y uno de nuestros asesores te
                      ayudará a consultar fechas, disponibilidad y opciones de
                      pago.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                      {[
                        "Cotización sin compromiso",
                        "Atención personalizada",
                        "Pago seguro",
                        "Hasta 12 meses sin intereses",
                      ].map((benefit) => (
                        <div
                          key={benefit}
                          className="flex items-center gap-3 text-sm font-semibold text-white"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400/20 text-green-300">
                            ✓
                          </span>

                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-[320px]">
                    <div className="rounded-3xl bg-white p-5 shadow-xl sm:p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                        💬
                      </div>

                      <h3 className="mt-5 text-2xl font-black text-[#023e73]">
                        Habla con un asesor
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-gray-600">
                        Recibe ayuda para encontrar la mejor fecha y completar
                        tu reservación.
                      </p>

                      <a
                        href={`https://wa.me/529984954637?text=${encodeURIComponent(
                          `✈️ Hola, me interesa la oferta: ${offer.title}.

🔗 Oferta: https://www.viajaatudestino.com/oferta/${offer.slug || offer._id}

Quiero consultar fechas y disponibilidad. 😊`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-green-600 hover:shadow-lg"
                      >
                        <FaWhatsapp className="text-xl" />
                        Cotizar por WhatsApp
                      </a>

                      <button
                        type="button"
                        onClick={scrollToTarget}
                        className="mt-3 w-full rounded-xl border border-gray-200 px-6 py-4 font-bold text-[#023e73] transition hover:border-[#0260fe] hover:bg-blue-50"
                      >
                        Ver fechas disponibles
                      </button>

                      <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
                        Tarifas sujetas a disponibilidad y cambios sin previo
                        aviso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ========================================================= */}
          {/* OFERTAS RELACIONADAS */}
          {/* ========================================================= */}

          <section className="bg-[#f7f9fc] py-14 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-5">
              {/* ENCABEZADO */}

              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#ff6600]">
                    Sigue explorando
                  </span>

                  <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                    También te puede interesar
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
                    Descubre otras ofertas seleccionadas para que encuentres la
                    experiencia ideal para tu próximo viaje.
                  </p>
                </div>

                <Link
                  to="/"
                  className="inline-flex items-center gap-3 font-bold text-[#0260fe] transition hover:text-[#ff6600]"
                >
                  Ver todas las ofertas
                  <FaArrowRight />
                </Link>
              </div>

              {/* CARGANDO */}

              {loadingRelated ? (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
                    >
                      <div className="h-56 animate-pulse bg-gray-200" />

                      <div className="space-y-4 p-6">
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                        <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                        <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : relatedOffers.length > 0 ? (
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedOffers.map((relatedOffer) => {
                    const relatedId = relatedOffer._id || relatedOffer.id;

                    const relatedImage = Array.isArray(relatedOffer.image)
                      ? relatedOffer.image[0]
                      : relatedOffer.image || relatedOffer.images?.[0];

                    const relatedCategory =
                      relatedOffer.category?.name ||
                      relatedOffer.category ||
                      "Oferta de viaje";

                    const relatedDestination =
                      relatedOffer.destination?.name ||
                      relatedOffer.destination ||
                      relatedOffer.location ||
                      relatedOffer.departure ||
                      "México";

                    const formattedRelatedPrice = Number(
                      String(relatedOffer.price || 0).replace(/,/g, ""),
                    ).toLocaleString("es-MX");

                    return (
                      <Link
                        key={relatedId}
                        to={`/oferta/${relatedId}`}
                        className="group block"
                      >
                        <article className="relative h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:border-blue-200 group-hover:shadow-2xl">
                          {/* IMAGEN */}

                          <div className="relative h-56 overflow-hidden bg-gray-100">
                            {relatedImage ? (
                              <img
                                src={relatedImage}
                                alt={relatedOffer.title}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-5xl">
                                🏖️
                              </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                            {/* CATEGORÍA */}

                            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-2 text-xs font-black uppercase tracking-wide text-[#0260fe] shadow-md backdrop-blur">
                              {relatedCategory}
                            </span>

                            {/* OFERTA */}

                            <span className="absolute right-4 top-4 rounded-full bg-[#ff6600] px-3 py-2 text-xs font-black text-white shadow-md">
                              🔥 Oferta
                            </span>

                            {/* DESTINO */}

                            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-bold text-white">
                              <FaMapMarkerAlt />
                              <span>{relatedDestination}</span>
                            </div>
                          </div>

                          {/* CONTENIDO */}

                          <div className="flex h-[calc(100%-14rem)] flex-col p-5 sm:p-6">
                            <h3 className="line-clamp-2 text-xl font-black leading-snug text-[#023e73] transition group-hover:text-[#0260fe]">
                              {relatedOffer.title}
                            </h3>

                            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-600">
                              {relatedOffer.summary ||
                                "Descubre esta oferta seleccionada y encuentra la mejor opción para tu próximo viaje."}
                            </p>

                            {/* DATOS */}

                            <div className="mt-5 flex flex-wrap gap-2">
                              {relatedOffer.daysOfStay ? (
                                <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-[#0260fe]">
                                  📅 {relatedOffer.daysOfStay}
                                </span>
                              ) : null}

                              {relatedOffer.hotel ? (
                                <span className="max-w-full truncate rounded-full bg-orange-50 px-3 py-2 text-xs font-bold text-[#ff6600]">
                                  🏨 {relatedOffer.hotel}
                                </span>
                              ) : null}
                            </div>

                            {/* PRECIO */}

                            <div className="mt-auto pt-6">
                              <div className="border-t border-gray-100 pt-5">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                  Desde
                                </p>

                                <div className="mt-1 flex items-end justify-between gap-4">
                                  <div>
                                    <p className="text-3xl font-black text-[#0260fe]">
                                      ${formattedRelatedPrice}
                                    </p>

                                    <p className="mt-1 text-xs font-medium text-gray-500">
                                      MXN por persona
                                    </p>
                                  </div>

                                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff6600] text-white shadow-md transition-all duration-300 group-hover:bg-[#0260fe]">
                                    <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                /* SIN RESULTADOS */

                <div className="mt-12 rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
                  <div className="text-5xl">🌴</div>

                  <h3 className="mt-5 text-2xl font-black text-[#023e73]">
                    Sigue descubriendo nuevas ofertas
                  </h3>

                  <p className="mx-auto mt-3 max-w-xl leading-relaxed text-gray-600">
                    Por ahora no encontramos ofertas relacionadas, pero puedes
                    consultar todas nuestras promociones disponibles.
                  </p>

                  <Link
                    to="/ofertas"
                    className="mt-7 inline-flex items-center gap-3 rounded-xl bg-[#0260fe] px-6 py-4 font-bold text-white transition hover:bg-blue-700"
                  >
                    Explorar todas las ofertas
                    <FaArrowRight />
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>
        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Details;
