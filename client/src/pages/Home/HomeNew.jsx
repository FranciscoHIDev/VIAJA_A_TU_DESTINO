import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOferts from "../../components/CardsOferts/CardsOferts";

export default function HomeNew() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <section className="bg-gradient-to-b from-gray-950 via-black to-gray-900 min-h-[650px] flex items-center justify-center px-2">
        <div className="w-full mx-60 text-center">
          {/* Texto */}
          <div className="max-w-4xl mx-auto">
            <span className="inline-block bg-[#ff6600]/10 border border-[#ff6600]/30 text-[#ff6600] px-5 py-2 rounded-full text-sm md:text-base font-semibold uppercase tracking-wider">
              Cazadores de Ofertas de Viajes
            </span>

            <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
              Cazamos las mejores
              <br />
              ofertas de viaje para ti
            </h2>

            <p className="mt-6 text-lg md:text-2xl text-gray-300">
              Hoteles, vuelos y paquetes todo incluido al mejor precio
            </p>
          </div>

          {/* Buscador */}
          <div className="mt-10 h-12">
            <div id="ptw-container" className="ptw-horizontal-search"></div>
          </div>
        </div>
      </section>

      <div className="bg-white text-gray-900">
        {/* HERO */}

        {/* COMO FUNCIONA */}
        {/* <section className="py-20 px-6 max-w-8xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Qué tipo de viaje estás buscando?
          </h2>
          <p className="text-center text-gray-500 mt-3 text-[17px]">
            Descubre todas las experiencias que tenemos para ti
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-12">
            <div>
              <p className="text-4xl text-[#0260fe]">🔍</p>
              <h3 className="font-bold mt-3 text-[18px]">
                Buscamos ofertas reales
              </h3>
              <p className="text-gray-600 mt-2 text-[16px] ">
                Analizamos precios en tiempo real.
              </p>
            </div>

            <div>
              <p className="text-4xl text-[#3794ff]">⚡</p>
              <h3 className="font-bold mt-3 text-[18px]">Filtramos lo mejor</h3>
              <p className="text-gray-600 mt-2 text-[16px]">
                Solo lo más barato y confiable.
              </p>
            </div>

            <div>
              <p className="text-4xl text-[#ff6600]">📲</p>
              <h3 className="font-bold mt-3 text-[18px]">Te lo enviamos</h3>
              <p className="text-gray-600 mt-2 text-[16px]">
                Directo a WhatsApp listo para reservar.
              </p>
            </div>
          </div>
        </section> */}

        {/* OFERTAS */}
        <section id="ofertas" className="bg-white py-20 px-6">
          <div className=" mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center">
              ¡Encuentra tu viaje al mejor precio!
            </h2>

            <p className="text-center text-gray-500 mt-3 text-[17px]">
              Encuentra lo más destacado y mucho más
            </p>

            <div>
              <CardsOferts />
            </div>
          </div>
        </section>

        {/* DIFERENCIADOR */}
        <section className="bg-[#0260fe] text-white py-24 px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            No somos una agencia tradicional ✈️
          </h2>

          <p className="text-blue-100 mt-6 max-w-3xl mx-auto text-[19px]">
            Somos cazadores de ofertas: encontramos precios ocultos y
            promociones reales.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-12 max-w-5xl mx-auto">
            <div>
              <h3 className="font-bold text-[#ff6600] text-3xl">
                ⚡ Velocidad
              </h3>
              <p className="text-blue-100 mt-2 text-[17px]">
                Reserva en minutos
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#ff6600] text-3xl">
                🔥 Ofertas reales
              </h3>
              <p className="text-blue-100 mt-2 text-[17px]">
                Precios increibles
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#ff6600] text-3xl">
                💳 Flexibilidad
              </h3>
              <p className="text-blue-100 mt-2 text-[17px]">
                Meses sin intereses
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-24 text-center bg-white">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Listo para encontrar tu próxima oferta? 🌎
          </h2>

          <p className="mt-4 text-gray-600 text-[20px]">
            Escríbenos y te enviamos opciones en minutos
          </p>

          <button
            href="https://api.whatsapp.com/send/?phone=5219984954637&text&type=phone_number&app_absent=0"
            className="mt-8 inline-block bg-[#ff6600] hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold transition text-2xl"
          >
            🚀 Cazar oferta ahora
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
}
