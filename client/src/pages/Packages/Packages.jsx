import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarCheck,
  FaCheckCircle,
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

const packageTypes = [
  {
    title: "Vuelo + Hotel",
    description:
      "Reserva el transporte y hospedaje de tu viaje en una sola operación.",
    icon: FaPlane,
  },
  {
    title: "Todo Incluido",
    description:
      "Disfruta hospedaje, alimentos, bebidas y entretenimiento durante tu estancia.",
    icon: FaUmbrellaBeach,
  },
  {
    title: "Paquetes familiares",
    description:
      "Opciones pensadas para viajar con niños, familiares o grupos de amigos.",
    icon: FaUsers,
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
    description: "Paisajes desérticos, playas y hoteles espectaculares.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Puerto Vallarta",
    description: "Playas, gastronomía y un ambiente tradicional.",
    image:
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Huatulco",
    description: "Bahías tranquilas y paquetes para toda la familia.",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    name: "Punta Cana",
    description:
      "Caribe, resorts Todo Incluido y experiencias internacionales.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
];

const steps = [
  {
    number: "01",
    title: "Elige tu destino",
    description:
      "Indica desde dónde viajas, el destino, tus fechas y el número de pasajeros.",
  },
  {
    number: "02",
    title: "Compara alternativas",
    description:
      "Consulta diferentes combinaciones de vuelos, hoteles y planes de hospedaje.",
  },
  {
    number: "03",
    title: "Confirma tu paquete",
    description:
      "Revisa las condiciones, selecciona tu forma de pago y reserva tu viaje.",
  },
];

const benefits = [
  {
    title: "Ahorro en conjunto",
    description:
      "Combinar vuelo y hotel puede ofrecer mejores precios que reservar cada servicio por separado.",
    icon: FaStar,
  },
  {
    title: "Pagos flexibles",
    description:
      "Encuentra promociones con meses sin intereses cuando estén disponibles.",
    icon: FaCreditCard,
  },
  {
    title: "Reservación confiable",
    description:
      "Consulta las condiciones de tu vuelo y hospedaje antes de confirmar.",
    icon: FaShieldAlt,
  },
  {
    title: "Atención personalizada",
    description:
      "Recibe acompañamiento para encontrar un paquete adecuado para tu viaje.",
    icon: FaHeadset,
  },
];

function Packages() {
  const scrollToSearch = () => {
    document.getElementById("buscar-paquete")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const scrollToPackages = () => {
    document.getElementById("paquetes-disponibles")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
      <NavBar />

      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#023e73]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=85&w=2200&auto=format&fit=crop"
              alt="Paquetes de vuelo y hotel"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#012c52]/95 via-[#023e73]/80 to-[#0260fe]/25" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#023e73]/80 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0260fe]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#ff6600]/20 blur-3xl" />

          <div className="relative mx-auto flex min-h-[540px] max-w-7xl items-center px-5 pb-32 pt-16 sm:px-6 md:min-h-[620px] md:pb-40 lg:px-8">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
                <FaSuitcase className="text-[#ff9b4a]" />
                Paquetes de viaje
              </span>

              <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Vuelo y hotel para tu próximo destino
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Encuentra paquetes nacionales e internacionales con diferentes
                aerolíneas, hoteles y formas de pago para organizar tu viaje
                desde un solo lugar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={scrollToSearch}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                >
                  <FaSearch />
                  Buscar paquetes
                </button>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20paquete%20de%20vuelo%20y%20hotel.%0A%0ACiudad%20de%20salida:%20%0ADestino:%20%0AFechas:%20%0AAdultos:%20%0AMenores:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                >
                  <FaWhatsapp className="text-lg" />
                  Solicitar cotización
                </a>
              </div>

              <div className="mt-8 flex flex-col gap-3 text-sm font-semibold text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-7">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#ff8a33]" />
                  Vuelo + hotel
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#ff8a33]" />
                  Paquetes nacionales e internacionales
                </span>

                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#ff8a33]" />
                  Pagos flexibles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* TIPOS DE PAQUETE */}
        <section className="px-4 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                Elige cómo quieres viajar
              </span>

              <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                Un paquete para cada tipo de viajero
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Encuentra opciones para viajar en pareja, con amigos o con toda
                la familia.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {packageTypes.map((type) => {
                const Icon = type.icon;

                return (
                  <button
                    key={type.title}
                    type="button"
                    onClick={scrollToPackages}
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
                        Explorar paquetes
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
                  Destinos destacados
                </span>

                <h2 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Inspírate para tus próximas vacaciones
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  Descubre destinos nacionales e internacionales para reservar
                  vuelo y hospedaje en un solo paquete.
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToPackages}
                className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-6 py-3.5 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white"
              >
                Ver paquetes
                <FaArrowRight className="text-xs" />
              </button>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination, index) => (
                <button
                  key={destination.name}
                  type="button"
                  onClick={scrollToSearch}
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
                      Buscar paquete
                      <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* PAQUETES DISPONIBLES */}
        <section
          id="paquetes-disponibles"
          className="scroll-mt-24 bg-[#f4f8ff] px-4 py-16 sm:px-6 md:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  <FaSuitcase />
                  Paquetes recomendados
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Encuentra vuelo y hotel para tu próximo viaje
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  Consulta nuestras promociones y revisa las fechas, vuelos,
                  hotel, equipaje y condiciones incluidas antes de reservar.
                </p>
              </div>

              <button
                type="button"
                onClick={scrollToSearch}
                className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-6 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-xl"
              >
                <FaSearch />
                Nueva búsqueda
              </button>
            </div>

            <div className="mt-10">
              <CardsPackages />
            </div>

            <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6 text-center sm:p-8">
              <p className="font-bold leading-7 text-[#86420f]">
                Las tarifas están sujetas a disponibilidad y pueden cambiar sin
                previo aviso. El precio final dependerá de la ciudad de salida,
                fechas, aerolínea, hotel, número de pasajeros y servicios
                seleccionados.
              </p>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section className="bg-[#023e73] px-4 py-16 text-white sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#79b5ff]">
                Fácil, rápido y seguro
              </span>

              <h2 className="mt-4 text-3xl font-black sm:text-4xl md:text-5xl">
                Reserva tu paquete en tres pasos
              </h2>

              <p className="mt-5 leading-8 text-white/70">
                Consulta alternativas y revisa toda la información antes de
                confirmar tus vacaciones.
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

        {/* PROMOCIÓN */}
        <section className="bg-white px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative min-h-[430px] overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1800&auto=format&fit=crop"
                alt="Planeación de viaje"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#001b34]/95 via-[#023e73]/80 to-[#0260fe]/35" />

              <div className="relative flex min-h-[430px] items-center px-7 py-14 sm:px-10 lg:px-16">
                <div className="max-w-2xl text-white">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#ff6600] px-5 py-2 text-xs font-black uppercase tracking-[0.16em]">
                    <FaCreditCard />
                    Facilidades de pago
                  </span>

                  <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                    Planea ahora y paga tu viaje con mayor flexibilidad
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                    Algunas reservaciones permiten pagar a meses sin intereses o
                    apartar con un anticipo, dependiendo del proveedor y las
                    condiciones de la promoción.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={scrollToSearch}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00]"
                    >
                      <FaCalendarCheck />
                      Buscar disponibilidad
                    </button>

                    <a
                      href="https://wa.me/529984954637?text=Hola,%20quiero%20información%20sobre%20paquetes%20con%20meses%20sin%20intereses."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                    >
                      <FaWhatsapp />
                      Consultar promociones
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
                Viaja con mayor tranquilidad
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                ¿Por qué reservar un paquete con nosotros?
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Te ayudamos a comparar opciones y conocer las condiciones del
                vuelo y el hospedaje antes de realizar tu reservación.
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
                  ¿No encuentras el paquete ideal?
                </h2>

                <p className="mt-5 text-base leading-8 text-white/75 md:text-lg">
                  Envíanos tu ciudad de salida, destino, fechas y número de
                  viajeros. Buscaremos alternativas para tus próximas
                  vacaciones.
                </p>
              </div>

              <a
                href="https://wa.me/529984954637?text=Hola,%20quiero%20una%20cotización%20personalizada%20de%20vuelo%20y%20hotel.%0A%0ACiudad%20de%20salida:%20%0ADestino:%20%0AFechas:%20%0AAdultos:%20%0AMenores:%20%0APresupuesto:%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-8 py-5 text-base font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#1ebe5d] hover:shadow-2xl"
              >
                <FaWhatsapp className="text-2xl" />
                Cotizar un paquete
              </a>
            </div>
          </div>
        </section>

        {/* ENLACE A HOTELES */}
        <section className="border-t border-slate-200 bg-[#f4f8ff] px-4 py-8 text-center">
          <p className="text-sm text-slate-500">
            ¿Solamente necesitas hospedaje?{" "}
            <Link
              to="/hoteles"
              className="inline-flex items-center gap-1 font-black text-[#0260fe] transition hover:text-[#ff6600]"
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

export default Packages;
