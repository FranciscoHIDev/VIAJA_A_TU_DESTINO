// import Affiliates from "./components/Affiliates/Affiliates";
import CardsOffers from "./components/CardsOffers/CardsOffers";
import NavBar from "./components/NavBar/NavBar";
import CardsHotels from "./components/CardsHotels/CardsHotels";
// import Banner from "./components/Banner/Banner";

function App() {
  return (
    <div>
      <NavBar />
      <CardsHotels />
      {/* <Banner /> */}
      <CardsOffers />
    </div>
  );
}

export default App;
