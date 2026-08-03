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
import PriceResWidget from "../../components/PriceRes/PriceResWidget";

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

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#0260fe]/10 text-[#0260fe]">
      <FaCheck className="text-xs" />
    </span>
  );
}

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
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#023e73]">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1784166724/z5qgffi2ipgyjltwnqls.png"
              alt="Viajes y vacaciones en el Caribe"
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#023e73]/95 via-[#023e73]/75 to-[#0260fe]/25" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#023e73]/70 via-transparent to-transparent" />
          </div>

          <div className="pointer-events-none absolute -left-28 -top-24 h-80 w-80 rounded-full bg-[#0260fe]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#ff6600]/20 blur-3xl" />

          <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-5 pb-32 pt-16 sm:px-6 md:min-h-[620px] md:pb-40 lg:px-8">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
                <FaBolt className="text-[#ff9a4a]" />
                Cazadores de ofertas de viaje
              </span>

              <h1 className="mt-6 text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Viaja más y encuentra precios increíbles
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                Buscamos hoteles, vuelos, paquetes y experiencias para que
                puedas planear tus próximas vacaciones de manera fácil, rápida y
                confiable.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={scrollToOffers}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                >
                  <FaPlane />
                  Explorar ofertas
                </button>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20cotizar%20un%20viaje.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition duration-300 hover:bg-white hover:text-[#023e73]"
                >
                  <FaWhatsapp className="text-lg" />
                  Cotizar por WhatsApp
                </a>
              </div>

              <div className="mt-8 flex flex-col gap-3 text-sm font-semibold text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-7">
                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Atención personalizada
                </span>

                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Ofertas reales
                </span>

                <span className="flex items-center gap-2">
                  <CheckIcon />
                  Pagos flexibles
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORÍAS */}
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

        {/* OFERTAS DESTACADAS */}
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

        {/* DESTINOS */}
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

        {/* CÓMO FUNCIONA */}
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

        {/* BENEFICIOS */}
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

        {/* CTA FINAL */}
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
