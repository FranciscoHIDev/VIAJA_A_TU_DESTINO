import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import CardsFlights from "../../components/CardsFlights/CardsFlights";
function Flights() {
  return (
    <>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow mt-5 mb-20">
          <div className="flex flex-col  md:mx-[40px] mx-3">
            <div>
              <h1 className="ml-[20px] md:text-2xl text-[20px] text-[#253777] font-semibold">
                Vuelos con hasta 65% de descuento
              </h1>
              <p className="ml-[20px] md:text-[18px] mt-1">
                Encuentras las mejores tarifas aéreas
              </p>
            </div>
            <div>
              <CardsFlights />
            </div>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Flights;
