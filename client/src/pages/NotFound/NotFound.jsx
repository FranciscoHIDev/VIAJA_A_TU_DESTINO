import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaMapMarkerAlt,
  FaPlane,
  FaWhatsapp,
} from "react-icons/fa";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f8ff]">
      <header className="relative z-50">
        <NavBar />
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Elementos decorativos */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#0260fe]/10 blur-3xl" />

        <div className="pointer-events-none absolute -right-36 bottom-0 h-96 w-96 rounded-full bg-[#ff6600]/10 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
          {/* Contenido */}
          <section className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0260fe]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0260fe] shadow-sm">
              <FaMapMarkerAlt />
              Destino no encontrado
            </span>

            <div className="relative mx-auto mt-6 inline-flex lg:mx-0">
              <span className="bg-gradient-to-r from-[#023e73] via-[#0260fe] to-[#3794ff] bg-clip-text text-[110px] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[150px] md:text-[180px]">
                404
              </span>

              <span className="absolute -right-5 top-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ff6600] text-white shadow-lg sm:-right-8 sm:h-16 sm:w-16">
                <FaPlane className="rotate-[-18deg] text-2xl sm:text-3xl" />
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-black leading-tight text-[#023e73] sm:text-4xl md:text-5xl">
              Parece que esta ruta no llega a ningún destino
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg lg:mx-0">
              La página que buscas no existe, cambió de dirección o ya no se
              encuentra disponible. Regresa al inicio o continúa explorando
              nuestras ofertas de viaje.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0260fe] px-7 py-4 text-sm font-black text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-[#014fd3] hover:shadow-xl"
              >
                <FaHome />
                Ir al inicio
              </Link>

              <Link
                to="/ofertas"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-[#0260fe] bg-white px-7 py-4 text-sm font-black text-[#0260fe] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0260fe] hover:text-white"
              >
                <FaPlane />
                Ver ofertas
              </Link>

              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-7 py-4 text-sm font-black text-slate-600 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-[#023e73] hover:shadow-md"
              >
                <FaArrowLeft />
                Regresar
              </button>
            </div>

            <div className="mt-8 border-t border-slate-200 pt-7">
              <p className="text-sm text-slate-500">
                ¿Necesitas ayuda para encontrar una oferta?
              </p>

              <a
                href="https://wa.me/529982830657?text=Hola,%20necesito%20ayuda%20para%20encontrar%20una%20oferta%20de%20viaje."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 font-black text-[#25D366] transition hover:text-[#1da851]"
              >
                <FaWhatsapp className="text-xl" />
                Escríbenos por WhatsApp
              </a>
            </div>
          </section>

          {/* Ilustración */}
          <section
            className="relative mx-auto w-full max-w-xl"
            aria-hidden="true"
          >
            <div className="absolute -inset-5 rounded-[3rem] bg-gradient-to-br from-[#0260fe]/15 to-[#ff6600]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white p-6 shadow-2xl sm:p-9">
              {/* Cielo */}
              <div className="relative h-[380px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#dff2ff] via-[#ecf8ff] to-[#fff4e9] sm:h-[440px]">
                {/* Sol */}
                <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-[#ffb13b] shadow-[0_0_60px_rgba(255,177,59,0.45)]" />

                {/* Nubes */}
                <div className="absolute left-8 top-16 flex items-end">
                  <div className="h-8 w-20 rounded-full bg-white/90" />
                  <div className="-ml-14 h-14 w-14 rounded-full bg-white/90" />
                  <div className="-ml-4 h-10 w-16 rounded-full bg-white/90" />
                </div>

                <div className="absolute right-12 top-36 flex items-end opacity-80">
                  <div className="h-6 w-16 rounded-full bg-white" />
                  <div className="-ml-12 h-10 w-10 rounded-full bg-white" />
                </div>

                {/* Ruta del avión */}
                <svg
                  viewBox="0 0 500 300"
                  fill="none"
                  className="absolute inset-x-0 top-10 h-64 w-full"
                >
                  <path
                    d="M30 225C100 130 170 280 260 170C326 89 372 121 470 54"
                    stroke="#0260fe"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="10 14"
                    opacity="0.35"
                  />
                </svg>

                {/* Avión */}
                <div className="absolute right-16 top-24 flex h-20 w-20 rotate-[-15deg] items-center justify-center rounded-3xl bg-[#0260fe] text-white shadow-xl">
                  <FaPlane className="text-4xl" />
                </div>

                {/* Montañas */}
                <div className="absolute bottom-24 left-0 right-0">
                  <div className="absolute bottom-0 left-[-5%] h-36 w-[58%] rotate-6 rounded-[50%_50%_0_0] bg-[#85cba8]" />

                  <div className="absolute bottom-0 right-[-8%] h-44 w-[65%] -rotate-6 rounded-[50%_50%_0_0] bg-[#4eae88]" />
                </div>

                {/* Mar */}
                <div className="absolute bottom-0 h-32 w-full bg-gradient-to-b from-[#3bc6de] to-[#0260fe]">
                  <div className="absolute left-10 top-6 h-1 w-28 rounded-full bg-white/50" />
                  <div className="absolute right-12 top-16 h-1 w-36 rounded-full bg-white/40" />
                  <div className="absolute left-1/3 top-24 h-1 w-20 rounded-full bg-white/30" />
                </div>

                {/* Pin de destino */}
                <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 flex-col items-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#ff6600] text-white shadow-xl">
                    <FaMapMarkerAlt className="text-2xl" />
                  </div>

                  <div className="h-8 w-1 bg-white" />
                </div>
              </div>

              {/* Tarjeta inferior */}
              <div className="relative -mt-7 mx-4 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl">
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-[#ff6600]/10 text-[#ff6600]">
                  <FaMapMarkerAlt className="text-xl" />
                </span>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-400">
                    Ubicación desconocida
                  </p>

                  <p className="mt-1 font-black text-[#023e73]">
                    Busquemos una nueva ruta
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default NotFound;
