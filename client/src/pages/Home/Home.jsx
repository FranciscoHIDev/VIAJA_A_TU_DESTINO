import React from "react";
import CardsBanners from "../../components/CardsBanners/CardsBanners";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOffers from "../../components/CardsOffers/CardsOffers";
import Filters from "../../components/Filters/Filters";
import FiltersMobile from "../../components/Filters/FiltersMobile";

function Home() {
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow">
          <div className="flex flex-col  mb-20">
            <div className="flex flex-col">
              <div className="flex justify-center">
                <CardsBanners />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div>
                <div className="md:mx-[30px] mx-[10px]">
                  <h1 className="md:text-2xl text-[20px] text-[#253777] font-semibold ">
                    Encuentra la oferta a tu destino favorito, y disfruta de tus
                    vacaciones
                  </h1>
                </div>
              </div>
              <div className="mt-3  ">
                <FiltersMobile />
                <Filters />
                <CardsOffers />
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
