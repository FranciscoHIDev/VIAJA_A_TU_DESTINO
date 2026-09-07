import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCamera,
  FaCheck,
  FaClock,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaSun,
  FaTicketAlt,
  FaUmbrellaBeach,
  FaUsers,
  FaWhatsapp,
  FaWater,
} from "react-icons/fa";
import { GiMayanPyramid } from "react-icons/gi";

import CardsTours from "../../components/CardsTours/CardsTours";
import PriceResWidget from "../../components/PriceRes/PriceResWidget";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

/* =========================================================
   DATOS
========================================================= */

const tourTypes = [
  {
    title: "Parques y atracciones",
    description:
      "Parques naturales, culturales y de aventura para disfrutar en familia.",
    icon: FaTicketAlt,
    className: "bg-orange-50 text-[#ff6600]",
  },
  {
    title: "Tours acuáticos",
    description:
      "Catamarán, snorkel, paseos en lancha y experiencias frente al mar.",
    icon: FaWater,
    className: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Cultura y naturaleza",
    description:
      "Zonas arqueológicas, cenotes, reservas naturales y recorridos únicos.",
    icon: GiMayanPyramid,
    className: "bg-blue-50 text-[#0260fe]",
  },
];

const destinations = [
  {
    name: "Cancún",
    description: "Tours acuáticos, parques y experiencias caribeñas.",
    image:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Riviera Maya",
    description: "Cenotes, parques naturales y actividades de aventura.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Isla Mujeres",
    description: "Catamarán, snorkel y playas de aguas turquesa.",
    image:
      "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Tulum",
    description: "Historia maya, playas y reservas naturales.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Cozumel",
    description: "Arrecifes, buceo y actividades frente al mar.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Bacalar",
    description: "Laguna, kayak y paisajes inolvidables.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  },
];

const steps = [
  {
    number: "01",
    title: "Elige tu experiencia",
    description:
      "Selecciona destino, actividad y la fecha en la que quieres realizarla.",
  },
  {
    number: "02",
    title: "Revisa los detalles",
    description:
      "Consulta horarios, duración, punto de encuentro, inclusiones y disponibilidad.",
  },
  {
    number: "03",
    title: "Reserva tu aventura",
    description:
      "Elige la opción que prefieras y completa la reservación con el proveedor.",
  },
];

const benefits = [
  {
    title: "Experiencias seleccionadas",
    description:
      "Encuentra actividades para familias, parejas, grupos y viajeros aventureros.",
    icon: FaStar,
  },
  {
    title: "Información clara",
    description:
      "Consulta duración, horarios, punto de encuentro e inclusiones antes de reservar.",
    icon: FaClock,
  },
  {
    title: "Reserva informada",
    description:
      "Revisa condiciones, disponibilidad y restricciones antes de completar tu compra.",
    icon: FaShieldAlt,
  },
  {
    title: "Atención personalizada",
    description:
      "Si necesitas orientación, nuestros asesores pueden ayudarte a elegir una experiencia.",
    icon: FaHeadset,
  },
];

const heroHighlights = [
  "Parques y excursiones",
  "Experiencias acuáticas",
  "Actividades para todas las edades",
];

function SmallCheck({ children }) {
  return (
    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-600">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
        <FaCheck className="text-[10px]" aria-hidden="true" />
      </span>
      <span>{children}</span>
    </div>
  );
}

function Tours() {
  const [destination, setDestination] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState("");

  const scrollToTours = () => {
    document.getElementById("tours-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToQuote = () => {
    document.getElementById("cotizar-tour")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const whatsappUrl = useMemo(() => {
    const message = `Hola, quiero cotizar un tour.

Destino: ${destination || "Por definir"}
Fecha: ${travelDate || "Por definir"}
Número de viajeros: ${travelers || "Por definir"}

Quiero conocer las actividades disponibles, precios e inclusiones.`;

    return `https://wa.me/529984954637?text=${encodeURIComponent(message)}`;
  }, [destination, travelDate, travelers]);

  return (
    <React.Fragment>
      <SEO
        title="Tours en Cancún, Riviera Maya e Isla Mujeres"
        description="Reserva tours y experiencias en Cancún, Riviera Maya e Isla Mujeres. Encuentra Xcaret, Xel-Há, catamaranes y actividades para tus vacaciones."
        image="https://www.viajaatudestino.com/IMAGEN-TOURS.jpg"
        url="https://www.viajaatudestino.com/tours"
      />

      <div className="flex min-h-screen flex-col bg-[#f5f8fc]">
        <NavBar />

        <main className="flex-1">
          {/* =====================================================
              PRICERES: CARRUSEL + MOTOR
              Primer bloque después del NavBar.
          ====================================================== */}
          <section id="buscar-tour" className="scroll-mt-24 bg-white">
            <PriceResWidget
              showCarousel
              title="Buscar tours, hoteles, paquetes, vuelos y experiencias"
            />
          </section>

          {/* =====================================================
              TOURS DESTACADOS
          ====================================================== */}
          <section
            id="tours-disponibles"
            className="scroll-mt-24 bg-[#f5f8fc] px-4 py-14 sm:px-6 md:py-20 lg:px-8"
          >
            <div className="mx-auto max-w-[1500px]">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-[#e85d00]">
                    <FaCamera aria-hidden="true" />
                    Experiencias destacadas
                  </span>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                    Tours para disfrutar tu destino
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                    Explora las opciones disponibles y entra a cada experiencia
                    para revisar duración, inclusiones, precio y forma de
                    reserva.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex w-fit min-h-[48px] items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]"
                >
                  <FaWhatsapp aria-hidden="true" />
                  Cotizar otro tour
                </button>
              </div>

              <div className="mt-9">
                <CardsTours />
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4 text-sm leading-6 text-[#7a451c] sm:px-5">
                <span className="mt-0.5 text-base" aria-hidden="true">
                  ℹ️
                </span>

                <p>
                  Los precios, horarios y espacios están sujetos a
                  disponibilidad. Algunas actividades pueden tener restricciones
                  de edad, salud, transportación, impuestos o cargos
                  adicionales. Revisa los detalles antes de reservar.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              COTIZADOR RÁPIDO
              Conserva la lógica original:
              destino + fecha + viajeros -> WhatsApp.
          ====================================================== */}
          <section
            id="cotizar-tour"
            className="scroll-mt-24 border-y border-slate-100 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
          >
            <div className="mx-auto max-w-[1400px]">
              <div className="mx-auto mb-8 max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#0260fe]">
                  <FaWhatsapp aria-hidden="true" />
                  Cotizador rápido
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                  ¿Qué experiencia estás buscando?
                </h2>

                <p className="mt-3 text-base leading-7 text-slate-600 sm:text-lg">
                  Indica destino, fecha y número de viajeros. Te ayudamos a
                  consultar actividades disponibles.
                </p>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-[#f8fbff] p-4 shadow-[0_18px_50px_rgba(2,62,115,0.08)] sm:p-6">
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_0.7fr_auto]">
                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Destino
                    </span>

                    <div className="relative">
                      <FaMapMarkerAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0260fe]" />

                      <input
                        type="text"
                        value={destination}
                        onChange={(event) => setDestination(event.target.value)}
                        placeholder="Ej. Cancún"
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-[#0260fe]/10"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Fecha
                    </span>

                    <div className="relative">
                      <FaCalendarAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0260fe]" />

                      <input
                        type="date"
                        value={travelDate}
                        onChange={(event) => setTravelDate(event.target.value)}
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-[#0260fe]/10"
                      />
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-sm font-bold text-slate-700">
                      Viajeros
                    </span>

                    <div className="relative">
                      <FaUsers className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0260fe]" />

                      <input
                        type="number"
                        min="1"
                        value={travelers}
                        onChange={(event) => setTravelers(event.target.value)}
                        placeholder="2"
                        className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:ring-4 focus:ring-[#0260fe]/10"
                      />
                    </div>
                  </label>

                  <div className="flex items-end">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] md:w-auto"
                    >
                      <FaWhatsapp className="text-xl" aria-hidden="true" />
                      Cotizar
                    </a>
                  </div>
                </div>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500 sm:text-sm">
                  Te enviaremos a WhatsApp con estos datos para consultar
                  opciones, precios y disponibilidad.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              TIPOS DE EXPERIENCIA
          ====================================================== */}
          <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  Elige tu experiencia
                </span>

                <h2 className="mt-3 text-3xl font-black text-[#023e73] sm:text-4xl">
                  Una aventura para cada tipo de viajero
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Explora experiencias según el tipo de actividad que quieres
                  vivir.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {tourTypes.map((type) => {
                  const Icon = type.icon;

                  return (
                    <button
                      key={type.title}
                      type="button"
                      onClick={scrollToTours}
                      className="group flex min-h-[150px] items-start gap-4 rounded-3xl border border-slate-200 bg-[#fbfdff] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#0260fe]/25 hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:p-6"
                    >
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl ${type.className}`}
                      >
                        <Icon aria-hidden="true" />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-lg font-black text-[#023e73] sm:text-xl">
                          {type.title}
                        </span>

                        <span className="mt-1.5 block text-sm leading-6 text-slate-600">
                          {type.description}
                        </span>

                        <span className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                          Ver experiencias
                          <FaArrowRight
                            className="text-xs transition group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              DESTINOS
          ====================================================== */}
          <section className="bg-[#f5f8fc] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                    Destinos para explorar
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                    Descubre qué hacer durante tu viaje
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                    Selecciona un destino para preparar una consulta de
                    actividades.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToTours}
                  className="hidden min-h-[48px] w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:inline-flex"
                >
                  Ver todos los tours
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setDestination(item.name);
                      setTimeout(scrollToQuote, 0);
                    }}
                    aria-label={`Cotizar tours en ${item.name}`}
                    className="group relative min-h-[285px] overflow-hidden rounded-3xl bg-[#023e73] text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]"
                  >
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/95 via-[#001b34]/30 to-transparent" />

                    <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur">
                      <FaMapMarkerAlt aria-hidden="true" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-2xl font-black text-white">
                        {item.name}
                      </h3>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                        {item.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white">
                        Cotizar actividades
                        <FaArrowRight
                          className="text-xs transition group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              CÓMO FUNCIONA
          ====================================================== */}
          <section className="bg-[#023e73] px-4 py-14 text-white sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                  Fácil y claro
                </span>

                <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                  Reserva tu experiencia en 3 pasos
                </h2>

                <p className="mt-4 leading-7 text-white/70">
                  Explora, revisa la información y reserva cuando encuentres la
                  actividad adecuada.
                </p>
              </div>

              <div className="relative mt-10 grid gap-4 lg:grid-cols-3">
                <div className="absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-white/20 lg:block" />

                {steps.map((step) => (
                  <article
                    key={step.number}
                    className="relative rounded-3xl border border-white/10 bg-white/[0.07] p-6 text-center backdrop-blur sm:p-7"
                  >
                    <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff6600] text-xl font-black text-white shadow-lg">
                      {step.number}
                    </span>

                    <h3 className="mt-5 text-xl font-black">{step.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              BENEFICIOS
          ====================================================== */}
          <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                    Antes de reservar
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                    Conoce la experiencia antes de elegir
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                    Revisa duración, horario, punto de encuentro, restricciones,
                    transportación, inclusiones y precio final antes de
                    reservar.
                  </p>

                  <button
                    type="button"
                    onClick={scrollToTours}
                    className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-2xl bg-[#023e73] px-7 py-4 text-sm font-black text-white transition hover:bg-[#0260fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023e73]"
                  >
                    <FaTicketAlt aria-hidden="true" />
                    Explorar experiencias
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <article
                        key={benefit.title}
                        className="rounded-3xl border border-slate-200 bg-[#f8fbff] p-6"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-xl text-[#0260fe]">
                          <Icon aria-hidden="true" />
                        </div>

                        <h3 className="mt-5 text-lg font-black text-[#023e73]">
                          {benefit.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {benefit.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* =====================================================
              CTA FINAL
          ====================================================== */}
          <section className="bg-white px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] p-7 text-white shadow-xl sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

              <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                    ¿No encuentras lo que buscas?
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    Te ayudamos a encontrar una experiencia
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                    Envíanos destino, fecha y número de viajeros para ayudarte a
                    consultar actividades disponibles.
                  </p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[54px] flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  Cotizar un tour
                </a>
              </div>
            </div>
          </section>

          {/* =====================================================
              NAVEGACIÓN ALTERNATIVA
          ====================================================== */}
          <section className="border-t border-slate-200 bg-[#f5f8fc] px-4 py-7 text-center">
            <p className="text-sm text-slate-500">
              ¿También necesitas hospedaje?{" "}
              <Link
                to="/hoteles"
                className="inline-flex items-center gap-1.5 font-black text-[#0260fe] transition hover:text-[#ff6600] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0260fe]"
              >
                Consulta nuestros hoteles
                <FaHotel className="text-xs" aria-hidden="true" />
              </Link>
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Tours;
