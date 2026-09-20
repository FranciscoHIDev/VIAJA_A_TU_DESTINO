import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaHotel,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";

// =========================================================
// CONFIGURACIÓN
// =========================================================

const SITE_URL = "https://www.viajaatudestino.com";
const WHATSAPP_NUMBER = "529984954637";

// =========================================================
// FUNCIONES NECESARIAS
// =========================================================

function formatPrice(value) {
  const number = Number(
    String(value ?? "")
      .replace(/,/g, "")
      .replace(/[^0-9.-]/g, ""),
  );

  if (!Number.isFinite(number) || number <= 0) {
    return "Consultar";
  }

  return `$${number.toLocaleString("es-MX")}`;
}

function getCategoryName(category) {
  return category?.name || category || "Oferta";
}

// =========================================================
// CARD TOP
// =========================================================

function CardTop({
  _id = "",
  title,
  summary = "",
  category = "Oferta",
  image = "",
  price = 0,
  availability = "",
  destination = "",
  departure = "",
  hotel = "",
  daysOfStay = "",
  slug = "",
}) {
  // =======================================================
  // DATOS
  // =======================================================

  const categoryName = getCategoryName(category);

  // La API puede enviar destination y hotel como texto u objeto.
  // Convertimos ambos a texto antes de renderizarlos.
  const destinationName =
    typeof destination === "object"
      ? destination?.name || ""
      : destination || "";

  const hotelName = typeof hotel === "object" ? hotel?.name || "" : hotel || "";

  const departureName =
    typeof departure === "object"
      ? departure?.name || departure?.city || ""
      : departure || "";

  const offerSlug = slug || _id;

  const cardUrl = `/oferta/${offerSlug}`;

  const offerUrl = `${SITE_URL}${cardUrl}`;

  const mainImage = Array.isArray(image) ? image[0] : image;

  const priceText = formatPrice(price);

  const isPackage =
    categoryName.toLowerCase().includes("paquete") ||
    categoryName.toLowerCase().includes("vuelo + hotel");

  const isHotel =
    categoryName.toLowerCase().includes("hotel") ||
    categoryName.toLowerCase().includes("hosped");

  const isTour =
    categoryName.toLowerCase().includes("tour") ||
    categoryName.toLowerCase().includes("experiencia");

  const whatsappMessage = `Hola, me interesa la oferta: ${title}.

Oferta: ${offerUrl}

Quiero consultar fechas y disponibilidad.`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  // =======================================================
  // COMPARTIR
  // =======================================================

  const shareOffer = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: summary || title,
          url: offerUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(offerUrl);
      alert("Enlace copiado");
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("No se pudo compartir la oferta:", error);
      }
    }
  };

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <React.Fragment>
      <article
        className="
          group
          flex h-full w-full flex-col
          md:w-[360px] md:flex-none
          overflow-hidden
          rounded-[24px]
          border border-slate-200
          bg-white
          shadow-sm
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_20px_45px_rgba(15,23,42,0.12)]
        "
      >
        {/* =================================================
            IMAGEN + TÍTULO
        ================================================== */}

        <div className="relative">
          <NavLink
            to={cardUrl}
            className="relative block h-[235px] overflow-hidden bg-slate-100 sm:h-[245px]"
          >
            {mainImage ? (
              <img
                src={mainImage}
                alt={title}
                loading="lazy"
                className="
                  h-full w-full object-cover
                  transition duration-500
                  group-hover:scale-[1.04]
                "
              />
            ) : (
              <div className="flex h-full items-center justify-center text-5xl">
                ✈️
              </div>
            )}

            {/* Gradiente para que el título siempre se lea */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Categoría */}

            <span
              className="
                absolute left-4 top-4
                rounded-full
                bg-[#ff6600]
                px-4 py-2
                text-xs font-black
                text-white
                shadow-lg
              "
            >
              {isPackage
                ? "Vuelos + Hotel"
                : isHotel
                  ? "Hotel"
                  : isTour
                    ? "Tour"
                    : categoryName}
            </span>

            {/* Destino opcional */}

            {destinationName ? (
              <div
                className="
                  absolute bottom-[72px] left-5
                  flex items-center gap-2
                  text-[10px] font-black
                  uppercase tracking-[0.18em]
                  text-white/80
                "
              >
                <FaMapMarkerAlt className="text-[#ff6600]" />
                {destinationName}
              </div>
            ) : null}

            {/* Título */}

            <h3
              className="
                absolute bottom-5 left-5 right-5
                line-clamp-2
                text-[26px] font-black
                leading-[1.05]
                tracking-tight
                text-white
              "
            >
              {title}
            </h3>
          </NavLink>

          {/* Compartir */}

          <button
            type="button"
            onClick={shareOffer}
            aria-label="Compartir oferta"
            className="
              absolute right-4 top-4 z-10
              flex h-11 w-11
              items-center justify-center
              rounded-full
              bg-white/95
              text-slate-500
              shadow-lg
              transition
              hover:bg-white
              hover:text-[#0260fe]
            "
          >
            <FaShareAlt />
          </button>
        </div>

        {/* =================================================
            INFORMACIÓN
        ================================================== */}

        <div className="flex flex-1 flex-col p-5">
          {/* Precio */}

          <div className="flex items-end justify-between gap-3">
            <div>
              <p
                className="
                  text-[10px] font-black
                  uppercase tracking-[0.16em]
                  text-slate-400
                "
              >
                Desde
              </p>

              <div className="mt-1 flex items-end gap-2">
                <p
                  className="
                    text-[34px] font-black
                    leading-none
                    tracking-tight
                    text-[#0e1734]
                  "
                >
                  {priceText}
                </p>

                {priceText !== "Consultar" ? (
                  <span className="pb-1 text-sm font-bold text-slate-400">
                    MXN
                  </span>
                ) : null}
              </div>

              {priceText !== "Consultar" ? (
                <p className="mt-1 text-xs text-slate-500">por persona</p>
              ) : null}
            </div>

            {/* MSI */}

            <span
              className="
                rounded-full
                bg-emerald-50
                px-3 py-1.5
                text-[10px] font-black
                text-emerald-700
              "
            >
              Hasta 12 MSI
            </span>
          </div>

          {/* Resumen */}

          {summary ? (
            <p
              className="
                mt-4
                line-clamp-2
                text-sm leading-6
                text-slate-600
              "
            >
              {summary}
            </p>
          ) : null}

          {/* Separador */}

          <div className="my-4 h-px bg-slate-100" />

          {/* =================================================
              DETALLES RÁPIDOS
          ================================================== */}

          <div className="space-y-3">
            {/* Hotel */}

            {hotelName ? (
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-blue-50
                    text-[#0260fe]
                  "
                >
                  <FaHotel />
                </span>

                <div className="min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Hospedaje
                  </p>

                  <p className="truncate text-sm font-bold text-slate-700">
                    {hotelName}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Salida */}

            {isPackage && departureName ? (
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-orange-50
                    text-[#ff6600]
                  "
                >
                  <FaPlaneDeparture />
                </span>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Saliendo de
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    {departureName}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Disponibilidad */}

            {availability ? (
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex h-8 w-8 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-blue-50
                    text-[#0260fe]
                  "
                >
                  <FaCalendarAlt />
                </span>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-wide text-slate-400">
                    Viaja
                  </p>

                  <p className="text-sm font-bold text-slate-700">
                    {availability}
                  </p>
                </div>
              </div>
            ) : null}

            {/* Duración */}

            {daysOfStay ? (
              <div
                className="
                  inline-flex
                  rounded-full
                  bg-slate-100
                  px-3 py-1.5
                  text-xs font-bold
                  text-slate-600
                "
              >
                {daysOfStay}
              </div>
            ) : null}
          </div>

          {/* =================================================
              BOTONES
          ================================================== */}

          <div className="mt-auto grid grid-cols-[1fr_auto] gap-2 pt-5">
            <NavLink
              to={cardUrl}
              className="
                inline-flex min-h-[48px]
                items-center justify-center gap-2
                rounded-xl
                bg-[#ff6600]
                px-5 py-3
                text-sm font-black
                text-white
                transition
                hover:bg-[#e85d04]
              "
            >
              Ver oferta
              <FaArrowRight className="text-xs" />
            </NavLink>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Consultar por WhatsApp"
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-xl
                border border-emerald-100
                bg-emerald-50
                text-xl
                text-[#148c45]
                transition
                hover:bg-[#25D366]
                hover:text-white
              "
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </article>
    </React.Fragment>
  );
}

// =========================================================
// PROPTYPES
// =========================================================

CardTop.propTypes = {
  _id: PropTypes.string,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string,

  category: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ]),

  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),

  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  availability: PropTypes.string,

  destination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
  ]),

  departure: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      city: PropTypes.string,
    }),
  ]),

  hotel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    }),
  ]),

  daysOfStay: PropTypes.string,
  slug: PropTypes.string,
};

export default CardTop;
