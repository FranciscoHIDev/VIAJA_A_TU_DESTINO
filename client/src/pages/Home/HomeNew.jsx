import React from "react";
import { Link } from "react-router-dom";

import PageSEO from "../../components/PageSEO/PageSEO";

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

// =========================================================
// DATOS DE LA HOME
// Mantener los textos en arreglos facilita editar el contenido
// sin tocar la estructura visual.
// =========================================================

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

// =========================================================
// CHECK ICON
// =========================================================

function CheckIcon() {
  return (
    <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#0260fe]/10 text-[#0260fe]">
      <FaCheck className="text-[10px]" aria-hidden="true" />
    </span>
  );
}

// =========================================================
// HOME
// =========================================================

export default function HomeNew() {
  return (
    <React.Fragment>
      {/* =====================================================
          VTD SEO
          La configuración principal se obtiene desde:
          /api/page-seo/home

          Si la API SEO no está disponible, se utilizan
          estos valores como respaldo.
      ====================================================== */}

      <PageSEO
        pageKey="home"
        fallbackTitle="Cazadores de Ofertas de Viajes"
        fallbackDescription="Cazamos las mejores ofertas de viaje para ti: vuelos, hoteles, paquetes, tours y experiencias para tus próximas vacaciones."
        fallbackUrl="https://www.viajaatudestino.com/"
      />

      {/* =====================================================
          HOME
      ====================================================== */}

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
                    className="mt-4 text-3xl font-black leading-tight text-[#ED1C24] sm:text-4xl md:text-4xl"
                  >
                    SE VIENE EL BUEN FIN VIAJERO
                  </h2>

                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
                    Explora promociones seleccionadas para hoteles, paquetes y
                    experiencias dentro y fuera de México.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <CardsOferts />
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
