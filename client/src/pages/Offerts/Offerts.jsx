import React from "react";
import { Link } from "react-router-dom";

import {
  FaArrowRight,
  FaBolt,
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

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOferts from "../../components/CardsOferts/CardsOferts";
import PriceResWidget from "../../components/PriceRes/PriceResWidget";

const categories = [
  {
    title: "Paquetes",
    description: "Vuelo y hotel en una sola reservación.",
    path: "/paquetes",
    icon: FaSuitcase,
  },
  {
    title: "Hoteles",
    description: "Hospedaje para todos los presupuestos.",
    path: "/hoteles",
    icon: FaHotel,
  },
  {
    title: "Tours",
    description: "Actividades y experiencias inolvidables.",
    path: "/tours",
    icon: FaUmbrellaBeach,
  },
];

const benefits = [
  {
    title: "Ofertas reales",
    description: "Promociones seleccionadas y sujetas a disponibilidad.",
    icon: FaBolt,
  },
  {
    title: "Pagos flexibles",
    description: "Opciones de meses sin intereses según la promoción.",
    icon: FaCreditCard,
  },
  {
    title: "Reserva segura",
    description: "Atención y acompañamiento durante tu reservación.",
    icon: FaShieldAlt,
  },
  {
    title: "Asesoría personalizada",
    description: "Te ayudamos a encontrar una opción para tu viaje.",
    icon: FaHeadset,
  },
];

function Offers() {
  const scrollToOffers = () => {
    document.getElementById("todas-las-ofertas")?.scrollIntoView({
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
              alt="Ofertas de viajes"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#023e73]/95 via-[#023e73]/75 to-[#0260fe]/30" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#023e73]/70 via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-5 py-16 sm:px-6 md:min-h-[520px] lg:px-8">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] backdrop-blur">
                <FaMapMarkerAlt className="text-[#ff9b4a]" />
                Ofertas de viaje
              </span>

              <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Encuentra una oferta para tu próximo destino
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
                Explora hoteles, paquetes, tours y experiencias seleccionadas
                para que viajes más y aproveches mejor tu presupuesto.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={scrollToOffers}
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-xl"
                >
                  <FaPlane />
                  Explorar ofertas
                </button>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20recibir%20información%20sobre%20sus%20ofertas%20de%20viaje."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-[#023e73]"
                >
                  <FaWhatsapp className="text-lg" />
                  Solicitar una cotización
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-white/75">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff6600]" />
                  Hoteles
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff6600]" />
                  Vuelo + hotel
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#ff6600]" />
                  Tours y experiencias
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* BUSCADOR */}
        <section className="relative z-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto -mt-8 max-w-6xl rounded-3xl border border-slate-200 bg-white p-3 shadow-xl sm:-mt-12 sm:p-5">
            <PriceResWidget />
          </div>
        </section>

        {/* CATEGORÍAS */}
        <section className="px-4 pb-10 pt-14 sm:px-6 md:pb-16 md:pt-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                Busca por categoría
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                Encuentra el tipo de viaje que necesitas
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Consulta nuestras opciones de hospedaje, paquetes y actividades.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <Link
                    key={category.title}
                    to={category.path}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#0260fe]/5 transition group-hover:scale-125" />

                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                        <Icon className="text-2xl" />
                      </div>

                      <h3 className="mt-6 text-2xl font-black text-[#023e73]">
                        {category.title}
                      </h3>

                      <p className="mt-3 leading-7 text-slate-600">
                        {category.description}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                        Explorar
                        <FaArrowRight className="text-xs transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* TODAS LAS OFERTAS */}
        <section
          id="todas-las-ofertas"
          className="scroll-mt-24 bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8"
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                <FaBolt className="text-[#ff6600]" />
                Ofertas disponibles
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                Todas nuestras ofertas de viaje
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                Consulta las promociones disponibles y selecciona la que mejor
                se adapte a tus próximas vacaciones.
              </p>
            </div>

            <div className="mt-10">
              <CardsOferts showAll />
            </div>

            <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6 text-center sm:p-8">
              <p className="font-bold leading-7 text-[#8a420d]">
                Las tarifas están sujetas a disponibilidad y pueden cambiar sin
                previo aviso. El precio final dependerá de las fechas, el número
                de viajeros y los servicios seleccionados.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFICIOS */}
        <section className="bg-[#f4f8ff] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                Viaja a tu Destino
              </span>

              <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                No somos una agencia tradicional
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Somos cazadores de ofertas y buscamos opciones para que puedas
                encontrar tu próximo viaje.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <article
                    key={benefit.title}
                    className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6600]/10 text-[#ff6600]">
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

        {/* CTA */}
        <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] p-8 text-white shadow-xl sm:p-12">
            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#ff6600]/25 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/65">
                  Cotización personalizada
                </span>

                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">
                  ¿No encontraste la oferta que estabas buscando?
                </h2>

                <p className="mt-4 max-w-2xl leading-8 text-white/75">
                  Envíanos tu destino, fechas, ciudad de salida y número de
                  viajeros. Buscaremos opciones para ti.
                </p>
              </div>

              <a
                href="https://wa.me/529984954637?text=Hola,%20quiero%20una%20cotización%20personalizada.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-xl"
              >
                <FaWhatsapp className="text-xl" />
                Cazar una oferta
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Offers;
