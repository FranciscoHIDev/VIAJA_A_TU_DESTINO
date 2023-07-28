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
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow mt-5">
          <div className="flex flex-col md:mx-[40px] mx-3 mb-20">
            <div className="flex flex-col">
              <div>
                <h1 className="ml-[20px] md:text-2xl text-[20px] text-[#253777] font-semibold ">
                  Diseñamos las mejores ofertas de viajes para ti
                </h1>
                <p className="ml-[20px]  md:text-[18px]  mt-1">
                  Diariamente buscamos las mejores tarifas ¡reserva facil,
                  rapido y seguro!{" "}
                </p>
              </div>
              <div>
                <CardsBanners />
              </div>
              <div className="mt-10">
                <h1 className="ml-[20px] md:text-2xl text-[20px] text-[#253777] font-semibold ">
                  Encuentra la oferta a tu destino favorito, y disfruta de tus
                  vacaciones
                </h1>
                <p></p>
                <div>
                  <CardsOffers />
                </div>
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
