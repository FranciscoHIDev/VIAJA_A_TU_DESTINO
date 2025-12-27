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
              
              <div className="flex flex-col justify-center bg-[#3794ff] pb-20 ">
                <div className="flex flex-col justify-center items-center">
                <h2 className="md:text-5xl text-2xl text-white font-semibold mt-10 md:mx-10 mx-5 text-center" >
                  Reserva las mejores ofertas de viajes
                </h2>
                <p className="md:text-2xl  text-[20px] mt-4 text-white text-center">
                  ¡Reserva facil, rápido y seguro!
                </p>
              </div>
                <div className="flex flex-col mt-10 md:mx-40 mx-2">
                   <div id="ptw-container" class="ptw-horizontal-search"></div>
<script type="text/javascript" src="https://widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=false&IsHorizontal=true"></script>
                  
            
           </div>
                
              </div>
            </div>
            <div className="flex flex-col  mt-2">
              <div className="flex justify-center">
<h2 className="md:text-5xl text-3xl text-[#3794FF] font-semibold mt-3">
                  Descubre las ofertas Top
                </h2>
              </div>
              
              <CardsTops/>
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
