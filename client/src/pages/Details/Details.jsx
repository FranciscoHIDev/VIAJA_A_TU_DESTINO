import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import publicApi from "../../Services/publicApi";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { MdOutlineNightsStay } from "react-icons/md";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import SEO from "../../components/SEO/SEO";

import {
  FaClock,
  FaHotel,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWhatsapp,
  FaArrowRight,
  FaShieldAlt,
  FaCreditCard,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaBookOpen,
} from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../../components/CardsBanners/Carrusel.css";

function DetailsSkeleton() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#f7f9fc]">
      <header>
        <NavBar />
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#dce5ef]">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#cbd5e1] via-[#dbe3ec] to-[#e7edf3]" />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center lg:gap-12 lg:px-10 lg:py-14">
            <div>
              <div className="h-8 w-40 animate-pulse rounded-full bg-white/70" />
              <div className="mt-6 h-12 w-[90%] animate-pulse rounded-xl bg-white/80" />
              <div className="mt-3 h-12 w-[65%] animate-pulse rounded-xl bg-white/80" />
              <div className="mt-6 h-5 w-[75%] animate-pulse rounded bg-white/60" />
              <div className="mt-3 h-5 w-[55%] animate-pulse rounded bg-white/60" />
              <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-20 animate-pulse rounded-2xl bg-white/70"
                  />
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="h-24 animate-pulse bg-blue-200" />
              <div className="space-y-4 p-5">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex justify-between gap-4">
                    <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
                    <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
                  </div>
                ))}
                <div className="h-14 animate-pulse rounded-xl bg-orange-200" />
                <div className="h-14 animate-pulse rounded-xl bg-gray-200" />
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIPCIÓN BREVE */}
        <section className="bg-[#f7f9fc] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="h-7 w-48 animate-pulse rounded-full bg-orange-100" />
              <div className="mt-5 h-10 w-72 max-w-full animate-pulse rounded bg-gray-200" />
              <div className="mt-7 space-y-4">
                <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-[94%] animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-[75%] animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </section>

        {/* FECHAS */}
        <section className="bg-white py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="h-8 w-40 animate-pulse rounded-full bg-blue-50" />
                <div className="mt-4 h-10 w-72 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 h-5 w-[520px] max-w-full animate-pulse rounded bg-gray-200" />
              </div>
              <div className="h-24 w-full animate-pulse rounded-2xl bg-orange-50 sm:w-72" />
            </div>
            <div className="mt-8 grid gap-3">
              {[1, 2].map((row) => (
                <div
                  key={row}
                  className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-gray-50 sm:h-28"
                />
              ))}
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section className="bg-[#f7f9fc] py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-5">
            <div className="h-8 w-28 animate-pulse rounded-full bg-orange-100" />
            <div className="mt-4 h-10 w-80 max-w-full animate-pulse rounded bg-gray-200" />
            <div className="mt-8 grid h-auto grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:gap-3 lg:h-[400px] lg:grid-cols-4 lg:grid-rows-2 lg:rounded-3xl">
              <div className="col-span-2 h-[230px] animate-pulse bg-gray-200 sm:h-[360px] lg:row-span-2 lg:h-full" />
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[135px] animate-pulse bg-gray-200 sm:h-[170px] lg:h-full"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}

// =========================================================
// LÓGICA DE FECHAS Y TIPO DE OFERTA
// =========================================================
// IMPORTANTE:
// La API ya usa estos nombres y los respetamos tal cual:
// item.departureDate
// item.returnDate
// item.daysOfStay
// item.nights
// item.price
// item.link
// item.departureCity
// item.people
//
// No renombramos esos campos para que sea fácil comparar este código
// con los datos que llegan desde el backend.

/**
 * Formatea una fecha para mostrarla.
 *
 * - Si llega como YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss..., la mostramos
 *   en formato legible para México.
 * - Si la API manda otro formato (por ejemplo "15/09/2026"),
 *   NO lo descartamos: mostramos exactamente el valor recibido.
 *
 * Esto evita el problema de la versión anterior, donde una fecha que
 * no fuera ISO terminaba mostrando "Por confirmar".
 */
