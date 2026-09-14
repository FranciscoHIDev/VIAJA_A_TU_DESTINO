import React from "react";
import { Link } from "react-router-dom";

import PageSEO from "../../components/PageSEO/PageSEO";

import {
  FaArrowRight,
  FaBolt,
  FaCreditCard,
  FaHeadset,
  FaHotel,
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

/* =========================================================
   CATEGORÍAS
========================================================= */

const categories = [
  {
    title: "Paquetes",
    description: "Vuelo + hotel en una sola reservación.",
    path: "/paquetes/?s=3#3",
    icon: FaSuitcase,
  },
  {
    title: "Hoteles",
    description: "Resorts, Todo Incluido y opciones de hospedaje.",
    path: "/hoteles/?s=1#1",
    icon: FaHotel,
  },
  {
    title: "Vuelos",
    description: "Consulta vuelos nacionales e internacionales.",
    path: "/vuelos/?s=2#2",
    icon: FaPlane,
  },
  {
    title: "Tours",
    description: "Actividades, parques y experiencias para tu viaje.",
    path: "/tours/?s=5#5",
    icon: FaUmbrellaBeach,
  },
];

/* =========================================================
   BENEFICIOS
========================================================= */

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

/* =========================================================
   OFERTAS
========================================================= */

function Offers() {
  return (
    <React.Fragment>
      {/* =====================================================
          VTD SEO

          Toda la configuración SEO de /ofertas viene
          directamente desde el backend:

          GET /api/page-seo/offers
      ====================================================== */}

      <PageSEO pageKey="offers" />

      <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
        <NavBar />

        <main className="flex-1">
          {/* =====================================================
              PRICERES: CARRUSEL + MOTOR
              Primer bloque después del NavBar.
          ====================================================== */}

          <section
            id="buscar-oferta"
            className="bg-white"
            aria-label="Buscador de viajes"
          >
            <PriceResWidget
              showCarousel
              title="Buscar hoteles, paquetes, vuelos y experiencias"
            />
          </section>

          {/* =====================================================
              TODAS LAS OFERTAS
          ====================================================== */}

          <section
            id="todas-las-ofertas"
            className="scroll-mt-24 bg-white px-4 pb-14 pt-10 sm:px-6 sm:pt-12 md:pb-20 md:pt-16 lg:px-8"
          >
            <div className="mx-auto max-w-[1500px]">
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0260fe]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  <FaBolt className="text-[#ff6600]" aria-hidden="true" />
                  Ofertas disponibles
                </span>

                <h2 className="mt-5 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                  Encuentra una oferta para tu próximo viaje
                </h2>

                <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                  Explora hoteles, paquetes, vuelos y experiencias disponibles.
                  Compara opciones y elige la que mejor se adapte a tus fechas y
                  forma de viajar.
                </p>
              </div>

              <div className="mt-10">
                <CardsOferts showAll />
              </div>

              <div className="mt-10 rounded-3xl border border-orange-200 bg-orange-50 p-6 text-center sm:p-8">
                <p className="font-bold leading-7 text-[#8a420d]">
                  Las tarifas están sujetas a disponibilidad y pueden cambiar
                  sin previo aviso. El precio final dependerá de las fechas, el
                  número de viajeros y los servicios seleccionados.
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              CATEGORÍAS
          ====================================================== */}

          <section className="bg-[#f5f8fc] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#ff6600]">
                  Explora por categoría
                </span>

                <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                  Encuentra más opciones para tu viaje
                </h2>

                <p className="mt-4 leading-7 text-slate-600">
                  Entra directamente a hoteles, paquetes, vuelos o tours y
                  descubre opciones específicas para cada tipo de viaje.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => {
                  const Icon = category.icon;

                  return (
                    <Link
                      key={category.title}
                      to={category.path}
                      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#0260fe]/30 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]"
                    >
                      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#0260fe]/5 transition group-hover:scale-125" />

                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                          <Icon className="text-2xl" aria-hidden="true" />
                        </div>

                        <h3 className="mt-6 text-2xl font-black text-[#023e73]">
                          {category.title}
                        </h3>

                        <p className="mt-3 leading-7 text-slate-600">
                          {category.description}
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#0260fe]">
                          Explorar
                          <FaArrowRight
                            className="text-xs transition group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              BENEFICIOS
          ====================================================== */}

          <section className="bg-[#f4f8ff] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#0260fe]">
                  Viaja a tu Destino
                </span>

                <h2 className="mt-4 text-3xl font-black text-[#023e73] sm:text-4xl">
                  Cazamos ofertas para que tú elijas el viaje
                </h2>

                <p className="mt-5 leading-8 text-slate-600">
                  Reunimos promociones y alternativas para ayudarte a comparar y
                  encontrar opciones que se adapten mejor a tus planes.
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
                        <Icon className="text-2xl" aria-hidden="true" />
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

          {/* =====================================================
              CTA FINAL
          ====================================================== */}

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
                  className="inline-flex flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <FaWhatsapp className="text-xl" aria-hidden="true" />
                  Cazar una oferta
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Offers;
