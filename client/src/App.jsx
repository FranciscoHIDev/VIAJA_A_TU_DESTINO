import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FrequentQuestions from "./pages/FrequentQuestions/FrequentQuestions";
import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Details from "./pages/Details/Details";
import NotFound from "./pages/NotFound/NotFound";
import Hotels from "./pages/Hotels/Hotels";
import Destinations from "./pages/Destinations/Destinations";
import LayoutAdmin from "./LayoutAdmin/LayoutAdmin";
import LayoutProfile from "./LayoutProfile/LayoutProfile";
import OffersAdmin from "./LayoutAdmin/pages/OffersAdmin";
import PackagesAdmin from "./LayoutAdmin/pages/PackagesAdmin";
import HomeAdmin from "./LayoutAdmin/pages/HomeAdmin";
import NewOffer from "./LayoutAdmin/pages/NewOffer";
import NewHotel from "./LayoutAdmin/pages/NewHotel";
import NewFlight from "./LayoutAdmin/pages/NewFligth";
import NewTour from "./LayoutAdmin/pages/NewTour";
import Tours from "./pages/Tours/Tours";
import Flights from "./pages/Flights/Flights";
import Packages from "./pages/Packages/Packages";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Favorites from "./LayoutProfile/pages/Favorites";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/oferta/:id" element={<Details />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/hoteles" element={<Hotels />} />
          <Route path="/paquetes" element={<Packages />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/destinos" element={<Destinations />} />
          <Route path="/vuelos" element={<Flights />} />
          <Route path="/auth" element={<LayoutAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="ofertas" element={<OffersAdmin />} />
            <Route path="paquetes" element={<PackagesAdmin />} />
            <Route path="new-package" element={<NewOffer />} />
            <Route path="new-hotel" element={<NewHotel />} />
            <Route path="new-flight" element={<NewFlight />} />
            <Route path="new-tour" element={<NewTour />} />
          </Route>
          <Route path="/mi-perfil" element={<LayoutProfile />}></Route>
          <Route path="mi-perfil/favoritos" element={<Favorites />} />
          <Route path="/preguntas-frecuentes" element={<FrequentQuestions />} />
          <Route path="/aviso-de-privacidad" element={<NoticeOfPrivacy />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route
            path="/terminos-y-condiciones"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
