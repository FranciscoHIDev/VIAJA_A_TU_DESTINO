// import Affiliates from "./components/Affiliates/Affiliates";
import CardsOffers from "./components/CardsOffers/CardsOffers";
import NavBar from "./components/NavBar/NavBar";
import CardsHotels from "./components/CardsHotels/CardsHotels";
// import Banner from "./components/Banner/Banner";
import CardsPackages from "./components/CardsPackages/CardsPackages";
import CardsBanners from "./components/CardsBanners/CardsBanners";

function App() {
  return (
    <div>
      <NavBar />
      <CardsBanners />
      <CardsPackages />
      <CardsHotels />
      {/* <Banner /> */}
      <CardsOffers />
    </div>
  );
}

export default App;
