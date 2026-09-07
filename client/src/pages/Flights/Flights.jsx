import React from "react";
import SEO from "../../components/SEO/SEO";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCreditCard,
  FaHeadset,
  FaMapMarkerAlt,
  FaPlane,
  FaShieldAlt,
  FaSuitcase,
  FaWhatsapp,
} from "react-icons/fa";

import PriceResWidget from "../../components/PriceRes/PriceResWidget";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

/* =========================================================
   VUELOS
   =========================================================

   No usamos CardsFlights porque actualmente PriceRes es quien
   consulta la disponibilidad real de vuelos.

   Las tarjetas de esta página son visuales/inspiracionales y
   regresan al usuario al motor para realizar su búsqueda.
========================================================= */

const flightCategories = [
  {
    title: "Vuelos nacionales",
    eyebrow: "Viaja por México",
    description:
      "Encuentra opciones para recorrer las principales ciudades y destinos de playa del país.",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=85&w=1600&auto=format&fit=crop",
  },
  {
    title: "Vuelos internacionales",
    eyebrow: "Explora más lejos",
    description:
      "Consulta rutas internacionales y compara alternativas para tu próximo viaje.",
    image:
      "https://images.unsplash.com/photo-1488085061387-422e29b40080?q=85&w=1600&auto=format&fit=crop",
  },
  {
    title: "Escapadas a la playa",
    eyebrow: "Sol y mar",
    description:
      "Busca vuelos hacia Cancún, Puerto Vallarta, Los Cabos, Huatulco y más destinos.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=85&w=1600&auto=format&fit=crop",
  },
  {
    title: "Escapadas de fin de semana",
    eyebrow: "Viajes cortos",
    description:
      "Planea una salida rápida y encuentra opciones según tus fechas y ciudad de origen.",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=85&w=1600&auto=format&fit=crop",
  },
];

const popularRoutes = [
  {
    origin: "Ciudad de México",
    destination: "Cancún",
    code: "MEX → CUN",
    description: "Caribe, playa y hoteles Todo Incluido.",
  },
  {
    origin: "Ciudad de México",
    destination: "Puerto Vallarta",
    code: "MEX → PVR",
    description: "Pacífico, gastronomía y atardeceres.",
  },
  {
    origin: "Ciudad de México",
    destination: "Los Cabos",
    code: "MEX → SJD",
    description: "Playas, paisajes y escapadas especiales.",
  },
  {
    origin: "Guadalajara",
    destination: "Cancún",
    code: "GDL → CUN",
    description: "Una de las escapadas favoritas hacia el Caribe.",
  },
  {
    origin: "Monterrey",
    destination: "Cancún",
    code: "MTY → CUN",
    description: "Vuela al Caribe desde el norte de México.",
  },
  {
    origin: "Ciudad de México",
    destination: "Huatulco",
    code: "MEX → HUX",
    description: "Bahías, tranquilidad y naturaleza.",
  },
];

const benefits = [
  {
    title: "Compara opciones",
    description:
      "Consulta diferentes alternativas de vuelo directamente desde el motor de reservaciones.",
    icon: FaPlane,
  },
  {
    title: "Pagos flexibles",
    description:
      "Encuentra promociones y opciones de pago disponibles al momento de reservar.",
    icon: FaCreditCard,
  },
  {
    title: "Reserva informada",
    description:
      "Revisa horarios, equipaje, escalas, condiciones y precio final antes de comprar.",
    icon: FaShieldAlt,
  },
  {
    title: "Atención personalizada",
    description:
      "Si necesitas orientación para organizar tu viaje, podemos ayudarte por WhatsApp.",
    icon: FaHeadset,
  },
];

