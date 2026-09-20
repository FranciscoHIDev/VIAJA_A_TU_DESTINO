import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import publicApi from "../../Services/publicApi";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import SEO from "../../components/SEO/SEO";

import {
  FaArrowRight,
  FaBookOpen,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaHotel,
  FaImages,
  FaMapMarkerAlt,
  FaPlaneDeparture,
  FaShareAlt,
  FaShieldAlt,
  FaTag,
  FaWhatsapp,
} from "react-icons/fa";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// ============================================================
// CONFIGURACIÓN
// ============================================================

const SITE_URL = "https://www.viajaatudestino.com";
const WHATSAPP_NUMBER = "529984954637";

// ============================================================
// INFORMACIÓN IMPORTANTE
// Igual que haces en HomeNew: los datos viven en un arreglo.
// ============================================================

const importantInfo = [
  {
    icon: "👥",
    title: "Precio por persona",
    description:
      "La tarifa publicada puede corresponder a una persona en ocupación doble.",
  },
  {
    icon: "📅",
    title: "Sujeto a disponibilidad",
    description: "Lugares, habitaciones y tarifas pueden agotarse o cambiar.",
  },
  {
    icon: "💳",
    title: "Meses sin intereses",
    description: "Dependen del banco, la tarjeta y el proveedor participante.",
  },
  {
    icon: "📄",
    title: "Políticas",
    description: "Revisa cambios, cancelaciones y condiciones antes de pagar.",
  },
  {
    icon: "🪪",
    title: "Documentación",
    description:
      "Cada viajero debe presentar documentos vigentes según el destino.",
  },
  {
    icon: "🧳",
    title: "Servicios no incluidos",
    description:
      "No se incluyen servicios que no estén señalados expresamente.",
  },
];

// ============================================================
// FUNCIONES NECESARIAS
// Solo dejamos funciones que realmente usamos varias veces.
// ============================================================

