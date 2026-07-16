import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOferts from "../../components/CardsOferts/CardsOferts";

export default function HomeNew() {
  return (
    <>
      <NavBar />

      <section className=" relative flex items-center justify-center px-2 md:h-[450px] h-[170px]">
        <div>
          {/* Buscador */}

          <img
            src="https://res.cloudinary.com/duaysiozi/image/upload/v1784166724/z5qgffi2ipgyjltwnqls.png"
            className="absolute inset-0 w-full h-full object-cover"
            alt="caribe"
          />
        </div>
      </section>
      <div className="md:mt-[-190px] md:mx-60">
        <div id="ptw-container" className="ptw-horizontal-search"></div>
      </div>
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
          Somos cazadores de ofertas: encontramos precios ocultos y promociones
          reales.
        </p>

        <div className="grid md:grid-cols-3 gap-10 mt-12 max-w-5xl mx-auto">
          <div>
            <h3 className="font-bold text-[#ff6600] text-3xl">⚡ Velocidad</h3>
            <p className="text-blue-100 mt-2 text-[17px]">Reserva en minutos</p>
          </div>

          <div>
            <h3 className="font-bold text-[#ff6600] text-3xl">
              🔥 Ofertas reales
            </h3>
            <p className="text-blue-100 mt-2 text-[17px]">Precios increibles</p>
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

      <Footer />
    </>
  );
}
