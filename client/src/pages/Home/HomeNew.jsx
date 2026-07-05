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

      <div className="bg-white text-gray-900">
        {/* HERO */}
        <section className="relative h-[92vh] flex items-center justify-center text-center">
          <img
            src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
            className="absolute inset-0 w-full h-full object-cover"
            alt="viajes caribe"
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 max-w-4xl px-6">
            <p className="text-[#ff6600] text-1xl font-semibold tracking-widest uppercase">
              Cazadores de Ofertas de Viajes
            </p>

            <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
              🔥 Cazamos las mejores ofertas de viaje para ti
            </h1>

            <p className="text-gray-200 mt-6 text-lg">
              Hoteles, vuelos y paquetes todo incluido al mejor precio
            </p>

            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="https://api.whatsapp.com/send/?phone=5219984954637&text&type=phone_number&app_absent=0"
                className="bg-[#ff6600] hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition text-[15px]"
              >
                📲 Cotizar ahora
              </a>

              <a
                href="#ofertas"
                className="border border-white text-white px-8 py-3 rounded-full bg-white hover:text-[#0260fe] transition text-[15px]"
              >
                Ver ofertas 🔎
              </a>
            </div>
          </div>
        </section>

        {/* BARRA INFO */}
        <section className="bg-[#0260fe] text-white py-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between text-sm px-4 gap-2 text-center text-[16px]">
            <p>✈️ Vuelos baratos</p>
            <p>🏨 Hoteles todo incluido</p>
            <p>💳 Meses sin intereses</p>
            <p>Pagos flexibles</p>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            ¿Cómo encontramos tu viaje? 🎯
          </h2>

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
        </section>

        {/* OFERTAS */}
        <section id="ofertas" className="bg-gray-50 py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              🔥 Ofertas que están volando
            </h2>

            <p className="text-center text-gray-500 mt-3 text-[16px]">
              Encuentra lo más destacado y mucho más
            </p>

            <div>
              <CardsOferts />
            </div>
          </div>
        </section>

        {/* DIFERENCIADOR */}
        <section className="bg-[#0260fe] text-white py-24 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            No somos una agencia tradicional ✈️
          </h2>

          <p className="text-blue-100 mt-6 max-w-3xl mx-auto text-[18px]">
            Somos cazadores de ofertas: encontramos precios ocultos y
            promociones reales.
          </p>

          <div className="grid md:grid-cols-3 gap-10 mt-12 max-w-5xl mx-auto">
            <div>
              <h3 className="font-bold text-[#ff6600] text-2xl">
                ⚡ Velocidad
              </h3>
              <p className="text-blue-100 mt-2 text-[16px]">
                Respuesta inmediata por WhatsApp
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#ff6600] text-2xl">
                🔥 Ofertas reales
              </h3>
              <p className="text-blue-100 mt-2 text-[16px]">
                Sin precios inflados
              </p>
            </div>

            <div>
              <h3 className="font-bold text-[#ff6600] text-2xl">
                💳 Flexibilidad
              </h3>
              <p className="text-blue-100 mt-2 text-[16px]">
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

          <a
            href="https://api.whatsapp.com/send/?phone=5219984954637&text&type=phone_number&app_absent=0"
            className="mt-8 inline-block bg-[#ff6600] hover:bg-orange-600 text-white px-10 py-4 rounded-full font-bold transition text-2xl"
          >
            🚀 Cazar oferta ahora
          </a>
        </section>
      </div>
      <Footer />
    </>
  );
}
