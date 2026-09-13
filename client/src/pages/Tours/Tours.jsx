import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import {
  FaArrowRight,
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
  const scrollToTours = () => {
    document.getElementById("tours-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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
                  onClick={() => {
                    document.getElementById("buscar-tour")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="inline-flex w-fit min-h-[48px] items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]"
                >
                  <FaWhatsapp aria-hidden="true" />
                  Buscar tours
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
                    Explora algunos de los destinos con más experiencias y
                    actividades para disfrutar durante tu viaje.
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
                    onClick={scrollToTours}
                    aria-label={`Ver tours en ${item.name}`}
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
                        Ver experiencias
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
                    Envíanos tu destino, fecha y número de viajeros. Te
                    ayudaremos a encontrar actividades y experiencias
                    disponibles.
                  </p>
                </div>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20información%20sobre%20tours%20y%20experiencias.%0A%0ADestino:%20%0AFecha:%20%0ANúmero%20de%20viajeros:%20"
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
                to="/hoteles/?s=1#1"
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
