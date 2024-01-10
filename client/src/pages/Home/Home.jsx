import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsOffers from "../../components/CardsOffers/CardsOffers";
import Filters from "../../components/Filters/Filters";
import FiltersMobile from "../../components/Filters/FiltersMobile";
import CardsTops from "../../components/CardsTops/CardsTops";


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
              <div className="flex flex-col justify-center bg-[#2e3b69] pb-10 ">
                <div className="flex flex-col mt-10 items-center">
                  <h2 className="md:text-4xl text-2xl text-white font-semibold">
                    TOP OFERTAS
                  </h2>
                  <p className="mt-2 md:text-2xl text-[18px] text-white">
                    ¡Últimas ofertas encontradas!
                  </p>
                </div>
                <div className="md:px-0 px-3 md:mt-[-8px] mt-[-15px]">
                  <CardsTops />
                </div>
              </div>
            </div>
            <div className="flex flex-col  mt-8">
              <div className="flex flex-col justify-center items-center">
                <h2 className="md:text-5xl text-2xl text-[#253777] font-semibold ">
                  Las mejores ofertas de viajes
                </h2>
                <p className="md:text-2xl  text-[20px] mt-2">
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
