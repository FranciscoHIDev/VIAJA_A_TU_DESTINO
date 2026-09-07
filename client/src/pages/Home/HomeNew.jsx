import React from "react";
import { Link } from "react-router-dom";
import SEO from "../../components/SEO/SEO";
import {
  FaArrowRight,
  FaBolt,
  FaCheck,
  FaCreditCard,
  FaHeadset,
  FaMapMarkerAlt,
  FaPlane,
  FaShieldAlt,
  FaUmbrellaBeach,
  FaWhatsapp,
} from "react-icons/fa";
import { GiMayanPyramid } from "react-icons/gi";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOferts from "../../components/CardsOferts/CardsOferts";
import PriceResWidget from "../../components/PriceRes/PriceResWidget";

/* =========================================================
   DATOS DE LA HOME
   Mantener los textos en arreglos facilita editar el contenido
   sin tocar la estructura visual.
========================================================= */

const steps = [
  {
    number: "01",
    title: "Cuéntanos tu viaje",
    description:
      "Compártenos destino, fechas, ciudad de salida y número de viajeros.",
  },
  {
    number: "02",
    title: "Cazamos opciones",
    description:
      "Buscamos alternativas y ofertas que se adapten a lo que necesitas.",
  },
  {
    number: "03",
    title: "Elige y reserva",
    description:
      "Compara las opciones disponibles y reserva la que más te convenga.",
  },
];

const benefits = [
  {
    title: "Ofertas seleccionadas",
    description:
      "Revisamos promociones y tarifas para ayudarte a encontrar mejores opciones.",
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
      "Recibe apoyo para resolver dudas antes y después de reservar.",
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
      <FaCheck className="text-[10px]" aria-hidden="true" />
    </span>
  );
}

