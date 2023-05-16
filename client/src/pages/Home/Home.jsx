import React from "react";
import CardsBanners from "../../components/CardsBanners/CardsBanners";
import CardsHotels from "../../components/CardsHotels/CardsHotels";
import NavBar from "../../components/NavBar/NavBar";
import CardsPackages from "./../../components/CardsPackages/CardsPackages";
import "./Home.css";

function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container-home">
        <div className="items-offers-home">
          <div className="offers-home-title">
            <h1 className="title-banner-home">
              Reserva vuelos y hoteles a los mejores precios con nosotros
            </h1>
            <p className="title-banner-home">
              Cancelación Gratis en miles de Hoteles
            </p>
          </div>

          <div>
            <CardsBanners />
          </div>
        </div>
        <div className="title-banner-home">
          <h1>
            Encuentra los paquetes con Vuelo + Hotel a tu destino favorito
          </h1>
          <CardsPackages />
        </div>
        <div>
          <h1>Hoteles con hasta 65% de descuento</h1>
          <CardsHotels />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
