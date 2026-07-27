import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCamera,
  FaCheckCircle,
  FaClock,
  FaCreditCard,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaSearch,
  FaShieldAlt,
  FaShip,
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
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const tourTypes = [
  {
    title: "Parques y atracciones",
    description:
      "Descubre parques naturales, culturales y de aventura para toda la familia.",
    icon: FaTicketAlt,
  },
  {
    title: "Tours acuáticos",
    description:
      "Snorkel, catamarán, paseos en lancha y experiencias en aguas cristalinas.",
    icon: FaWater,
  },
  {
    title: "Cultura y naturaleza",
    description:
      "Explora zonas arqueológicas, cenotes, reservas naturales y pueblos únicos.",
    icon: GiMayanPyramid,
  },
];

const destinations = [
  {
    name: "Cancún",
    description: "Tours acuáticos, parques y vida caribeña.",
    image:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Riviera Maya",
    description: "Cenotes, parques naturales y experiencias de aventura.",
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
      "Selecciona el destino, la actividad y la fecha en la que deseas realizar el tour.",
  },
  {
    number: "02",
    title: "Consulta disponibilidad",
    description:
      "Te ayudamos a revisar horarios, lugares disponibles, inclusiones y condiciones.",
  },
  {
    number: "03",
    title: "Reserva tu aventura",
    description:
      "Confirma la actividad y recibe la información necesaria para disfrutarla.",
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
      "Conoce horarios, punto de encuentro, duración y servicios incluidos.",
    icon: FaClock,
  },
  {
    title: "Reserva confiable",
    description:
      "Trabajamos con operadores y proveedores turísticos reconocidos.",
    icon: FaShieldAlt,
  },
  {
    title: "Atención personalizada",
    description:
      "Recibe orientación para elegir una actividad adecuada para tu viaje.",
    icon: FaHeadset,
  },
];

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
      block: "center",
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
    <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
      <NavBar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#023e73]">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1784166872/caqcw1fv4r0dfxrebs4j.png"
              alt="Tours y experiencias para tus vacaciones"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#012c52]/95 via-[#023e73]/75 to-[#0260fe]/20" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#023e73]/80 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0260fe]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#ff6600]/20 blur-3xl" />

          <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-center px-5 pb-32 pt-16 sm:px-6 md:min-h-[620px] md:pb-40 lg:px-8">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
                <FaSun className="text-[#ff9b4a]" />
                Tours y experiencias
              </span>

              <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Convierte tus vacaciones en una gran aventura
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Descubre parques, excursiones, catamaranes, cenotes, zonas
                arqueológicas y experiencias para disfrutar cada momento de tu
                viaje.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={scrollToTours}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                >
                  <FaSearch />
                  Explorar tours
                </button>

                <button
                  type="button"
                  onClick={scrollToQuote}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                >
                  <FaWhatsapp className="text-lg" />
                  Solicitar cotización
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-3 text-sm font-semibold text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-7">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#ff8a33]" />
                  Actividades para todas las edades
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#ff8a33]" />
                  Atención personalizada
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#ff8a33]" />
                  Reserva confiable
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COTIZADOR RÁPIDO */}
        <section
          id="cotizar-tour"
          className="relative z-20 scroll-mt-24 px-3 sm:px-5 lg:px-8"
        >
          <div className="mx-auto -mt-20 max-w-6xl rounded-[2rem] border border-white/60 bg-white p-5 shadow-2xl md:-mt-24 md:p-8">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6600]">
                  Cotizador rápido
                </span>

                <h2 className="mt-2 text-2xl font-black text-[#023e73] md:text-3xl">
                  Encuentra una experiencia para tu viaje
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Completa los datos y envía tu solicitud por WhatsApp.
                </p>
              </div>

              <span className="hidden items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-bold text-[#0260fe] md:inline-flex">
                <FaShieldAlt />
                Atención segura
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1fr_0.7fr_auto]">
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
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-[#0260fe]/10"
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
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-[#0260fe]/10"
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
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#0260fe] focus:bg-white focus:ring-4 focus:ring-[#0260fe]/10"
                  />
                </div>
              </label>

              <div className="flex items-end">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 text-sm font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-lg md:w-auto"
                >
                  <FaWhatsapp className="text-xl" />
                  Cotizar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* TIPOS DE EXPERIENCIA */}
        <section className="px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                Elige tu experiencia
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                Actividades para cada tipo de viajero
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Desde recorridos culturales hasta aventuras acuáticas y parques
                para disfrutar en familia.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {tourTypes.map((type) => {
                const Icon = type.icon;

                return (
                  <button
                    key={type.title}
                    type="button"
                    onClick={scrollToTours}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl sm:p-8"
                  >
                    <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#0260fe]/5 transition duration-500 group-hover:scale-125 group-hover:bg-[#0260fe]/10" />

                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                        <Icon className="text-2xl" />
                      </div>

                      <h3 className="mt-6 text-2xl font-black text-[#023e73]">
                        {type.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {type.description}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                        Explorar experiencias
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* DESTINOS */}
        <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                  Destinos para explorar
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Descubre experiencias en lugares increíbles
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  Encuentra actividades para complementar tus vacaciones en los
                  destinos más populares.
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToTours}
                className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3.5 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
              >
                Ver todos los tours
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination, index) => (
                <button
                  key={destination.name}
                  type="button"
                  onClick={() => {
                    setDestination(destination.name);
                    scrollToQuote();
                  }}
                  className={`group relative overflow-hidden rounded-3xl text-left shadow-lg ${
                    index === 0 || index === 3
                      ? "min-h-[370px]"
                      : "min-h-[310px]"
                  }`}
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/95 via-[#001b34]/25 to-transparent" />

                  <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur">
                    <FaMapMarkerAlt />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <h3 className="text-2xl font-black text-white sm:text-3xl">
                      {destination.name}
                    </h3>

                    <p className="mt-2 leading-7 text-white/75">
                      {destination.description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white">
                      Cotizar actividades
                      <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* TOURS DESTACADOS */}
        <section
          id="tours-disponibles"
          className="scroll-mt-24 bg-[#f4f8ff] px-4 py-16 sm:px-6 md:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  <FaCamera />
                  Experiencias favoritas
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Tours destacados para tus vacaciones
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  Consulta actividades, precios, duración, horarios e
                  inclusiones antes de realizar tu reservación.
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToQuote}
                className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-xl"
              >
                <FaSearch />
                Cotizar otro tour
              </button>
            </div>

            <div className="mt-10">
              <CardsTours />
            </div>

            <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6 text-center sm:p-8">
              <p className="font-bold leading-7 text-[#86420f]">
                Los precios, horarios y lugares disponibles están sujetos a
                cambios y disponibilidad. Algunas actividades pueden requerir
                edad mínima, condiciones físicas específicas o pago de impuestos
                y cargos adicionales.
              </p>
            </div>
          </div>
        </section>

        {/* CÓMO RESERVAR */}
        <section className="bg-[#023e73] px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                Fácil y rápido
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
                Reserva tu experiencia en tres pasos
              </h2>

              <p className="mt-5 leading-8 text-white/70">
                Revisa toda la información de la actividad antes de confirmar tu
                reservación.
              </p>
            </div>

            <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
              <div className="absolute left-[16%] right-[16%] top-10 hidden border-t-2 border-dashed border-white/15 lg:block" />

              {steps.map((step) => (
                <article
                  key={step.number}
                  className="relative rounded-3xl border border-white/10 bg-white/10 p-7 text-center backdrop-blur sm:p-8"
                >
                  <span className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ff6600] text-2xl font-black text-white shadow-xl">
                    {step.number}
                  </span>

                  <h3 className="mt-7 text-2xl font-black">{step.title}</h3>

                  <p className="mt-4 leading-7 text-white/70">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BANNER */}
        <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1800&auto=format&fit=crop"
                alt="Experiencias y actividades de aventura"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#001b34]/95 via-[#023e73]/80 to-[#0260fe]/35" />

              <div className="relative flex min-h-[430px] items-center px-7 py-14 sm:px-10 lg:px-16">
                <div className="max-w-2xl text-white">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#ff6600] px-5 py-2 text-xs font-black uppercase tracking-[0.16em]">
                    <FaCamera />
                    Momentos inolvidables
                  </span>

                  <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                    Haz que cada día de tus vacaciones cuente
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                    Complementa tu hospedaje con excursiones, recorridos y
                    actividades para conocer mejor cada destino.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={scrollToTours}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00]"
                    >
                      <FaTicketAlt />
                      Ver experiencias
                    </button>

                    <a
                      href="https://wa.me/529984954637?text=Hola,%20quiero%20información%20sobre%20tours%20y%20actividades."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                    >
                      <FaWhatsapp />
                      Hablar con un asesor
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                Disfruta con mayor confianza
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                ¿Por qué reservar tus tours con nosotros?
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Te ayudamos a conocer los detalles de cada experiencia antes de
                reservar.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article
                    key={benefit.title}
                    className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                      <Icon className="text-2xl" />
                    </div>

                    <h3 className="mt-6 text-xl font-black text-[#023e73]">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {benefit.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-white px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
            <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                  Cotización personalizada
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                  ¿No encuentras la experiencia que buscas?
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75 md:text-lg">
                  Envíanos el destino, la fecha y el número de viajeros.
                  Buscaremos actividades disponibles para tus vacaciones.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-5 text-base font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-2xl"
              >
                <FaWhatsapp className="text-2xl" />
                Cotizar un tour
              </a>
            </div>
          </div>
        </section>

        {/* ENLACE A HOTELES */}
        <section className="border-t border-slate-200 bg-[#f4f8ff] px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            ¿También necesitas hospedaje?{" "}
            <Link
              to="/hoteles"
              className="inline-flex items-center gap-2 font-black text-[#0260fe] transition hover:text-[#ff6600]"
            >
              Consulta nuestros hoteles
              <FaHotel className="text-xs" />
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Tours;