function Flights() {
  const scrollToSearch = () => {
    document.getElementById("buscar-vuelo")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <React.Fragment>
      <SEO
        title="Vuelos Nacionales e Internacionales"
        description="Busca vuelos nacionales e internacionales y consulta opciones para Cancún, Puerto Vallarta, Los Cabos, Huatulco y otros destinos."
        image="https://www.viajaatudestino.com/IMAGEN-VUELOS.jpg"
        url="https://www.viajaatudestino.com/vuelos"
      />

      <div className="flex min-h-screen flex-col bg-[#f5f8fc]">
        <NavBar />

        <main className="flex-1">
          {/* =====================================================
              PRICERES
              Carrusel + motor como primer contenido de la página.
          ====================================================== */}
          <section id="buscar-vuelo" className="scroll-mt-24 bg-white">
            <PriceResWidget
              showCarousel
              title="Buscar vuelos nacionales e internacionales"
            />
          </section>

          {/* =====================================================
              EXPLORA VUELOS
              Cards visuales: no muestran precios ni disponibilidad
              inventada. Regresan al usuario al motor de búsqueda.
          ====================================================== */}
          <section className="bg-white px-4 pb-14 pt-10 sm:px-6 sm:pt-12 md:pb-20 md:pt-16 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-[#0260fe]">
                    <FaPlane aria-hidden="true" />
                    Encuentra tu próximo vuelo
                  </span>

                  <h1 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                    Elige cómo quieres viajar
                  </h1>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                    Inspírate con estas opciones y después utiliza nuestro
                    buscador para consultar vuelos, horarios y disponibilidad.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="hidden min-h-[48px] w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:inline-flex"
                >
                  Buscar vuelos
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                {flightCategories.map((category, index) => (
                  <button
                    key={category.title}
                    type="button"
                    onClick={scrollToSearch}
                    className={`group relative overflow-hidden rounded-[28px] bg-[#023e73] text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] ${
                      index === 0 || index === 3
                        ? "min-h-[330px] lg:min-h-[390px]"
                        : "min-h-[290px] lg:min-h-[350px]"
                    }`}
                  >
                    <img
                      src={category.image}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#001b34]/95 via-[#001b34]/30 to-transparent" />

                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white backdrop-blur">
                      <FaPlane aria-hidden="true" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                      <span className="text-xs font-black uppercase tracking-[0.17em] text-[#ff9b4a]">
                        {category.eyebrow}
                      </span>

                      <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                        {category.title}
                      </h2>

                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/75 sm:text-base">
                        {category.description}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-white">
                        Buscar vuelo
                        <FaArrowRight
                          className="text-xs transition group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center sm:hidden">
                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-7 py-3.5 text-sm font-black text-white shadow-md"
                >
                  Buscar vuelos
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================
              RUTAS POPULARES
              Son ideas de viaje, NO tarifas.
          ====================================================== */}
          <section className="bg-[#f5f8fc] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                  Ideas para volar
                </span>

                <h2 className="mt-3 text-3xl font-black text-[#023e73] sm:text-4xl">
                  Rutas populares desde México
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Selecciona una idea y consulta en el motor las opciones
                  disponibles para tus fechas.
                </p>
              </div>

              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {popularRoutes.map((route) => (
                  <button
                    key={route.code}
                    type="button"
                    onClick={scrollToSearch}
                    className="group rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0260fe]/25 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe]">
                        <FaPlane aria-hidden="true" />
                      </span>

                      <span className="rounded-full bg-[#f2f6ff] px-3 py-1.5 text-xs font-black tracking-wide text-[#0260fe]">
                        {route.code}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                          Origen
                        </p>
                        <p className="mt-1 font-black text-[#023e73]">
                          {route.origin}
                        </p>
                      </div>

                      <FaArrowRight
                        className="shrink-0 text-slate-300"
                        aria-hidden="true"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                          Destino
                        </p>
                        <p className="mt-1 font-black text-[#023e73]">
                          {route.destination}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      {route.description}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                      Consultar vuelo
                      <FaArrowRight
                        className="text-xs transition group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              CONSEJOS / BENEFICIOS
          ====================================================== */}
          <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                    Antes de reservar
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                    Revisa los detalles de tu vuelo
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                    Compara horarios, duración, escalas, equipaje y condiciones
                    antes de elegir la opción adecuada para tu viaje.
                  </p>

                  <button
                    type="button"
                    onClick={scrollToSearch}
                    className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-2xl bg-[#023e73] px-7 py-4 text-sm font-black text-white transition hover:bg-[#0260fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023e73]"
                  >
                    <FaCalendarAlt aria-hidden="true" />
                    Consultar vuelos
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
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-xl text-[#0260fe]">
                          <Icon aria-hidden="true" />
                        </span>

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
              CTA WHATSAPP
          ====================================================== */}
          <section className="bg-white px-4 pb-14 sm:px-6 md:pb-20 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] p-7 text-white shadow-xl sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

              <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                    ¿Necesitas ayuda?
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    Te ayudamos a organizar tu vuelo
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                    Envíanos ciudad de salida, destino, fechas y número de
                    viajeros para orientarte con tu búsqueda.
                  </p>
                </div>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20vuelo.%0A%0ACiudad%20de%20salida:%20%0ADestino:%20%0AFecha%20de%20salida:%20%0AFecha%20de%20regreso:%20%0AViajeros:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[54px] flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  Cotizar por WhatsApp
                </a>
              </div>
            </div>
          </section>

          {/* =====================================================
              NAVEGACIÓN A PAQUETES
          ====================================================== */}
          <section className="border-t border-slate-200 bg-[#f5f8fc] px-4 py-7 text-center">
            <p className="text-sm text-slate-500">
              ¿También necesitas hospedaje?{" "}
              <a
                href="/paquetes"
                className="inline-flex items-center gap-1.5 font-black text-[#0260fe] transition hover:text-[#ff6600]"
              >
                Consulta vuelo + hotel
                <FaSuitcase className="text-xs" aria-hidden="true" />
              </a>
            </p>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Flights;
