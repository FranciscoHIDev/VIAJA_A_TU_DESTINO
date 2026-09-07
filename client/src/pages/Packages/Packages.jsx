import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheck,
  FaCreditCard,
  FaHeadset,
  FaHotel,
  FaMapMarkerAlt,
  FaPlane,
  FaSearch,
  FaShieldAlt,
  FaStar,
  FaSuitcase,
  FaUmbrellaBeach,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";

import CardsPackages from "../../components/CardsPackages/CardsPackages";
import PriceResWidget from "../../components/PriceRes/PriceResWidget";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

/* =========================================================
   DATOS
   Los textos están separados de la estructura para que sean
   fáciles de editar sin tocar el diseño.
========================================================= */

const packageTypes = [
  {
    title: "Vuelo + Hotel",
    description: "Todo tu viaje en una sola reservación.",
    icon: FaPlane,
    className: "bg-blue-50 text-[#0260fe]",
  },
  {
    title: "Todo Incluido",
    description: "Hospedaje, alimentos, bebidas y más.",
    icon: FaUmbrellaBeach,
    className: "bg-orange-50 text-[#ff6600]",
  },
  {
    title: "Para familias",
    description: "Opciones para viajar juntos y disfrutar más.",
    icon: FaUsers,
    className: "bg-cyan-50 text-cyan-600",
  },
];