function stripHtml(value = "") {
  return String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function formatPrice(value) {
  const number = Number(
    String(value ?? "")
      .replace(/,/g, "")
      .replace(/[^0-9.-]/g, ""),
  );

  if (!Number.isFinite(number) || number <= 0) {
    return "Consultar";
  }

  return `$${number.toLocaleString("es-MX", {
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value) {
  if (!value) {
    return "Por confirmar";
  }

  const date = new Date(`${String(value).slice(0, 10)}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getOfferType(offer) {
  const category = String(
    offer?.category?.name || offer?.category || "",
  ).toLowerCase();

  if (
    category.includes("paquete") ||
    category.includes("vuelo + hotel") ||
    category.includes("vuelo y hotel")
  ) {
    return "Paquete";
  }

  if (category.includes("hotel") || category.includes("hosped")) {
    return "Hotel";
  }

  if (
    category.includes("tour") ||
    category.includes("experiencia") ||
    category.includes("excurs")
  ) {
    return "Tour";
  }

  return "Otro";
}

// ============================================================
// DETAILS
// ============================================================

export default function Details() {
  // =========================================================
  // 1. OBTENER EL SLUG DE LA URL
  // Ejemplo: /oferta/paquete-cancun
  // =========================================================

  const { slug } = useParams();

  // =========================================================
  // 2. ESTADOS
  // =========================================================

  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);

  const [relatedOffers, setRelatedOffers] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const [openGallery, setOpenGallery] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // =========================================================
  // 3. REFERENCIAS
  // Solo necesitamos una: movernos hasta las fechas.
  // =========================================================

  const datesRef = useRef(null);

  // =========================================================
  // 4. CARGAR LA OFERTA
  // =========================================================

  useEffect(() => {
    const loadOffer = async () => {
      try {
        setLoading(true);

        const response = await publicApi.get(
          `/offers/${encodeURIComponent(slug)}`,
        );

        setOffer(response.data);
      } catch (error) {
        console.error("Error al cargar la oferta:", error);
        setOffer(null);
      } finally {
        setLoading(false);
      }
    };

    loadOffer();
  }, [slug]);

  // =========================================================
  // 5. CARGAR OFERTAS RELACIONADAS
  // =========================================================

  useEffect(() => {
    if (!offer) {
      return;
    }

    const loadRelatedOffers = async () => {
      try {
        setLoadingRelated(true);

        const response = await publicApi.get("/offers");

        const allOffers = Array.isArray(response.data)
          ? response.data
          : response.data?.offers || [];

        const currentCategory = offer?.category?.name || offer?.category || "";

        const currentDestination =
          offer?.destination?.name ||
          offer?.destination ||
          offer?.location ||
          "";

        const filteredOffers = allOffers
          .filter((item) => {
            const isCurrentOffer =
              String(item?._id || item?.id) === String(offer?._id || offer?.id);

            if (isCurrentOffer) {
              return false;
            }

            const itemCategory = item?.category?.name || item?.category || "";

            const itemDestination =
              item?.destination?.name ||
              item?.destination ||
              item?.location ||
              "";

            return (
              itemCategory === currentCategory ||
              itemDestination === currentDestination
            );
          })
          .slice(0, 4);

        setRelatedOffers(filteredOffers);
      } catch (error) {
        console.error("Error al cargar ofertas relacionadas:", error);

        setRelatedOffers([]);
      } finally {
        setLoadingRelated(false);
      }
    };

    loadRelatedOffers();
  }, [offer]);

  // =========================================================
  // 6. LOADING
  // =========================================================

  if (loading) {
    return (
      <React.Fragment>
        <NavBar />

        <main className="min-h-screen bg-[#f5f7fb] px-4 py-20">
          <div className="mx-auto max-w-6xl animate-pulse">
            <div className="h-10 w-2/3 rounded-xl bg-slate-200" />
            <div className="mt-5 h-[420px] rounded-3xl bg-slate-200" />
          </div>
        </main>

        <Footer />
      </React.Fragment>
    );
  }

  // =========================================================
  // 7. ERROR
  // =========================================================

  if (!offer) {
    return (
      <React.Fragment>
        <NavBar />

        <main className="flex min-h-[70vh] items-center justify-center bg-[#f5f7fb] px-4">
          <div className="max-w-lg rounded-3xl bg-white p-8 text-center shadow-lg">
            <div className="text-5xl">✈️</div>

            <h1 className="mt-5 text-2xl font-black text-[#023e73]">
              No pudimos cargar esta oferta
            </h1>

            <p className="mt-3 text-slate-600">
              La oferta puede no estar disponible en este momento.
            </p>

            <Link
              to="/ofertas"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0260fe] px-5 py-3 font-black text-white"
            >
              Ver todas las ofertas
              <FaArrowRight />
            </Link>
          </div>
        </main>

        <Footer />
      </React.Fragment>
    );
  }

  // =========================================================
  // 8. DATOS DE LA OFERTA
  //
  // Todo se calcula aquí una sola vez.
  // Después el JSX solo muestra estos valores.
  // =========================================================

  const type = getOfferType(offer);

  const categoryName =
    offer?.category?.name || offer?.category || "Oferta de viaje";

  const destinationName =
    offer?.destination?.name || offer?.destination || offer?.location || "";

  const buyLinks = Array.isArray(offer?.buyLinks)
    ? offer.buyLinks.filter(Boolean)
    : [];

  const hasDates = buyLinks.length > 0;

  const galleryImages = Array.isArray(offer?.image)
    ? offer.image.filter(Boolean)
    : offer?.image
      ? [offer.image]
      : Array.isArray(offer?.images)
        ? offer.images.filter(Boolean)
        : [];

  const mainImage = galleryImages[0] || "";

  const priceText = formatPrice(offer?.price);

  const offerUrl = offer?.slug
    ? `${SITE_URL}/oferta/${offer.slug}`
    : `${SITE_URL}/ofertas`;

  const whatsappMessage = `✈️ Hola, me interesa esta oferta:

${offer.title}

🔗 ${offerUrl}

Quiero consultar fechas, disponibilidad y opciones de pago.`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  // =========================================================
  // 9. TEXTOS SEGÚN EL TIPO
  //
  // En lugar de crear un componente diferente para:
  // Hotel / Paquete / Tour,
  // solo cambiamos los textos necesarios.
  // =========================================================

  let badgeText = categoryName;
  let datesTitle = "Fechas disponibles";
  let buttonText = "Ver fechas disponibles";

  if (type === "Paquete") {
    badgeText = `Vuelos + Hotel${offer?.daysOfStay ? ` · ${offer.daysOfStay}` : ""}`;
  }

  if (type === "Hotel") {
    badgeText = `Hospedaje${offer?.daysOfStay ? ` · ${offer.daysOfStay}` : ""}`;

    datesTitle = "Fechas de hospedaje";
  }

  if (type === "Tour") {
    badgeText = `Tour${offer?.daysOfStay ? ` · ${offer.daysOfStay}` : ""}`;

    datesTitle = "Opciones para reservar";
    buttonText = "Ver opciones para reservar";
  }

  // =========================================================
  // 10. SEO
  // =========================================================

  const seoTitle =
    offer?.seo?.title ||
    `${offer.title}${destinationName ? ` en ${destinationName}` : ""}`;

  const seoDescription =
    offer?.seo?.description ||
    offer?.summary ||
    stripHtml(offer?.description || "").slice(0, 160);

  const seoImage = offer?.seo?.image || mainImage;

  const canonicalUrl = offer?.seo?.canonicalUrl || offerUrl;

  const socialTitle = offer?.seo?.socialTitle || seoTitle;

  const socialDescription = offer?.seo?.socialDescription || seoDescription;

  // =========================================================
  // 11. FUNCIONES DE LA PÁGINA
  // =========================================================

  const scrollToDates = () => {
    datesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openImage = (index) => {
    setCurrentImage(index);
    setOpenGallery(true);
  };

  const shareOffer = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: socialTitle,
          text: socialDescription,
          url: canonicalUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(canonicalUrl);
      alert("Enlace copiado");
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("No fue posible compartir:", error);
      }
    }
  };

  // =========================================================
  // 12. RENDER
  // =========================================================

  return (
    <React.Fragment>
      {/* =====================================================
          SEO
      ====================================================== */}

      <SEO
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        image={seoImage}
        socialTitle={socialTitle}
        socialDescription={socialDescription}
        index={offer?.seo?.index !== false}
        follow={offer?.seo?.follow !== false}
        type="website"
      />

      {/* =====================================================
          PÁGINA
      ====================================================== */}

      <div className="flex min-h-screen flex-col bg-[#f5f7fb]">
        <NavBar />

        <main className="flex-1 pb-12">
          {/* =================================================
              HERO

              Es el MISMO contenido para móvil y escritorio.
              Tailwind cambia solamente la distribución:
              - móvil: una columna
              - escritorio: dos columnas
          ================================================== */}

          <section className="bg-[#075dcc]">
            <div className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 pt-8 lg:grid-cols-[1fr_480px] lg:items-center lg:px-8 lg:pb-32 lg:pt-14">
              {/* Texto */}

              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#a64016]">
                  <FaTag />
                  {badgeText}
                </span>

                <h1 className="mt-6 text-4xl font-black leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {offer.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-2 text-white">
                  <FaCalendarAlt className="text-orange-200" />

                  <span className="font-black">
                    {offer?.availability || "Consulta fechas disponibles"}
                  </span>

                  {offer?.daysOfStay ? (
                    <React.Fragment>
                      <span className="text-white/40">·</span>

                      <span className="text-white/75">{offer.daysOfStay}</span>
                    </React.Fragment>
                  ) : null}

                  {hasDates && type !== "Hotel" ? (
                    <React.Fragment>
                      <span className="text-white/40">·</span>

                      <span className="text-white/75">
                        {buyLinks.length}{" "}
                        {buyLinks.length === 1 ? "opción" : "opciones"}
                      </span>
                    </React.Fragment>
                  ) : null}
                </div>

                {offer?.summary ? (
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/80">
                    {offer.summary}
                  </p>
                ) : null}
              </div>

              {/* Imagen */}

              <div className="overflow-hidden rounded-3xl bg-white/10 shadow-2xl">
                {mainImage ? (
                  <button
                    type="button"
                    onClick={() => openImage(0)}
                    className="relative block h-[330px] w-full text-left sm:h-[400px]"
                  >
                    <img
                      src={mainImage}
                      alt={offer.title}
                      className="h-full w-full object-cover"
                    />

                    {galleryImages.length > 1 ? (
                      <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black text-[#0260fe] shadow">
                        <FaImages />
                        {galleryImages.length} fotos
                      </span>
                    ) : null}
                  </button>
                ) : (
                  <div className="flex h-[330px] items-center justify-center text-white/70">
                    Imagen próximamente
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* =================================================
              CINTA DE ESCRITORIO

              PAQUETE:
              muestra una ruta visual Salida → Destino,
              precio y hotel incluido.

              HOTEL / TOUR:
              mantienen la cinta sencilla que ya teníamos.
          ================================================== */}

          <section className="relative z-10 -mt-20 hidden lg:block">
            <div className="mx-auto max-w-6xl px-2">
              {/* =============================================
                  PAQUETE
              ============================================== */}

              {type === "Paquete" ? (
                <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl">
                  <div className="h-1 bg-gradient-to-r from-[#0260fe] to-[#ff6600]" />

                  {/* Parte superior: ciudad de salida + tipo */}

                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black uppercase tracking-wide text-slate-400">
                        Saliendo de
                      </span>

                      <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe] px-4 py-2 text-sm font-black text-white">
                        {offer.departure}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-[#ff6600]">
                      <FaPlaneDeparture />
                      Vuelos + Hotel
                    </span>
                  </div>

                  {/* Ruta principal */}

                  <div className="grid grid-cols-[1fr_1.4fr_1fr_190px] items-center gap-5 px-6 py-2">
                    {/* Origen */}

                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        Origen
                      </p>

                      <p className="mt-1 truncate text-xl font-black text-[#023e73]">
                        {offer.departure}
                      </p>
                    </div>

                    {/* Línea de vuelo */}

                    <div className="relative flex min-h-[58px] items-center justify-center">
                      <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-slate-200" />

                      <span className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#ff6600] bg-white" />

                      <span className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#ff6600]" />

                      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-[#ff6600] shadow-sm ring-1 ring-slate-200">
                        <FaPlaneDeparture />
                      </span>

                      <span className="absolute bottom-[-20px] rounded-full bg-emerald-100 px-3 py-1  text-[10px] font-black text-emerald-700">
                        Vuelo redondo
                      </span>
                    </div>

                    {/* Destino */}

                    <div className="min-w-0 text-right">
                      <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                        Destino
                      </p>

                      <p className="mt-1 truncate text-xl font-black text-[#023e73]">
                        {destinationName || offer.title}
                      </p>

                      {offer?.availability ? (
                        <p className="mt-1 truncate text-xs font-semibold text-slate-500">
                          {offer.availability}
                        </p>
                      ) : null}
                    </div>

                    {/* Precio + botón */}

                    <div className="border-l border-slate-100 pl-6 text-right">
                      <p className="text-xs font-black uppercase text-slate-400">
                        Desde
                      </p>

                      <p className="mt-1 text-3xl font-black text-[#0260fe]">
                        {priceText}
                      </p>

                      <button
                        type="button"
                        onClick={scrollToDates}
                        className="mt-3 w-full rounded-xl bg-[#ff6600] px-4 py-2.5 text-sm font-black text-white"
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>

                  {/* Hotel incluido */}

                  {offer?.hotel ? (
                    <div className="flex items-center gap-4 border-t border-slate-100 bg-[#fffdfb] px-6 py-2">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#ff6600]">
                        <FaHotel />
                      </span>

                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                          Hotel incluido
                        </p>

                        <p className="truncate text-base font-black text-[#023e73]">
                          {offer.hotel}
                        </p>
                      </div>

                      {offer?.daysOfStay ? (
                        <span className="ml-auto rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black text-emerald-700">
                          {offer.daysOfStay}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : (
                /* =============================================
                    HOTEL / TOUR / OTRO
                ============================================== */

                <div className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl">
                  <div className="h-1 bg-gradient-to-r from-[#0260fe] to-[#ff6600]" />

                  <div className="grid grid-cols-[1fr_190px] items-center gap-6 px-6 py-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wide text-[#0260fe]">
                          {type === "Hotel"
                            ? "Tu hospedaje"
                            : type === "Tour"
                              ? "Tu experiencia"
                              : "Tu viaje"}
                        </span>

                        <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-black uppercase text-[#ff6600]">
                          {type}
                        </span>
                      </div>

                      <h2 className="mt-2 text-2xl font-black text-[#023e73]">
                        {type === "Hotel"
                          ? offer?.hotel || offer.title
                          : destinationName || offer.title}
                      </h2>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {destinationName ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-[#0260fe]">
                            <FaMapMarkerAlt />
                            {destinationName}
                          </span>
                        ) : null}

                        {offer?.daysOfStay ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                            <FaClock />
                            {offer.daysOfStay}
                          </span>
                        ) : null}

                        {offer?.availability ? (
                          <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#ff6600]">
                            <FaCalendarAlt />
                            {offer.availability}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="border-l border-slate-100 pl-6 text-right">
                      <p className="text-xs font-black uppercase text-slate-400">
                        Desde
                      </p>

                      <p className="mt-1 text-3xl font-black text-[#0260fe]">
                        {priceText}
                      </p>

                      <button
                        type="button"
                        onClick={scrollToDates}
                        className="mt-3 w-full rounded-xl bg-[#ff6600] px-4 py-2.5 text-sm font-black text-white"
                      >
                        {buttonText}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =================================================
              DETALLES + SIDEBAR

              IMPORTANTE:
              El sidebar está dentro de esta sección.

              En escritorio:
              - Se mueve normalmente al inicio.
              - Cuando llega a top-24 se queda fijo.
              - Sigue fijo mientras bajas por Detalles, Fechas,
                Galería y Vista de la oferta publicada.
              - Al terminar esta sección deja de estar fijo.

              Todo se logra con:
              lg:sticky lg:top-24

              No necesitamos JavaScript para controlar el scroll.
          ================================================== */}

          <section className="bg-[#f5f7fb] px-4 pb-14 pt-8 lg:px-8 lg:pt-12">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_370px] lg:items-start">
              {/* =================================================
                  COLUMNA PRINCIPAL
              ================================================== */}

              <div className="order-2 min-w-0 space-y-7 lg:order-1">
                {/* =============================================
                    DETALLES DE LA OFERTA
                ============================================== */}

                <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#0260fe]">
                      <FaBookOpen />
                    </span>

                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
                        Detalles de oferta
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-[#023e73] sm:text-3xl">
                        Todo lo que debes saber
                      </h2>
                    </div>
                  </div>

                  {offer?.description ? (
                    <div
                      className="prose prose-slate mt-6 max-w-none leading-7 prose-headings:text-[#023e73] prose-a:text-[#0260fe]"
                      dangerouslySetInnerHTML={{
                        __html: offer.description,
                      }}
                    />
                  ) : (
                    <p className="mt-6 leading-7 text-slate-600">
                      {offer?.summary ||
                        "Consulta la información principal de esta oferta."}
                    </p>
                  )}
                </section>

                {/* =============================================
                    FECHAS
                ============================================== */}

                <section
                  ref={datesRef}
                  className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
                >
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
                        Elige tu opción
                      </p>

                      <h2 className="mt-1 text-2xl font-black text-[#023e73]">
                        {datesTitle}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-orange-50 px-4 py-3">
                      <p className="text-[10px] font-black uppercase text-slate-400">
                        Desde
                      </p>

                      <p className="text-xl font-black text-[#ff6600]">
                        {priceText}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {hasDates ? (
                      buyLinks.map((item, index) => {
                        const departureDate = formatDate(item?.departureDate);

                        const returnDate = formatDate(item?.returnDate);

                        const stay =
                          item?.daysOfStay ||
                          item?.nights ||
                          offer?.daysOfStay ||
                          "Consultar";

                        const itemPrice = formatPrice(item?.price);

                        return (
                          <article
                            key={item?._id || `${item?.departureDate}-${index}`}
                            className="overflow-hidden rounded-2xl border border-slate-200"
                          >
                            {item?.departureCity ? (
                              <div className="bg-[#f8fbff] px-4 py-2.5 text-xs font-black text-[#023e73]">
                                <FaPlaneDeparture className="mr-2 inline text-[#0260fe]" />
                                Saliendo de {item.departureCity}
                              </div>
                            ) : null}

                            <div className="grid grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_150px_120px]">
                              <div className="p-3 sm:p-4">
                                <p className="text-[10px] font-black uppercase text-slate-400">
                                  {type === "Hotel"
                                    ? "Check in"
                                    : type === "Tour"
                                      ? "Fecha"
                                      : "Salida"}
                                </p>

                                <p className="mt-1 text-sm font-black text-[#023e73]">
                                  {departureDate}
                                </p>
                              </div>

                              <div className="border-l border-slate-100 p-3 sm:p-4">
                                <p className="text-[10px] font-black uppercase text-slate-400">
                                  {type === "Hotel" ? "Check out" : "Regreso"}
                                </p>

                                <p className="mt-1 text-sm font-black text-[#023e73]">
                                  {type === "Tour" && !item?.returnDate
                                    ? "Mismo día"
                                    : returnDate}
                                </p>
                              </div>

                              <div className="border-l border-slate-100 p-3 sm:p-4">
                                <p className="text-[10px] font-black uppercase text-slate-400">
                                  Estancia
                                </p>

                                <p className="mt-1 text-sm font-black text-[#023e73]">
                                  {stay}
                                </p>
                              </div>

                              <div className="col-span-2 border-t border-slate-100 p-3 lg:col-span-1 lg:border-l lg:border-t-0">
                                <p className="text-[10px] font-black uppercase text-slate-400">
                                  Precio
                                </p>

                                <p className="mt-1 text-lg font-black text-[#0260fe]">
                                  {itemPrice} MXN
                                </p>
                              </div>

                              <div className="col-span-1 flex items-center border-l border-t border-slate-100 p-3 lg:border-t-0">
                                {item?.link ? (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-3 py-3 text-xs font-black text-white"
                                  >
                                    Ver oferta
                                  </a>
                                ) : (
                                  <span className="text-xs text-slate-400">
                                    Por confirmar
                                  </span>
                                )}
                              </div>
                            </div>
                          </article>
                        );
                      })
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-9 text-center">
                        <FaCalendarAlt className="mx-auto text-3xl text-slate-300" />

                        <h3 className="mt-3 text-lg font-black text-[#023e73]">
                          Consulta nuevas fechas
                        </h3>

                        <p className="mt-2 text-sm text-slate-600">
                          Escríbenos y revisamos disponibilidad contigo.
                        </p>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-black text-white"
                        >
                          <FaWhatsapp />
                          Consultar por WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                </section>

                {/* =============================================
                    GALERÍA
                ============================================== */}

                {galleryImages.length > 0 ? (
                  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    {/* Encabezado */}

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <FaImages className="text-xl text-[#0260fe]" />

                        <h2 className="text-2xl font-black text-[#023e73]">
                          Fotografías
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => openImage(0)}
                        className="rounded-full bg-blue-50 px-4 py-2 text-xs font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
                      >
                        {galleryImages.length}{" "}
                        {galleryImages.length === 1 ? "foto" : "fotos"}
                      </button>
                    </div>

                    {/* =================================================
                        GALERÍA

                        1 foto:
                        ocupa todo el ancho.

                        2 fotos:
                        mitad izquierda + mitad derecha.

                        3 fotos:
                        una principal y dos imágenes apiladas.

                        4 fotos:
                        una principal, dos arriba y una grande abajo.

                        5 o más:
                        una principal + cuadrícula 2 x 2.
                    ================================================== */}

                    {galleryImages.length === 1 ? (
                      /* UNA SOLA FOTO */

                      <button
                        type="button"
                        onClick={() => openImage(0)}
                        className="group relative mt-6 block h-[300px] w-full overflow-hidden rounded-2xl sm:h-[420px]"
                      >
                        <img
                          src={galleryImages[0]}
                          alt={`${offer.title} 1`}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                        />

                        <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-[#023e73] shadow">
                          Vista principal
                        </span>
                      </button>
                    ) : (
                      /* DOS O MÁS FOTOS */

                      <div className="mt-6 grid grid-cols-2 gap-3 lg:h-[430px] lg:grid-cols-4 lg:grid-rows-2">
                        {/* FOTO PRINCIPAL */}

                        <button
                          type="button"
                          onClick={() => openImage(0)}
                          className="group relative col-span-2 h-[280px] overflow-hidden rounded-2xl lg:row-span-2 lg:h-full"
                        >
                          <img
                            src={galleryImages[0]}
                            alt={`${offer.title} 1`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                          <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-[#023e73] shadow">
                            Vista principal
                          </span>
                        </button>

                        {/* FOTOS SECUNDARIAS */}

                        {galleryImages.slice(1, 5).map((image, index) => {
                          const realIndex = index + 1;

                          const isLastVisible =
                            realIndex === Math.min(galleryImages.length - 1, 4);

                          let imageClass = "h-[150px] lg:h-full";

                          if (galleryImages.length === 2) {
                            imageClass += " col-span-2 lg:row-span-2";
                          }

                          if (galleryImages.length === 3) {
                            imageClass += " col-span-2";
                          }

                          if (galleryImages.length === 4 && realIndex === 3) {
                            imageClass += " col-span-2";
                          }

                          return (
                            <button
                              key={`${image}-${realIndex}`}
                              type="button"
                              onClick={() => openImage(realIndex)}
                              className={`group relative overflow-hidden rounded-2xl ${imageClass}`}
                            >
                              <img
                                src={image}
                                alt={`${offer.title} ${realIndex + 1}`}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />

                              <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/20" />

                              {/* En la última imagen mostramos "Ver todas" */}

                              {isLastVisible && galleryImages.length >= 4 ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#023e73]/65 p-4 text-center">
                                  <FaImages className="text-2xl text-white" />

                                  <span className="mt-3 rounded-xl bg-white px-4 py-2 text-xs font-black text-[#023e73] shadow">
                                    Ver todas las fotos
                                  </span>

                                  <span className="mt-2 text-xs font-bold text-white">
                                    {galleryImages.length} fotografías
                                  </span>
                                </div>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </section>
                ) : null}

                {/* =============================================
                    VISTA DE LA OFERTA PUBLICADA

                    Esta es la última parte dentro del grid.
                    Al terminar aquí también termina el sticky.
                ============================================== */}

                {offer?.sampleImages ? (
                  <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                    <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
                      Referencia
                    </p>

                    <h2 className="mt-1 text-2xl font-black text-[#023e73]">
                      Vista de la oferta publicada
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      Precio y disponibilidad pueden cambiar.
                    </p>

                    <img
                      src={offer.sampleImages}
                      alt={`Referencia de ${offer.title}`}
                      className="mt-6 w-full rounded-2xl border border-slate-200 object-contain"
                    />
                  </section>
                ) : null}
              </div>

              {/* =================================================
                  SIDEBAR / TARJETA DE RESERVA

                  MÓVIL:
                  aparece primero después del Hero.

                  ESCRITORIO:
                  queda a la derecha y sticky.
              ================================================== */}

              <aside
                className="
                  relative z-20 order-1 -mt-22
                  lg:sticky lg:top-24
                  lg:order-2 lg:mt-0 lg:self-start
                "
              >
                <div className="rounded-3xl border border-slate-200 bg-white shadow-xl">
                  {/* Precio */}

                  <div className="border-b border-slate-100 bg-[#f8fbff] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Precio desde
                        </p>

                        <div className="mt-1 flex items-end gap-2">
                          <p className="text-4xl font-black text-[#0260fe]">
                            {priceText}
                          </p>

                          {priceText !== "Consultar" ? (
                            <span className="pb-1 text-xs font-black text-slate-400">
                              MXN
                            </span>
                          ) : null}
                        </div>

                        {priceText !== "Consultar" ? (
                          <p className="mt-1 text-xs text-slate-500">
                            por persona
                          </p>
                        ) : null}
                      </div>

                      <span className="rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase text-[#ff6600]">
                        {type}
                      </span>
                    </div>
                  </div>

                  {/* Datos */}

                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      {destinationName ? (
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400">
                            Destino
                          </p>

                          <p className="mt-1 text-sm font-black text-[#023e73]">
                            {destinationName}
                          </p>
                        </div>
                      ) : null}

                      {offer?.daysOfStay ? (
                        <div>
                          <p className="text-[10px] font-black uppercase text-slate-400">
                            Duración
                          </p>

                          <p className="mt-1 text-sm font-black text-[#023e73]">
                            {offer.daysOfStay}
                          </p>
                        </div>
                      ) : null}

                      {offer?.hotel ? (
                        <div className="col-span-2">
                          <p className="text-[10px] font-black uppercase text-slate-400">
                            Hotel
                          </p>

                          <p className="mt-1 text-sm font-black text-[#023e73]">
                            {offer.hotel}
                          </p>
                        </div>
                      ) : null}

                      {offer?.availability ? (
                        <div className="col-span-2">
                          <p className="text-[10px] font-black uppercase text-slate-400">
                            Disponibilidad
                          </p>

                          <p className="mt-1 text-sm font-black text-[#023e73]">
                            {offer.availability}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    {/* Beneficios */}

                    <div className="my-5 h-px bg-slate-100" />

                    <div className="space-y-2 text-xs text-slate-600">
                      <p className="flex items-start gap-2">
                        <FaCheckCircle className="mt-0.5 text-emerald-500" />
                        Precio y disponibilidad se confirman al reservar.
                      </p>

                      <p className="flex items-start gap-2">
                        <FaCreditCard className="mt-0.5 text-[#0260fe]" />
                        Hasta 12 MSI según banco y proveedor.
                      </p>

                      <p className="flex items-start gap-2">
                        <FaShieldAlt className="mt-0.5 text-[#0260fe]" />
                        Revisa condiciones antes de completar el pago.
                      </p>
                    </div>

                    {/* Botones */}

                    <button
                      type="button"
                      onClick={scrollToDates}
                      className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#ff6600] px-5 py-3 text-sm font-black text-white"
                    >
                      {buttonText}
                      <FaArrowRight />
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border-2 border-[#25D366] text-sm font-black text-[#148c45]"
                    >
                      <FaWhatsapp />
                      WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={shareOffer}
                      className="mt-3 inline-flex min-h-[42px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-black text-slate-600"
                    >
                      <FaShareAlt />
                      Compartir oferta
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* =================================================
              INFORMACIÓN IMPORTANTE

              Va FUERA del grid anterior.
              Por eso el sidebar deja de estar sticky antes.
          ================================================== */}

          <section className="bg-[#f5f7fb] px-4 pb-14 lg:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-2xl font-black text-[#023e73]">
                Información importante
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {importantInfo.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl bg-[#f8fbff] p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl">{item.icon}</span>

                      <div>
                        <h3 className="font-black text-[#023e73]">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================
              OFERTAS RELACIONADAS
          ================================================== */}

          <section className="border-t border-slate-200 bg-white px-4 py-12 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#ff6600]">
                    Sigue explorando
                  </p>

                  <h2 className="mt-2 text-3xl font-black text-[#023e73]">
                    Ofertas que también pueden interesarte
                  </h2>
                </div>

                <Link
                  to="/ofertas"
                  className="hidden items-center gap-2 font-black text-[#0260fe] sm:inline-flex"
                >
                  Ver todas
                  <FaArrowRight />
                </Link>
              </div>

              {loadingRelated ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-[320px] animate-pulse rounded-2xl bg-slate-100"
                    />
                  ))}
                </div>
              ) : relatedOffers.length > 0 ? (
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedOffers.map((item) => {
                    const relatedImage = Array.isArray(item?.image)
                      ? item.image[0]
                      : item?.image || item?.images?.[0];

                    return (
                      <Link
                        key={item?.slug || item?._id}
                        to={`/oferta/${item?.slug || item?._id}`}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="h-44 bg-slate-100">
                          {relatedImage ? (
                            <img
                              src={relatedImage}
                              alt={item.title}
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>

                        <div className="p-4">
                          <h3 className="line-clamp-2 font-black text-[#023e73]">
                            {item.title}
                          </h3>

                          <p className="mt-4 text-xl font-black text-[#0260fe]">
                            {formatPrice(item?.price)}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                  <p className="font-black text-[#023e73]">
                    Consulta todas nuestras ofertas disponibles.
                  </p>

                  <Link
                    to="/ofertas"
                    className="mt-4 inline-flex rounded-xl bg-[#0260fe] px-5 py-3 font-black text-white"
                  >
                    Explorar ofertas
                  </Link>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        <Footer />

        {/* =====================================================
            LIGHTBOX / GALERÍA COMPLETA
        ====================================================== */}

        <Lightbox
          open={openGallery}
          close={() => setOpenGallery(false)}
          index={currentImage}
          slides={galleryImages.map((image, index) => ({
            src: image,
            alt: `${offer.title} fotografía ${index + 1}`,
          }))}
          plugins={[Zoom, Thumbnails]}
          controller={{
            closeOnBackdropClick: true,
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            scrollToZoom: true,
          }}
          thumbnails={{
            position: "bottom",
            width: 110,
            height: 70,
          }}
          styles={{
            container: {
              backgroundColor: "rgba(1, 25, 48, 0.96)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
