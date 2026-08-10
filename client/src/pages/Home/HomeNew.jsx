import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCreditCard,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaPlane,
  FaShieldAlt,
  FaSuitcase,
  FaUmbrellaBeach,
  FaWhatsapp,
} from "react-icons/fa";

import { GiMayanPyramid } from "react-icons/gi";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOferts from "../../components/CardsOferts/CardsOferts";

/* =========================================================
   CATEGORÍAS
========================================================= */

const categories = [
  {
    title: "Paquetes",
    description: "Encuentra opciones de vuelo y hotel en una sola reservación.",
    path: "/paquetes",
    icon: FaSuitcase,
  },
  {
    title: "Hoteles",
    description: "Resorts, hoteles Todo Incluido y opciones para cada viaje.",
    path: "/hoteles",
    icon: FaHotel,
  },
  {
    title: "Tours",
    description: "Descubre actividades, parques y experiencias inolvidables.",
    path: "/tours",
    icon: GiMayanPyramid,
  },
];

/* =========================================================
   PASOS
========================================================= */

const steps = [
  {
    number: "01",
    title: "Cuéntanos tu viaje",
    description:
      "Indícanos tu destino, fechas, ciudad de salida y número de viajeros.",
  },
  {
    number: "02",
    title: "Cazamos ofertas",
    description:
      "Buscamos opciones de hoteles, vuelos y paquetes para tu presupuesto.",
  },
  {
    number: "03",
    title: "Elige y reserva",
    description:
      "Selecciona la alternativa que más te convenga y confirma tu viaje.",
  },
];

/* =========================================================
   BENEFICIOS
========================================================= */

const benefits = [
  {
    title: "Ofertas seleccionadas",
    description:
      "Buscamos promociones y tarifas especiales para ayudarte a viajar más.",
    icon: FaBolt,
  },
  {
    title: "Pagos flexibles",
    description:
      "Encuentra promociones con meses sin intereses y diferentes formas de pago.",
    icon: FaCreditCard,
  },
  {
    title: "Atención personalizada",
    description:
      "Recibe acompañamiento para resolver dudas antes y después de reservar.",
    icon: FaHeadset,
  },
  {
    title: "Reserva confiable",
    description:
      "Trabajamos con proveedores y plataformas turísticas reconocidas.",
    icon: FaShieldAlt,
  },
];

/* =========================================================
   DESTINOS
========================================================= */

const featuredDestinations = [
  {
    name: "Cancún",
    description: "Playas, hoteles Todo Incluido y diversión.",
    icon: FaUmbrellaBeach,
    gradient: "from-cyan-500 to-[#0260fe]",
  },
  {
    name: "Riviera Maya",
    description: "Resorts, naturaleza y experiencias únicas.",
    icon: GiMayanPyramid,
    gradient: "from-emerald-500 to-teal-700",
  },
  {
    name: "Huatulco",
    description: "Bahías, tranquilidad y vacaciones familiares.",
    icon: FaMapMarkerAlt,
    gradient: "from-orange-500 to-[#ff6600]",
  },
  {
    name: "Los Cabos",
    description: "Paisajes, mar y hoteles de gran nivel.",
    icon: FaPlane,
    gradient: "from-violet-500 to-[#0260fe]",
  },
];

