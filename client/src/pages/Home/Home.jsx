import React from "react";
import CardsBanners from "../../components/CardsBanners/CardsBanners";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOffers from "../../components/CardsOffers/CardsOffers";
import Filters from "../../components/Filters/Filters";
import SearchBar from "../../components/SearchBar/SearchBar";

function Home() {
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow mt-5">
          <div className="flex flex-col md:mx-[10px] mx-3 mb-20">
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
              <div className="flex justify-center">
                <CardsBanners />
              </div>

              <div className="mt-10 flex flex-col justify-center">
                <h1 className="ml-[20px] md:text-2xl text-[20px] text-[#253777] font-semibold ">
                  Encuentra la oferta a tu destino favorito, y disfruta de tus
                  vacaciones
                </h1>
                {/* <SearchBar /> */}
                <div className="flex justify-center ">
                  <div className="grid grid-cols-1 md:grid-cols-6">
                    <div className="mt-5 ml-5">
                      <Filters />
                    </div>
                    <div className="md:col-span-5 ml-10 mt-5">
                      <p className="text-[#ff3e02]">
                        18{" "}
                        <span className="text-black">Ofertas encontradas</span>
                      </p>
                      <CardsOffers />
                    </div>
                  </div>
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
