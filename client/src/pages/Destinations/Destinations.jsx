import NavBar from "./../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Destinations() {
  return (
    <>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow mt-5">
          <div>
            <h1></h1>
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default Destinations;