/* =========================================================
   CHECK ICON
========================================================= */

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#0260fe]/10 text-[#0260fe]">
      <FaCheck className="text-xs" />
    </span>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function HomeNew() {
  const scrollToOffers = () => {
    document.getElementById("ofertas")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
      <NavBar />

      <main className="flex-1">
        {/* ================================================= */}
        {/* HERO PREMIUM */}
        {/* ================================================= */}

        <section className="relative overflow-hidden bg-white">
          {/* =============================================== */}
          {/* FONDO PREMIUM */}
          {/* =============================================== */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Fondo principal */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(2,96,254,0.13),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(55,148,255,0.15),_transparent_32%),linear-gradient(135deg,#f7fbff_0%,#ffffff_46%,#edf5ff_100%)]" />

            {/* Halo azul izquierdo */}
            <div className="absolute -left-32 top-14 h-[470px] w-[470px] rounded-full bg-[#0260fe]/10 blur-[110px]" />

            {/* Halo superior derecho */}
            <div className="absolute -right-32 -top-24 h-[540px] w-[540px] rounded-full bg-[#3794ff]/15 blur-[120px]" />

            {/* Halo naranja */}
            <div className="absolute bottom-[-180px] left-[28%] h-[400px] w-[400px] rounded-full bg-[#ff6600]/10 blur-[120px]" />

            {/* Brillo central */}
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-[90px]" />

            {/* Forma decorativa derecha */}
            <div className="absolute right-[7%] top-[15%] h-48 w-48 rotate-12 rounded-[48px] border border-[#0260fe]/10 bg-white/20 backdrop-blur-sm" />

            {/* Forma decorativa izquierda */}
            <div className="absolute bottom-[10%] left-[5%] h-32 w-32 -rotate-12 rounded-[36px] border border-[#3794ff]/10 bg-white/25 backdrop-blur-sm" />

            {/* Cuadrícula */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: `
                  linear-gradient(#023e73 1px, transparent 1px),
                  linear-gradient(90deg, #023e73 1px, transparent 1px)
                `,
                backgroundSize: "56px 56px",
              }}
            />

            {/* Ruta decorativa */}
            <svg
              className="absolute right-0 top-0 hidden h-full w-[52%] opacity-[0.09] lg:block"
              viewBox="0 0 700 700"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60 560C180 460 160 330 300 290C445 248 415 135 610 95"
                stroke="#0260fe"
                strokeWidth="3"
                strokeDasharray="12 14"
                strokeLinecap="round"
              />

              <circle cx="60" cy="560" r="7" fill="#0260fe" />
              <circle cx="610" cy="95" r="7" fill="#ff6600" />
            </svg>
          </div>

          {/* =============================================== */}
          {/* CONTENIDO HERO */}
          {/* =============================================== */}

          <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-10 sm:px-6 md:pb-20 md:pt-14 lg:px-8 lg:pb-24">
            <div className="grid min-h-[620px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] xl:gap-20">
              {/* =========================================== */}
              {/* COLUMNA IZQUIERDA */}
              {/* =========================================== */}

              <div className="relative z-10">
                {/* Badge */}

                <div className="inline-flex items-center gap-3 rounded-full border border-[#0260fe]/15 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0260fe] text-xs text-white shadow-sm">
                    <FaBolt />
                  </span>

                  <span className="text-xs font-black uppercase tracking-[0.16em] text-[#0260fe]">
                    Cazadores de ofertas de viaje
                  </span>
                </div>

                {/* Título */}

                <h1 className="mt-7 max-w-[780px] text-[2.8rem] font-black leading-[0.98] tracking-[-0.045em] text-[#023e73] sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]">
                  Viaja más.
                  <span className="block text-[#0260fe]">Paga menos.</span>
                  <span className="mt-2 block">Disfruta más.</span>
                </h1>

                {/* Descripción */}

                <p className="mt-7 max-w-[650px] text-base font-medium leading-8 text-slate-600 sm:text-lg">
                  Encontramos hoteles, paquetes, vuelos y experiencias para
                  ayudarte a descubrir mejores opciones para tus próximas
                  vacaciones.
                </p>

                {/* Botones */}

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={scrollToOffers}
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-8 py-4 text-sm font-black text-white shadow-[0_15px_35px_rgba(2,96,254,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#014fd3] hover:shadow-[0_20px_45px_rgba(2,96,254,0.32)]"
                  >
                    Ver ofertas
                    <FaArrowRight className="text-xs transition duration-300 group-hover:translate-x-1" />
                  </button>

                  <a
                    href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20viaje.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 text-sm font-black text-[#023e73] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#25D366] hover:text-[#18a94b]"
                  >
                    <FaWhatsapp className="text-xl text-[#25D366]" />
                    Cotizar por WhatsApp
                  </a>
                </div>

                {/* Beneficios */}

                <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4">
                  {[
                    "Atención personalizada",
                    "Pagos flexibles",
                    "Ofertas seleccionadas",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-sm font-bold text-slate-600"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-50 text-green-600">
                        <FaCheck className="text-[10px]" />
                      </span>

                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* =========================================== */}
              {/* COLUMNA DERECHA */}
              {/* =========================================== */}

              <div className="relative mx-auto w-full max-w-[590px] lg:mx-0">
                {/* Glow detrás */}

                <div className="absolute -inset-8 rounded-[50px] bg-gradient-to-br from-[#0260fe]/10 via-[#3794ff]/5 to-[#ff6600]/10 blur-2xl" />

                {/* Panel principal */}

                <div className="relative overflow-hidden rounded-[36px] border border-white bg-white/90 p-5 shadow-[0_30px_90px_rgba(2,62,115,0.14)] backdrop-blur-xl sm:p-7">
                  {/* Encabezado */}

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#0260fe]">
                        Encuentra tu próxima aventura
                      </span>

                      <h2 className="mt-2 text-2xl font-black text-[#023e73] sm:text-3xl">
                        ¿Qué quieres descubrir?
                      </h2>
                    </div>

                    <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe] text-xl text-white shadow-lg sm:flex">
                      <FaPlane />
                    </div>
                  </div>

                  {/* OPCIONES */}

                  <div className="mt-7 space-y-3">
                    {/* Paquetes */}

                    <Link
                      to="/paquetes"
                      className="group flex items-center gap-4 rounded-[22px] border border-slate-100 bg-[#f7faff] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/20 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0260fe] text-xl text-white shadow-md">
                        <FaSuitcase />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-black text-[#023e73]">
                          Paquetes de viaje
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Vuelo + hotel en una sola reservación
                        </p>
                      </div>

                      <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#0260fe] shadow-sm transition group-hover:bg-[#0260fe] group-hover:text-white">
                        <FaArrowRight className="text-xs" />
                      </span>
                    </Link>

                    {/* Hoteles */}

                    <Link
                      to="/hoteles"
                      className="group flex items-center gap-4 rounded-[22px] border border-slate-100 bg-[#f7fbff] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-500 text-xl text-white shadow-md">
                        <FaHotel />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-black text-[#023e73]">Hoteles</h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Resorts y opciones Todo Incluido
                        </p>
                      </div>

                      <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-cyan-600 shadow-sm transition group-hover:bg-cyan-500 group-hover:text-white">
                        <FaArrowRight className="text-xs" />
                      </span>
                    </Link>

                    {/* Tours */}

                    <Link
                      to="/tours"
                      className="group flex items-center gap-4 rounded-[22px] border border-slate-100 bg-[#fffaf5] p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ff6600] text-xl text-white shadow-md">
                        <GiMayanPyramid />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-black text-[#023e73]">
                          Tours y experiencias
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Parques, actividades y aventuras
                        </p>
                      </div>

                      <span className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#ff6600] shadow-sm transition group-hover:bg-[#ff6600] group-hover:text-white">
                        <FaArrowRight className="text-xs" />
                      </span>
                    </Link>
                  </div>

                  {/* Mensaje inferior */}

                  <div className="relative mt-5 overflow-hidden rounded-[24px] bg-[#023e73] p-5 text-white">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#0260fe]/50 blur-2xl" />

                    <div className="absolute -bottom-14 left-10 h-28 w-28 rounded-full bg-[#ff6600]/20 blur-2xl" />

                    <div className="relative flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                        <FaUmbrellaBeach className="text-xl text-[#ff9a4a]" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-white/50">
                          No sabes qué elegir
                        </p>

                        <p className="mt-1 font-black">
                          Nosotros cazamos la oferta por ti.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =============================================== */}
            {/* BARRA DE CONFIANZA */}
            {/* =============================================== */}

            <div className="mt-12 border-t border-slate-200/80 pt-8">
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="flex items-center justify-center gap-3 sm:justify-start lg:justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0260fe]">
                    <FaShieldAlt />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#023e73]">
                      Reserva confiable
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Proveedores reconocidos
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 sm:justify-start lg:justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#ff6600]">
                    <FaCreditCard />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#023e73]">
                      Pagos flexibles
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Promociones disponibles
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3 sm:justify-start lg:justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <FaHeadset />
                  </div>

                  <div>
                    <p className="text-sm font-black text-[#023e73]">
                      Atención personalizada
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Estamos para ayudarte
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* CATEGORÍAS */}
        {/* ================================================= */}

        <section className="px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                Planea tu viaje
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                Encuentra lo que necesitas para tus vacaciones
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Consulta diferentes opciones y comienza a organizar tu próximo
                destino.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.title}
                    to={category.path}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl sm:p-8"
                  >
                    <div className="absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#0260fe]/5 transition duration-500 group-hover:scale-125 group-hover:bg-[#0260fe]/10" />

                    <div className="relative">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition duration-300 group-hover:bg-[#0260fe] group-hover:text-white">
                        <Icon className="text-2xl" />
                      </div>

                      <h3 className="mt-6 text-2xl font-black text-[#023e73]">
                        {category.title}
                      </h3>

                      <p className="mt-3 min-h-[56px] leading-7 text-slate-600">
                        {category.description}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                        Explorar opciones
                        <FaArrowRight className="text-xs transition duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* OFERTAS DESTACADAS */}
        {/* ================================================= */}

        <section
          id="ofertas"
          className="scroll-mt-24 bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ff6600]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#e85d00]">
                  <FaBolt />
                  Ofertas destacadas
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Encuentra tu viaje al mejor precio
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  Descubre promociones seleccionadas para hoteles, paquetes y
                  destinos dentro y fuera de México.
                </p>
              </div>

              <Link
                to="/ofertas"
                className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3.5 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
              >
                Ver todas las ofertas
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="mt-10">
              <CardsOferts />
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/ofertas"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-8 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-xl"
              >
                Descubrir más ofertas
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* DESTINOS */}
        {/* ================================================= */}

        <section className="px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                Destinos favoritos
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                Inspírate para tu próxima aventura
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Explora algunos de los destinos más solicitados por nuestros
                viajeros.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDestinations.map((destination) => {
                const Icon = destination.icon;

                return (
                  <article
                    key={destination.name}
                    className={`group relative min-h-[280px] overflow-hidden rounded-3xl bg-gradient-to-br ${destination.gradient} p-7 text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
                  >
                    <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 transition duration-500 group-hover:scale-125" />

                    <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-black/10" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                        <Icon className="text-2xl" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-black">
                          {destination.name}
                        </h3>

                        <p className="mt-3 leading-7 text-white/80">
                          {destination.description}
                        </p>

                        <Link
                          to="/ofertas"
                          className="mt-5 inline-flex items-center gap-2 text-sm font-black"
                        >
                          Ver ofertas
                          <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================================================= */}
        {/* CÓMO FUNCIONA */}
        {/* ================================================= */}

        <section className="bg-[#023e73] px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                Fácil, rápido y personalizado
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
                Tu viaje comienza en tres pasos
              </h2>

              <p className="mt-5 leading-8 text-white/70">
                Nos encargamos de ayudarte a encontrar opciones para que tú
                solamente tengas que elegir tu próxima aventura.
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

        {/* ================================================= */}
        {/* BENEFICIOS */}
        {/* ================================================= */}

        <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  No somos una agencia tradicional
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Somos cazadores de ofertas de viaje
                </h2>

                <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
                  Buscamos alternativas, promociones y precios especiales para
                  ayudarte a encontrar un viaje que se adapte a tus planes.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    "Atención completamente en línea.",
                    "Opciones para parejas, familias y grupos.",
                    "Hoteles, vuelos, paquetes y tours.",
                    "Asesoría antes y después de reservar.",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckIcon />

                      <p className="font-semibold text-slate-700">{item}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/quienes-somos"
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#023e73] px-7 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0260fe]"
                >
                  Conoce más de nosotros
                  <FaArrowRight className="text-xs" />
                </Link>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <article
                      key={benefit.title}
                      className="group rounded-3xl border border-slate-200 bg-[#f8faff] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:bg-white hover:shadow-xl"
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
          </div>
        </section>

        {/* ================================================= */}
        {/* CTA FINAL */}
        {/* ================================================= */}

        <section className="px-4 pb-16 sm:px-6 md:pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] bg-gradient-to-r from-[#0260fe] via-[#086ee9] to-[#3794ff] p-8 text-white shadow-2xl sm:p-12 lg:p-16">
            <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                  Tu próximo viaje comienza aquí
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                  ¿Listo para encontrar tu próxima oferta?
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75 md:text-lg">
                  Escríbenos tu destino, fechas y número de viajeros. Te
                  ayudaremos a buscar opciones para tus próximas vacaciones.
                </p>
              </div>

              <a
                href="https://wa.me/529984954637?text=Hola,%20quiero%20encontrar%20una%20oferta%20de%20viaje.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-5 text-base font-black text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-2xl"
              >
                <FaWhatsapp className="text-2xl" />
                Cazar oferta ahora
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