const destinations = [
  {
    name: "Cancún",
    description: "Vuelo, hotel y playas del Caribe Mexicano.",
    image:
      "https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Riviera Maya",
    description: "Resorts Todo Incluido, cenotes y experiencias únicas.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Los Cabos",
    description: "Paisajes, playas y hoteles para una gran escapada.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Puerto Vallarta",
    description: "Mar, gastronomía y el encanto del Pacífico.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Huatulco",
    description: "Bahías tranquilas y vacaciones para compartir.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Punta Cana",
    description: "Caribe, resorts Todo Incluido y descanso frente al mar.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
];

const steps = [
  {
    number: "01",
    title: "Busca tu viaje",
    description:
      "Selecciona ciudad de salida, destino, fechas y número de viajeros.",
  },
  {
    number: "02",
    title: "Compara opciones",
    description:
      "Revisa distintas combinaciones de vuelo, hotel, horarios y precios.",
  },
  {
    number: "03",
    title: "Elige y reserva",
    description:
      "Consulta las condiciones de la opción que prefieras y completa tu reservación.",
  },
];

const benefits = [
  {
    title: "Vuelo + hotel",
    description:
      "Consulta ambos servicios juntos para organizar tu viaje de forma más sencilla.",
    icon: FaPlane,
  },
  {
    title: "Pagos flexibles",
    description:
      "Encuentra promociones con meses sin intereses cuando estén disponibles.",
    icon: FaCreditCard,
  },
  {
    title: "Opciones confiables",
    description:
      "Revisa vuelos, hoteles, disponibilidad y condiciones antes de pagar.",
    icon: FaShieldAlt,
  },
  {
    title: "Atención personalizada",
    description:
      "Si necesitas ayuda, nuestros asesores pueden orientarte con tu viaje.",
    icon: FaHeadset,
  },
];

const heroHighlights = [
  "Paquetes nacionales e internacionales",
  "Opciones Todo Incluido",
  "Pagos flexibles",
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

function Packages() {
  const scrollToSearch = () => {
    document.getElementById("buscar-paquete")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToPackages = () => {
    document.getElementById("paquetes-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <React.Fragment>
      <SEO
        title="Paquetes de Viajes y Vacaciones Todo Incluido"
        description="Encuentra paquetes de viaje con hotel y vuelo a Cancún, Riviera Maya, Huatulco, Los Cabos y otros destinos. Consulta nuestras promociones."
        image="https://www.viajaatudestino.com/IMAGEN-PAQUETES.jpg"
        url="https://www.viajaatudestino.com/paquetes"
      />

      <div className="flex min-h-screen flex-col bg-[#f5f8fc]">
        <NavBar />

        <main className="flex-1">
          {/* =====================================================
              PRICERES: CARRUSEL + MOTOR
              Primer bloque después del NavBar.
          ====================================================== */}
          <section id="buscar-paquete" className="scroll-mt-24 bg-white">
            <PriceResWidget
              showCarousel
              title="Buscar paquetes, hoteles, vuelos y experiencias"
            />
          </section>

          {/* =====================================================
              PAQUETES DESTACADOS
              Las promociones aparecen temprano: el usuario puede
              explorar sin tener que recorrer toda la página.
          ====================================================== */}
          <section
            id="paquetes-disponibles"
            className="scroll-mt-24 bg-[#f5f8fc] px-4 py-14 sm:px-6 sm:py-16 md:py-20 lg:px-8"
          >
            <div className="mx-auto max-w-[1500px]">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.17em] text-[#e85d00]">
                    <FaStar aria-hidden="true" />
                    Paquetes destacados
                  </span>

                  <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                    Ofertas de vuelo + hotel
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                    Revisa fechas, destino, estancia y precio. Entra a cada
                    oferta para conocer todos los detalles antes de reservar.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex w-fit min-h-[48px] items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]"
                >
                  <FaSearch aria-hidden="true" />
                  Hacer otra búsqueda
                </button>
              </div>

              <div className="mt-9">
                <CardsPackages />
              </div>

              <div className="mt-7 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4 text-sm leading-6 text-[#7a451c] sm:px-5">
                <span className="mt-0.5 text-base" aria-hidden="true">
                  ℹ️
                </span>
                <p>
                  Las tarifas están sujetas a disponibilidad y pueden cambiar.
                  Consulta el precio final, vuelos, hotel, equipaje y
                  condiciones antes de completar tu reservación.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              TIPOS DE PAQUETE
              Más compactos que antes. Ayudan a orientar sin retrasar
              el acceso a las ofertas.
          ====================================================== */}
          <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  Elige cómo quieres viajar
                </span>

                <h2 className="mt-3 text-3xl font-black text-[#023e73] sm:text-4xl">
                  Encuentra el paquete que necesitas
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Explora opciones según el tipo de experiencia que estás
                  buscando.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
                {packageTypes.map((type) => {
                  const Icon = type.icon;

                  return (
                    <button
                      key={type.title}
                      type="button"
                      onClick={scrollToPackages}
                      className="group flex min-h-[150px] items-start gap-4 rounded-3xl border border-slate-200 bg-[#fbfdff] p-5 text-left transition hover:-translate-y-0.5 hover:border-[#0260fe]/25 hover:bg-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:p-6"
                    >
                      <span
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl sm:h-14 sm:w-14 ${type.className}`}
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
                          Ver opciones
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
                    Destinos populares
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                    Inspírate para tu próxima escapada
                  </h2>

                  <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                    Elige un destino y después consulta fechas y combinaciones
                    disponibles.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="hidden min-h-[48px] w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] sm:inline-flex"
                >
                  Buscar otro destino
                  <FaArrowRight aria-hidden="true" />
                </button>
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {destinations.map((destination) => (
                  <button
                    key={destination.name}
                    type="button"
                    onClick={scrollToSearch}
                    aria-label={`Buscar paquetes para ${destination.name}`}
                    className="group relative min-h-[285px] overflow-hidden rounded-3xl bg-[#023e73] text-left shadow-md transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]"
                  >
                    <img
                      src={destination.image}
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
                        {destination.name}
                      </h3>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                        {destination.description}
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-white">
                        Buscar paquete
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
                  Reserva tu paquete en 3 pasos
                </h2>

                <p className="mt-4 leading-7 text-white/70">
                  Primero compara. Después revisa los detalles. Reserva cuando
                  encuentres la opción adecuada.
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
                    Todo lo importante en un solo lugar
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">
                    Compara opciones y revisa cuidadosamente los servicios,
                    horarios, políticas y precio final de tu paquete.
                  </p>

                  <button
                    type="button"
                    onClick={scrollToSearch}
                    className="mt-7 inline-flex min-h-[50px] items-center justify-center gap-3 rounded-2xl bg-[#023e73] px-7 py-4 text-sm font-black text-white transition hover:bg-[#0260fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023e73]"
                  >
                    <FaCalendarCheck aria-hidden="true" />
                    Consultar disponibilidad
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
                    ¿Necesitas ayuda?
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
                    Te ayudamos a encontrar tu paquete
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/75">
                    Envíanos ciudad de salida, destino, fechas y número de
                    viajeros para ayudarte a buscar alternativas.
                  </p>
                </div>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20una%20cotización%20personalizada%20de%20vuelo%20y%20hotel.%0A%0ACiudad%20de%20salida:%20%0ADestino:%20%0AFechas:%20%0AAdultos:%20%0AMenores:%20%0APresupuesto:%20"
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
              NAVEGACIÓN ALTERNATIVA
          ====================================================== */}
          <section className="border-t border-slate-200 bg-[#f5f8fc] px-4 py-7 text-center">
            <p className="text-sm text-slate-500">
              ¿Solamente necesitas hospedaje?{" "}
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

export default Packages;
