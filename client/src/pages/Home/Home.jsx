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
        <div id="ptw-container" class="ptw-horizontal-search bookerContainer">
          <script>
            jQuery(function(){
              var hash = window.location.hash.substring(1);
              if(jQuery.trim(hash)){
                jQuery('#main_booker').remove();
                var script = document.createElement('script');
                var main = "//widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=true&CurrentSection={}&CurrentEngine={}&ShowProducts=true&ShowHiddenTabs=true&EngineConfigs[0].Engine=1&SectionConfigs[0].SectionTab=1&SectionConfigs[0].DefaultEngine=1&EngineConfigs[1].Engine=2&SectionConfigs[1].SectionTab=2&SectionConfigs[1].DefaultEngine=2&EngineConfigs[2].Engine=3&SectionConfigs[2].SectionTab=3&SectionConfigs[2].DefaultEngine=3&EngineConfigs[3].Engine=4&SectionConfigs[3].SectionTab=4&SectionConfigs[3].DefaultEngine=4&EngineConfigs[4].Engine=5&SectionConfigs[4].SectionTab=5&SectionConfigs[4].DefaultEngine=5&EngineConfigs[5].Engine=6&SectionConfigs[5].SectionTab=6&SectionConfigs[5].DefaultEngine=6&EngineConfigs[6].Engine=7&SectionConfigs[6].SectionTab=7&SectionConfigs[6].DefaultEngine=7&EngineConfigs[7].Engine=9&SectionConfigs[7].SectionTab=8&SectionConfigs[7].DefaultEngine=9&EngineConfigs[8].Engine=10&SectionConfigs[8].SectionTab=9&SectionConfigs[8].DefaultEngine=10&EngineConfigs[9].Engine=8&SectionConfigs[9].SectionTab=3&SectionConfigs[9].DefaultEngine=3&IsHorizontal=true"
                var res = main.replace(/{}/g, hash);
                script.id = 'main_booker';
                script.src = res;
                script.type ='text/javascript';
                if(hash == '8'){
                  script.src = "//widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=true&CurrentSection=8&CurrentEngine=9&ShowProducts=true&ShowHiddenTabs=true&EngineConfigs[0].Engine=1&SectionConfigs[0].SectionTab=1&SectionConfigs[0].DefaultEngine=1&EngineConfigs[1].Engine=2&SectionConfigs[1].SectionTab=2&SectionConfigs[1].DefaultEngine=2&EngineConfigs[2].Engine=3&SectionConfigs[2].SectionTab=3&SectionConfigs[2].DefaultEngine=3&EngineConfigs[3].Engine=4&SectionConfigs[3].SectionTab=4&SectionConfigs[3].DefaultEngine=4&EngineConfigs[4].Engine=5&SectionConfigs[4].SectionTab=5&SectionConfigs[4].DefaultEngine=5&EngineConfigs[5].Engine=6&SectionConfigs[5].SectionTab=6&SectionConfigs[5].DefaultEngine=6&EngineConfigs[6].Engine=7&SectionConfigs[6].SectionTab=7&SectionConfigs[6].DefaultEngine=7&EngineConfigs[7].Engine=9&SectionConfigs[7].SectionTab=8&SectionConfigs[7].DefaultEngine=9&EngineConfigs[8].Engine=10&SectionConfigs[8].SectionTab=9&SectionConfigs[8].DefaultEngine=10&EngineConfigs[9].Engine=8&SectionConfigs[9].SectionTab=3&SectionConfigs[9].DefaultEngine=3&IsHorizontal=true";
                }
                if(hash == '9'){
                  script.src = "//widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=true&CurrentSection=9&CurrentEngine=10&ShowProducts=true&ShowHiddenTabs=true&EngineConfigs[0].Engine=1&SectionConfigs[0].SectionTab=1&SectionConfigs[0].DefaultEngine=1&EngineConfigs[1].Engine=2&SectionConfigs[1].SectionTab=2&SectionConfigs[1].DefaultEngine=2&EngineConfigs[2].Engine=3&SectionConfigs[2].SectionTab=3&SectionConfigs[2].DefaultEngine=3&EngineConfigs[3].Engine=4&SectionConfigs[3].SectionTab=4&SectionConfigs[3].DefaultEngine=4&EngineConfigs[4].Engine=5&SectionConfigs[4].SectionTab=5&SectionConfigs[4].DefaultEngine=5&EngineConfigs[5].Engine=6&SectionConfigs[5].SectionTab=6&SectionConfigs[5].DefaultEngine=6&EngineConfigs[6].Engine=7&SectionConfigs[6].SectionTab=7&SectionConfigs[6].DefaultEngine=7&EngineConfigs[7].Engine=9&SectionConfigs[7].SectionTab=8&SectionConfigs[7].DefaultEngine=9&EngineConfigs[8].Engine=10&SectionConfigs[8].SectionTab=9&SectionConfigs[8].DefaultEngine=10&EngineConfigs[9].Engine=8&SectionConfigs[9].SectionTab=3&SectionConfigs[9].DefaultEngine=3&IsHorizontal=true";
                }
                document.getElementsByTagName('head')[0].appendChild(script);
              }
              else{
                var script = document.createElement('script');
                var main = "//widgets.priceres.com.mx/viaja-a-tu-destino/jsonpBooker/startWidget?container=ptw-container&UseConfigs=false&IsHorizontal=true"
                script.id = 'main_booker';
                script.src = main;
                script.type ='text/javascript';
                document.getElementsByTagName('head')[0].appendChild(script);
              }
               var idHash = '#s' + hash;
                if (hash == "") {
                    jQuery('#s3').addClass('current');
                } else {
                    jQuery(idHash).addClass('current');
                }
            });
          </script> 
        </div>   
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
