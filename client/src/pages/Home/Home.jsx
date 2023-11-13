import React from "react";
import CardsBanners from "../../components/CardsBanners/CardsBanners";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOffers from "../../components/CardsOffers/CardsOffers";
import Filters from "../../components/Filters/Filters";
import FiltersMobile from "../../components/Filters/FiltersMobile";
import BannerTravel from "../../components/BannerTravel/BannerTRavel";

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
                {/* <CardsBanners /> */}
                <BannerTravel />
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <div className="flex flex-col items-center">
                <h2 className="md:text-5xl text-[20px] text-[#253777] font-semibold ">
                  Las mejores ofertas de viajes{" "}
                </h2>
                <p className="text-[20px] mt-2">
                  ¡Reserva facil, rápido y seguro!
                </p>
              </div>
              <div className="mt-12">
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
