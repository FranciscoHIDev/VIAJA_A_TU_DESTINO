import CardsTours from "../../components/CardsTours/CardsTours";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Tours() {
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
                Tours con precios increibles
              </h1>
              <p className="ml-[20px] md:text-[18px] mt-1">
                Descubre las activades más divertidas y emocionantes!
              </p>
            </div>
            <div>
              <CardsTours />
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

export default Tours;