export default function HomeNew() {
  return (
    <React.Fragment>
      <SEO
        title="Ofertas de Viajes, Hoteles y Paquetes"
        description="Encuentra ofertas de viajes, hoteles, vuelos, paquetes y tours en México. Viaja más y paga menos con Viaja a tu Destino."
        image="https://www.viajaatudestino.com/IMAGEN-SEO-HOME.jpg"
        url="https://www.viajaatudestino.com/"
      />

      <div className="flex min-h-screen flex-col bg-[#f5f8fc]">
        <NavBar />

        <main className="flex-1">
          {/* =====================================================
              PRICERES: CARRUSEL + MOTOR DE BÚSQUEDA
              Primer bloque de la Home después del NavBar.
          ====================================================== */}
          <section className="bg-white">
            <PriceResWidget
              showCarousel
              title="Buscador de hoteles, paquetes, vuelos y viajes"
            />
          </section>

          {/* =====================================================
              OFERTAS DESTACADAS
              Aparecen pronto para que el usuario llegue al valor
              principal de la home sin recorrer demasiado contenido.
          ====================================================== */}
          <section
            id="ofertas"
            className="scroll-mt-24 bg-white px-4 pb-14 pt-10 sm:px-6 sm:pt-12 md:pb-20 md:pt-14 lg:px-8"
            aria-labelledby="ofertas-title"
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#ff6600]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#e85d00]">
                    <FaBolt aria-hidden="true" />
                    Ofertas destacadas
                  </span>

                  <h2
                    id="ofertas-title"
                    className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl"
                  >
                    Ofertas que vale la pena revisar
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                    Explora promociones seleccionadas para hoteles, paquetes y
                    experiencias dentro y fuera de México.
                  </p>
                </div>

                <Link
                  to="/ofertas"
                  className="hidden min-h-[48px] w-fit items-center justify-center gap-3 rounded-xl border-2 border-[#0260fe] bg-white px-5 py-3 text-sm font-black text-[#0260fe] transition hover:bg-[#0260fe] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] lg:inline-flex"
                >
                  Ver todas
                  <FaArrowRight className="text-xs" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8">
                <CardsOferts />
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/ofertas"
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-7 py-3.5 font-black text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe] lg:hidden"
                >
                  Descubrir más ofertas
                  <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* =====================================================
              DESTINOS
          ====================================================== */}
          <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#ff6600]">
                  Destinos favoritos
                </span>
                <h2 className="mt-3 text-3xl font-black text-[#023e73] sm:text-4xl">
                  Inspírate para tu próxima aventura
                </h2>
                <p className="mt-4 leading-7 text-slate-600">
                  Explora algunos de los destinos más buscados por nuestros
                  viajeros.
                </p>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featuredDestinations.map((destination) => {
                  const Icon = destination.icon;

                  return (
                    <Link
                      key={destination.name}
                      to="/ofertas"
                      className={`group relative min-h-[250px] overflow-hidden rounded-3xl bg-gradient-to-br ${destination.gradient} p-6 text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0260fe]`}
                    >
                      <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/10 transition duration-500 group-hover:scale-125" />
                      <div className="absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-black/10" />

                      <div className="relative flex h-full flex-col justify-between">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                          <Icon className="text-xl" aria-hidden="true" />
                        </span>

                        <div>
                          <h3 className="text-2xl font-black">
                            {destination.name}
                          </h3>
                          <p className="mt-2 leading-6 text-white/80">
                            {destination.description}
                          </p>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-black">
                            Ver ofertas
                            <FaArrowRight
                              className="text-xs transition group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* =====================================================
              CÓMO FUNCIONA
              Antes estaba definido en `steps`, pero no se mostraba.
          ====================================================== */}
          <section className="bg-white px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                  Así funciona
                </span>
                <h2 className="mt-3 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl">
                  Encontrar tu viaje puede ser más sencillo
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                  Si no encuentras una oferta publicada que se adapte a ti,
                  podemos ayudarte a buscar alternativas.
                </p>
              </div>

              <div className="mt-9 grid gap-4 md:grid-cols-3">
                {steps.map((step, index) => (
                  <article
                    key={step.number}
                    className="relative rounded-3xl border border-slate-200 bg-[#f8faff] p-6 sm:p-7"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-black tracking-[-0.05em] text-[#0260fe]/20">
                        {step.number}
                      </span>
                      {index < steps.length - 1 ? (
                        <FaArrowRight
                          className="hidden text-slate-300 md:block"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>

                    <h3 className="mt-5 text-xl font-black text-[#023e73]">
                      {step.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =====================================================
              POR QUÉ ELEGIRNOS
          ====================================================== */}
          <section className="px-4 py-14 sm:px-6 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div className="lg:sticky lg:top-24">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0260fe]">
                    Nuestra forma de ayudarte
                  </span>

                  <h2 className="mt-3 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
                    Somos cazadores de ofertas de viaje
                  </h2>

                  <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
                    Buscamos alternativas, promociones y precios especiales para
                    ayudarte a encontrar opciones que se adapten a tus planes.
                  </p>

                  <div className="mt-6 space-y-3.5">
                    {[
                      "Atención completamente en línea.",
                      "Opciones para parejas, familias y grupos.",
                      "Hoteles, paquetes y tours.",
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
                    className="mt-7 inline-flex min-h-[48px] items-center gap-3 rounded-xl bg-[#023e73] px-6 py-3.5 text-sm font-black text-white transition hover:bg-[#0260fe] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023e73]"
                  >
                    Conoce más de nosotros
                    <FaArrowRight className="text-xs" aria-hidden="true" />
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <article
                        key={benefit.title}
                        className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#0260fe]/25 hover:shadow-lg sm:p-7"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0260fe]/10 text-[#0260fe] transition group-hover:bg-[#0260fe] group-hover:text-white">
                          <Icon className="text-xl" aria-hidden="true" />
                        </span>

                        <h3 className="mt-5 text-xl font-black text-[#023e73]">
                          {benefit.title}
                        </h3>
                        <p className="mt-2.5 leading-7 text-slate-600">
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
          <section className="px-4 pb-16 pt-2 sm:px-6 md:pb-24 lg:px-8">
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0260fe] via-[#086ee9] to-[#3794ff] p-7 text-white shadow-xl sm:p-10 lg:p-14">
              <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-[#ff6600]/25 blur-3xl" />

              <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-3xl">
                  <span className="text-xs font-black uppercase tracking-[0.18em] text-white/65">
                    Tu próximo viaje comienza aquí
                  </span>
                  <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
                    ¿No encontraste la oferta que necesitas?
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 md:text-lg md:leading-8">
                    Escríbenos tu destino, fechas, ciudad de salida y número de
                    viajeros. Te ayudaremos a buscar opciones.
                  </p>
                </div>

                <a
                  href="https://wa.me/529984954637?text=Hola,%20quiero%20encontrar%20una%20oferta%20de%20viaje.%0A%0ADestino:%20%0AFechas:%20%0ACiudad%20de%20salida:%20%0ANúmero%20de%20viajeros:%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[54px] flex-none items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-7 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <FaWhatsapp className="text-2xl" aria-hidden="true" />
                  Cotizar por WhatsApp
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