function formatOfferDate(value) {
  if (!value) return "Por confirmar";

  const originalValue = String(value).trim();
  const match = originalValue.match(/^(\d{4})-(\d{2})-(\d{2})(?:T.*)?$/);

  // Si no es formato ISO, conservar el dato del backend.
  if (!match) return originalValue;

  const iso = `${match[1]}-${match[2]}-${match[3]}`;
  const date = new Date(`${iso}T12:00:00Z`);

  // Si por alguna razón la fecha ISO no es válida, conservar el original.
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== iso) {
    return originalValue;
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/**
 * Devuelve el tipo de oferta usando nombres claros en español.
 * Mantiene compatibilidad con categorías como:
 * Paquete, Paquetes, Hotel, Hoteles, Hospedaje, Tour, Tours.
 */
function getOfferType(offer) {
  const categoryName = String(offer?.category?.name || offer?.category || "")
    .trim()
    .toLowerCase();

  if (
    categoryName.includes("paquete") ||
    categoryName.includes("vuelo + hotel") ||
    categoryName.includes("vuelo y hotel") ||
    categoryName.includes("hotel + vuelo")
  ) {
    return "Paquete";
  }

  if (categoryName.includes("hotel") || categoryName.includes("hosped")) {
    return "Hotel";
  }

  if (
    categoryName.includes("tour") ||
    categoryName.includes("excurs") ||
    categoryName.includes("experiencia")
  ) {
    return "Tour";
  }

  return "Otro";
}

/**
 * Textos de la galería según el servicio.
 *
 * No usamos un título fijo como "Conoce tu hotel y destino" porque
 * Details.jsx sirve para diferentes productos:
 * - Paquete: normalmente combina vuelo + hospedaje.
 * - Hotel/Hospedaje: se enfoca en las instalaciones y la estancia.
 * - Tour: se enfoca en la experiencia, actividades y lugares.
 *
 * Importante: esta función SOLO cambia los textos de presentación.
 * No modifica ningún nombre ni dato que venga del backend.
 */
function getGalleryContent(offer) {
  const offerType = getOfferType(offer);

  if (offerType === "Paquete") {
    return {
      badge: "Tu viaje",
      title: "Descubre tu viaje",
      description:
        "Conoce el hospedaje, el destino y algunas de las experiencias que podrás disfrutar durante tu viaje.",
    };
  }

  if (offerType === "Hotel") {
    return {
      badge: "Tu hospedaje",
      title: "Conoce tu hospedaje",
      description:
        "Explora las instalaciones, habitaciones y espacios que podrás disfrutar durante tu estancia.",
    };
  }

  if (offerType === "Tour") {
    return {
      badge: "Tu experiencia",
      title: "Descubre esta experiencia",
      description:
        "Conoce algunos de los lugares, actividades y momentos que podrás disfrutar durante esta experiencia.",
    };
  }

  return {
    badge: "Galería",
    title: "Conoce esta oferta",
    description:
      "Descubre imágenes y detalles que te ayudarán a conocer mejor esta oferta de viaje.",
  };
}

/**
 * Obtiene el texto de estancia respetando los campos originales.
 */
function getStayText(item, offer) {
  if (item?.daysOfStay) return String(item.daysOfStay);

  if (
    item?.nights !== undefined &&
    item?.nights !== null &&
    item?.nights !== ""
  ) {
    const nights = String(item.nights).trim();

    // Si ya dice "noches", no lo duplicamos.
    if (/noche/i.test(nights)) return nights;

    // Si viene solo como número, agregamos la unidad.
    if (/^\d+$/.test(nights)) return `${nights} noches`;

    return nights;
  }

  return offer?.daysOfStay || "Consultar";
}

function getNumericPrice(value) {
  const price = Number(
    String(value ?? "")
      .replace(/,/g, "")
      .replace(/[^0-9.-]/g, "")
      .trim(),
  );
  return Number.isFinite(price) && price > 0 ? price : null;
}

function formatPrice(value) {
  const price = getNumericPrice(value);
  return price
    ? `$${price.toLocaleString("es-MX", { maximumFractionDigits: 2 })}`
    : "Consultar";
}

function safeExternalUrl(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function TravelDateOption({ item, offer, index }) {
  // Usamos directamente los nombres que vienen de la API.
  const departureDate = formatOfferDate(item?.departureDate);
  const returnDate = formatOfferDate(item?.returnDate);
  const stay = getStayText(item, offer);
  const price = getNumericPrice(item?.price);
  const href = safeExternalUrl(item?.link);

  const offerType = getOfferType(offer);
  const isPackage = offerType === "Paquete";
  const isHotel = offerType === "Hotel";
  const isTour = offerType === "Tour";

  // En tours normalmente la fecha se selecciona directamente
  // con el proveedor. Si la API sí trae fecha, la mostramos.
  const tourStartDate = item?.departureDate ? departureDate : "Elige tu fecha";

  // Para un tour de un solo día, si no hay returnDate,
  // mostramos "Mismo día". Si sí existe, respetamos el dato.
  const tourReturnDate = item?.returnDate ? returnDate : "Mismo día";

  const fields = isTour
    ? [
        {
          label: "Fecha",
          value: tourStartDate,
          Icon: FaCalendarAlt,
          color: "bg-blue-50 text-[#0260fe]",
        },
        {
          label: "Regreso",
          value: tourReturnDate,
          Icon: FaClock,
          color: "bg-orange-50 text-[#ff6600]",
        },
        {
          label: "Duración",
          value: stay,
          Icon: FaClock,
          color: "bg-purple-50 text-purple-600",
        },
      ]
    : [
        {
          // PAQUETE = Salida
          // HOTEL = Check in
          label: isHotel ? "Check in" : "Salida",
          value: departureDate,
          Icon: isPackage ? FaPlaneDeparture : FaCalendarAlt,
          color: "bg-blue-50 text-[#0260fe]",
        },
        {
          // PAQUETE = Regreso
          // HOTEL = Check out
          label: isHotel ? "Check out" : "Regreso",
          value: returnDate,
          Icon: isPackage ? FaPlaneArrival : FaCalendarAlt,
          color: "bg-orange-50 text-[#ff6600]",
        },
        {
          label: "Estancia",
          value: stay,
          Icon: MdOutlineNightsStay,
          color: "bg-purple-50 text-purple-600",
        },
      ];

  const actionLabel = isTour ? "Reservar tour" : "Ver oferta";

  return (
    <article
      aria-label={`Opción ${index + 1}`}
      className={`group relative isolate overflow-hidden rounded-2xl border bg-white transition-all duration-200 sm:rounded-3xl ${
        href
          ? "border-gray-200 shadow-sm hover:-translate-y-0.5 hover:border-[#0260fe]/40 hover:shadow-lg focus-within:border-[#0260fe] focus-within:ring-2 focus-within:ring-blue-100"
          : "border-gray-200"
      }`}
    >
      {/*
        MÓVIL:
        3 columnas principales:
        - Paquete: Salida | Regreso | Estancia
        - Hotel: Check in | Check out | Estancia
        - Tour: Fecha | Regreso | Duración

        ESCRITORIO:
        5 columnas:
        fechas/duración | precio | botón
      */}
      <div className="grid grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_0.9fr]">
        {fields.map(({ label, value, Icon, color }, fieldIndex) => (
          <div
            key={`${label}-${index}`}
            className={`min-w-0 px-2 py-4 sm:px-4 sm:py-5 lg:px-5 ${
              fieldIndex > 0 ? "border-l border-gray-100" : ""
            }`}
          >
            <div className="flex min-w-0 flex-col items-start gap-2 xl:flex-row xl:items-center">
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm sm:h-9 sm:w-9 ${color}`}
              >
                <Icon aria-hidden="true" />
              </span>

              <p className="break-words text-[10px] font-black uppercase leading-tight tracking-wide text-gray-500 sm:text-xs">
                {label}
              </p>
            </div>

            <p className="mt-2 break-words text-xs font-black leading-snug text-[#023e73] sm:text-base">
              {value || "Por confirmar"}
            </p>
          </div>
        ))}

        {/* PRECIO */}
        <div className="col-span-2 min-w-0 border-t border-gray-100 bg-[#f8fafc] px-4 py-4 sm:px-5 lg:col-span-1 lg:border-l lg:border-t-0 lg:bg-white">
          <p className="text-[10px] font-black uppercase tracking-wide text-gray-500 sm:text-xs">
            {price ? "Precio desde" : "Precio"}
          </p>

          <p className="mt-1 break-words text-xl font-black leading-tight text-[#0260fe] sm:text-2xl">
            {price ? formatPrice(price) : "Consultar"}
          </p>

          {price ? (
            <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
              MXN por persona
            </p>
          ) : null}
        </div>

        {/* BOTÓN / ENLACE */}
        <div className="col-span-1 flex min-w-0 items-center border-l border-t border-gray-100 bg-[#f8fafc] p-3 lg:col-span-1 lg:border-t-0 lg:bg-white">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${actionLabel}. Abre el sitio del proveedor en una pestaña nueva.`}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-3 py-3 text-center text-xs font-black text-white shadow-sm transition hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:text-sm after:absolute after:inset-0 after:z-10 after:rounded-2xl after:content-[''] sm:after:rounded-3xl"
            >
              <span className="relative z-20 hidden sm:inline">
                {actionLabel}
              </span>
              <span className="relative z-20 sm:hidden">Abrir</span>
              <FaArrowRight
                aria-hidden="true"
                className="relative z-20 shrink-0"
              />
            </a>
          ) : (
            <span className="text-xs font-semibold text-gray-500 sm:text-sm">
              Enlace por confirmar
            </span>
          )}
        </div>
      </div>

      {/* INFORMACIÓN COMPLEMENTARIA */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-gray-100 bg-[#fbfcfe] px-4 py-2.5 text-[11px] text-gray-500 sm:px-5 sm:text-xs">
        <span>
          {isTour
            ? "Selecciona fecha y horario al reservar"
            : "Precio sujeto a disponibilidad"}
        </span>

        {item?.departureCity ? <span>Desde {item.departureCity}</span> : null}

        {item?.people ? <span>{item.people} personas</span> : null}

        {href ? (
          <span className="ml-auto hidden font-semibold text-[#0260fe] sm:inline">
            Abre en nueva pestaña ↗
          </span>
        ) : null}
      </div>
    </article>
  );
}

function BookingSummaryCard({ offer, onViewDates }) {
  const kind = getOfferType(offer);
  const destination =
    offer?.destination?.name || offer?.destination || offer?.location || "";
  const price = formatPrice(offer?.price);
  const isTour = kind === "Tour";
  const hasDates = kind !== "Otro";

  const detailRows =
    kind === "Paquete" || kind === "Hotel"
      ? [
          {
            label: "Hotel",
            value: offer?.hotel || "Por confirmar",
            Icon: FaHotel,
          },
          {
            label: kind === "Hotel" ? "Estancia" : "Duración",
            value: offer?.daysOfStay || "Por confirmar",
            Icon: FaClock,
          },
          {
            label: "Disponibilidad",
            value: offer?.availability || "Consulta fechas",
            Icon: FaCalendarAlt,
          },
        ]
      : [
          {
            label: "Destino",
            value: destination || "Por confirmar",
            Icon: FaMapMarkerAlt,
          },
          {
            label: "Duración",
            value: offer?.daysOfStay || "Por confirmar",
            Icon: FaClock,
          },
          {
            label: "Disponibilidad",
            value:
              offer?.availability || (isTour ? "Elige tu fecha" : "Consultar"),
            Icon: FaCalendarAlt,
          },
        ];

  const whatsappUrl = `https://wa.me/529984954637?text=${encodeURIComponent(
    `Hola, me interesa la oferta: ${offer.title}.\n\nOferta: https://www.viajaatudestino.com/oferta/${offer.slug || offer._id}\n\nQuiero consultar fechas y disponibilidad.`,
  )}`;

  return (
    <aside className="w-full overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-[#012c54]/20 sm:max-w-[520px] sm:self-center lg:w-[390px] lg:max-w-none lg:shrink-0 lg:self-auto">
      <div className="bg-[#0260fe] px-5 py-4 text-center text-white">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
          Precio desde
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-center gap-x-2">
          <p className="text-3xl font-black sm:text-4xl">{price}</p>
          {getNumericPrice(offer?.price) ? (
            <p className="pb-1 text-sm text-white/85">MXN por persona</p>
          ) : null}
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <dl className="space-y-4">
          {detailRows.map(({ label, value, Icon }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <dt className="flex shrink-0 items-center gap-2 text-sm font-semibold text-gray-500">
                <Icon className="text-[#0260fe]" aria-hidden="true" />
                {label}
              </dt>
              <dd className="min-w-0 break-words text-right text-sm font-black text-[#023e73]">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="my-5 h-px bg-gray-100" />

        <div className="grid gap-2 rounded-2xl bg-[#f7f9fc] p-3 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <FaShieldAlt
              className="shrink-0 text-[#0260fe]"
              aria-hidden="true"
            />
            <span>Consulta condiciones antes de pagar</span>
          </div>
          <div className="flex items-center gap-3">
            <FaCreditCard
              className="shrink-0 text-[#0260fe]"
              aria-hidden="true"
            />
            <span>Meses sin intereses según proveedor</span>
          </div>
          <div className="flex items-center gap-3">
            <FaWhatsapp
              className="shrink-0 text-[#25D366]"
              aria-hidden="true"
            />
            <span>Soporte por WhatsApp</span>
          </div>
        </div>

        {hasDates ? (
          <button
            type="button"
            onClick={onViewDates}
            className="mt-5 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl bg-[#ff6600] px-5 py-3.5 font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {isTour ? "Ver opciones para reservar" : "Ver fechas disponibles"}
            <FaArrowRight aria-hidden="true" />
          </button>
        ) : null}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-xl border-2 border-[#25D366] px-5 py-3.5 font-black text-[#148c45] transition hover:bg-[#25D366] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
        >
          <FaWhatsapp aria-hidden="true" />
          Consultar por WhatsApp
        </a>
      </div>
    </aside>
  );
}

function Details() {
  const { slug } = useParams();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  const targetRef = useRef(null);

  const scrollToTarget = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getOffer = async () => {
      try {
        setLoading(true);
        setOffer(null);

        const { data } = await publicApi.get(`/offers/${slug}`);

        setOffer(data);
      } catch (error) {
        console.error("Error al obtener la oferta:", error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    getOffer();
  }, [slug]);

  const [openGallery, setOpenGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = Array.isArray(offer?.image)
    ? offer.image.filter(Boolean)
    : offer?.image
      ? [offer.image]
      : [];

  //SEO
  const removeHtml = (html = "") => {
    return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const destinationName =
    offer?.destination?.name || offer?.destination || offer?.location || "";

  const seoTitle = offer?.title
    ? `${offer.title}${destinationName ? ` en ${destinationName}` : ""}`
    : "Ofertas de Viajes";

  const seoDescription = (
    offer?.summary ||
    removeHtml(offer?.description || "") ||
    "Descubre esta oferta de viaje con Viaja a tu Destino."
  )
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 155);

  const seoImage = galleryImages[0] || "";

  const seoUrl = offer?.slug
    ? `https://www.viajaatudestino.com/oferta/${offer.slug}`
    : offer?._id
      ? `https://www.viajaatudestino.com/oferta/${offer._id}`
      : "https://www.viajaatudestino.com/";

  const kind = getOfferType(offer);
  const galleryInfo = getGalleryContent(offer);
  const hasTravelOptions =
    ["Paquete", "Hotel", "Tour"].includes(kind) ||
    (Array.isArray(offer?.buyLinks) && offer.buyLinks.length > 0);
  //GALERIA

  const openImageGallery = (index = 0) => {
    if (!galleryImages.length) return;

    setCurrentImage(index);
    setOpenGallery(true);
  };

  const [relatedOffers, setRelatedOffers] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  useEffect(() => {
    const getRelatedOffers = async () => {
      const currentOfferId = offer?._id || offer?.id;
      if (!currentOfferId) {
        setRelatedOffers([]);
        setLoadingRelated(false);
        return;
      }

      try {
        setLoadingRelated(true);

        /*
         * Cambia "/api/offers" únicamente si tu endpoint
         * para obtener todas las ofertas es diferente.
         */
        const response = await publicApi.get("/offers");

        const offersData = Array.isArray(response.data)
          ? response.data
          : response.data?.offers || [];

        const currentCategory = offer.category?.name || offer.category || "";

        const currentDestination =
          offer.destination?.name || offer.destination || offer.location || "";

        const filteredOffers = offersData
          .filter((relatedOffer) => {
            const relatedId = relatedOffer._id || relatedOffer.id;

            if (String(relatedId) === String(currentOfferId)) {
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

  if (loading) {
    return <DetailsSkeleton />;
  }

  if (!offer) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f7f9fc]">
        <header>
          <NavBar />
        </header>

        <main className="flex flex-1 items-center justify-center px-4 py-20">
          <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-xl sm:p-10">
            <div className="text-5xl">✈️</div>

            <h1 className="mt-5 text-2xl font-black text-[#023e73] sm:text-3xl">
              No pudimos cargar esta oferta
            </h1>

            <p className="mt-3 leading-relaxed text-gray-600">
              La oferta puede no estar disponible en este momento. Intenta
              nuevamente o consulta nuestras promociones disponibles.
            </p>

            <Link
              to="/ofertas"
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-[#0260fe] px-6 py-4 font-bold text-white transition hover:bg-blue-700"
            >
              Ver todas las ofertas
              <FaArrowRight />
            </Link>
          </div>
        </main>

        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    );
  }

  return (
    <React.Fragment>
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={seoUrl}
      />

      <div className="min-h-screen flex flex-col overflow-x-hidden">
        <header>
          <NavBar />
        </header>

        <main className="flex-1 pb-24 lg:pb-0">
          <section className="relative isolate overflow-hidden bg-[#022B57]">
            {galleryImages[0] ? (
              <img
                src={galleryImages[0]}
                alt={offer.title}
                className="absolute inset-0 h-full w-full object-cover"
                fetchPriority="high"
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-r from-[#012c54]/95 via-[#012c54]/82 to-[#012c54]/55 lg:to-[#012c54]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#012c54]/55 via-transparent to-transparent" />

            <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:min-h-[560px] lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center lg:gap-12 lg:px-10 lg:py-14">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    to="/ofertas"
                    className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white/90 backdrop-blur transition hover:bg-white/20 sm:text-sm"
                  >
                    ← Todas las ofertas
                  </Link>
                  <span className="inline-flex rounded-full bg-[#ff6600] px-3 py-2 text-xs font-black uppercase tracking-wide text-white shadow-lg sm:text-sm">
                    {offer?.category?.name ||
                      offer?.category ||
                      "Oferta de viaje"}
                  </span>
                </div>

                <h1 className="mt-6 break-words text-3xl font-black leading-[1.08] text-white sm:text-4xl lg:text-5xl xl:text-6xl">
                  {offer.title}
                </h1>

                {offer.summary ? (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
                    {offer.summary}
                  </p>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/90 sm:text-base">
                  {destinationName ? (
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt
                        className="text-[#ff8a3d]"
                        aria-hidden="true"
                      />
                      <span>{destinationName}</span>
                    </div>
                  ) : null}
                  {offer.daysOfStay ? (
                    <div className="flex items-center gap-2">
                      <FaClock className="text-[#ff8a3d]" aria-hidden="true" />
                      <span>{offer.daysOfStay}</span>
                    </div>
                  ) : null}
                </div>

                <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/65">
                      Pago
                    </p>
                    <p className="mt-1 text-lg font-black">Hasta 12 MSI*</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/65">
                      Asistencia
                    </p>
                    <p className="mt-1 text-lg font-black">Por WhatsApp</p>
                  </div>
                  <div className="col-span-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur sm:col-span-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/65">
                      Reserva
                    </p>
                    <p className="mt-1 text-lg font-black">En línea</p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-white/55">
                  *Sujeto a banco, proveedor y condiciones aplicables.
                </p>
              </div>

              <BookingSummaryCard offer={offer} onViewDates={scrollToTarget} />
            </div>
          </section>
          {/* ========================================================= */}
          {/* DESCRIPCIÓN BREVE DE LA OFERTA */}
          {/* ========================================================= */}

          <section className="bg-[#f7f9fc] py-12 sm:py-16 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-5">
              <article className="mx-auto w-full max-w-6xl rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10 xl:p-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#ff6600] sm:h-12 sm:w-12">
                    <FaBookOpen aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-[#ff6600]">
                      Lo esencial
                    </span>
                    <h2 className="mt-1 text-2xl font-black text-[#023e73] sm:text-3xl lg:text-4xl">
                      Descripción de la oferta
                    </h2>
                  </div>
                </div>

                {offer.description ? (
                  <div
                    className="prose prose-slate mt-6 max-w-none text-base leading-8 text-gray-700 prose-a:font-bold prose-a:text-[#0260fe] prose-a:no-underline hover:prose-a:text-[#ff6600] prose-strong:text-[#1f2937] sm:text-lg"
                    dangerouslySetInnerHTML={{ __html: offer.description }}
                  />
                ) : offer.summary ? (
                  <p className="mt-6 text-base leading-8 text-gray-700 sm:text-lg">
                    {offer.summary}
                  </p>
                ) : (
                  <p className="mt-6 text-base leading-8 text-gray-600 sm:text-lg">
                    Consulta los datos principales de esta promoción y revisa
                    las fechas disponibles para elegir la opción que mejor se
                    adapte a tu viaje.
                  </p>
                )}
              </article>
            </div>
          </section>

          {/* ========================================================= */}
          {/* FECHAS DISPONIBLES */}
          {/* ========================================================= */}

          {hasTravelOptions ? (
            <section
              ref={targetRef}
              className="scroll-mt-24 bg-white py-12 sm:py-16 lg:py-20"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-5">
                {/* ENCABEZADO */}

                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#0260fe]">
                      Reserva tu viaje
                    </span>

                    <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                      {kind === "Tour"
                        ? "Reserva tu experiencia"
                        : kind === "Hotel"
                          ? "Fechas disponibles de hospedaje"
                          : "Fechas disponibles"}
                    </h2>

                    <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
                      {kind === "Tour"
                        ? "Elige una opción y selecciona tu fecha con el proveedor al reservar."
                        : kind === "Hotel"
                          ? "Compara check in, check out, estancia y precio antes de abrir la tarifa del proveedor."
                          : "Compara salida, regreso, estancia y precio antes de abrir la tarifa del proveedor."}
                    </p>
                  </div>

                  <div className="w-full rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4 sm:w-auto">
                    <p className="text-sm font-semibold text-gray-500">
                      Precio de esta oferta desde
                    </p>

                    <p className="mt-1 break-words text-2xl font-black text-[#ff6600] sm:text-3xl">
                      {formatPrice(offer.price)}
                      <span className="ml-2 text-base font-semibold text-gray-500">
                        MXN
                      </span>
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-gray-600">
                  Toca cualquier parte de la tarjeta para abrir el sitio del
                  proveedor en una ventana o pestaña nueva. Ahí confirmarás
                  disponibilidad y completarás tu reserva.
                </p>

                <div className="mt-6 grid gap-3">
                  {Array.isArray(offer.buyLinks) &&
                  offer.buyLinks.length > 0 ? (
                    offer.buyLinks
                      .filter(Boolean)
                      .map((item, index) => (
                        <TravelDateOption
                          key={
                            item._id ||
                            `${item.departureDate}-${item.returnDate}-${index}`
                          }
                          item={item}
                          offer={offer}
                          index={index}
                        />
                      ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                      <h3 className="text-xl font-bold text-[#023e73]">
                        No hay fechas publicadas
                      </h3>
                      <p className="mt-2 text-gray-600">
                        Consulta nuevas fechas con nuestros asesores.
                      </p>
                      <a
                        href="https://wa.me/529984954637"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#023e73] px-4 py-3 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        <FaWhatsapp aria-hidden="true" /> Consultar por WhatsApp
                      </a>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  Precios sujetos a disponibilidad y cambios. Consulta
                  condiciones y meses sin intereses con el proveedor.
                </p>

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
          {/* PRESENTACIÓN DE LA OFERTA */}
          {/* ========================================================= */}

          <section className="bg-[#f7f9fc] py-14 sm:py-16 lg:pb-20 lg:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-5">
              <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-bold uppercase tracking-wide text-[#ff6600]">
                    {galleryInfo.badge}
                  </span>
                  <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                    {galleryInfo.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
                    {galleryInfo.description}
                  </p>
                </div>
              </div>

              {/* GALERÍA DE IMÁGENES */}
              {/* ========================================================= */}

              {galleryImages.length > 0 ? (
                <>
                  <div className="grid h-auto grid-cols-2 gap-2 overflow-hidden rounded-2xl sm:gap-3 lg:h-[400px] lg:grid-cols-4 lg:grid-rows-2 lg:rounded-3xl">
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
                        alt={`${offer.title} fotografía 2`}
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
                        alt={`${offer.title} fotografía 3`}
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
                        alt={`${offer.title} fotografía 4`}
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
                        alt={`${offer.title} fotografía 5`}
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
            </div>
          </section>
          {/* ========================================================= */}
          {/* CAPTURA DE LA OFERTA DEL PROVEEDOR */}
          {/* ========================================================= */}

          {offer.sampleImages ? (
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
                    Esta imagen corresponde a una vista de referencia de la
                    oferta disponible en el sitio
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
                          alt={`Captura de la oferta ${offer.title} en ${destinationName}`}
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
                    precio final, los servicios incluidos y las políticas antes
                    de pagar.
                  </p>
                </div>
              </div>
            </section>
          ) : null}
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
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
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
                  to="/ofertas"
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
                    const relatedId =
                      relatedOffer.slug || relatedOffer._id || relatedOffer.id;

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

        {getOfferType(offer) !== "Otro" ? (
          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-3 py-2 shadow-[0_-8px_30px_rgba(2,43,87,0.12)] backdrop-blur lg:hidden [padding-bottom:max(0.5rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex max-w-xl items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                  Desde
                </p>
                <p className="truncate text-lg font-black text-[#0260fe]">
                  {formatPrice(offer.price)}
                </p>
              </div>
              <a
                href={`https://wa.me/529984954637?text=${encodeURIComponent(
                  `Hola, me interesa la oferta: ${offer.title}.\n\nOferta: https://www.viajaatudestino.com/oferta/${offer.slug || offer._id}\n\nQuiero consultar fechas y disponibilidad.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar por WhatsApp"
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#25D366]/30 bg-green-50 text-xl text-[#148c45]"
              >
                <FaWhatsapp aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={scrollToTarget}
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-4 py-3 text-sm font-black text-white shadow-md"
              >
                {getOfferType(offer) === "Tour" ? "Reservar" : "Ver fechas"}
                <FaArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}

        <footer className="w-full">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Details;
