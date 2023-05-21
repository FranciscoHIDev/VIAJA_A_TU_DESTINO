import React from "react";
import CardsBanners from "../../components/CardsBanners/CardsBanners";
import CardsHotels from "../../components/CardsHotels/CardsHotels";
import NavBar from "../../components/NavBar/NavBar";
import CardsPackages from "./../../components/CardsPackages/CardsPackages";
import CardsOffers from "../../components/CardsOffers/CardsOffers";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow">
          <div className="flex flex-col mt-40 lg:mx-[40px] mx-3">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="ml-[10px] text-2xl">
                  Reserva vuelos y hoteles a los mejores precios con nosotros
                </h1>
                <p className="text-[20px] ml-[10px]">
                  Cancelación Gratis en miles de Hoteles
                </p>
              </div>
              <div>
                <CardsBanners />
                <CardsOffers />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <h1 className="ml-[10px] text-2xl">
                  Encuentra los paquetes con Vuelo + Hotel a tu destino favorito
                </h1>
                <p className="ml-[10px]">Disfruta de las ofertas</p>
              </div>
              <div>
                <CardsPackages />
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                <h1 className="ml-[10px] text-2xl">
                  Hoteles con hasta 65% de descuento
                </h1>
              </div>
              <div>
                <CardsHotels />
              </div>
            </div>
          </div>
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Home;
