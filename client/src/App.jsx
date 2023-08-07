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
import Packages from "./pages/Packages/Packages";
import Offers from "./pages/Offers/Offers";
import Destinations from "./pages/Destinations/Destinations";
import LayoutAdmin from "./LayoutAdmin/LayoutAdmin";
import OffersAdmin from "./LayoutAdmin/pages/OffersAdmin";
import PackagesAdmin from "./LayoutAdmin/pages/PackagesAdmin";
import HomeAdmin from "./LayoutAdmin/pages/HomeAdmin";
import NewOffer from "./LayoutAdmin/pages/NewOffer";
import NewHotel from "./LayoutAdmin/pages/NewHotel";
import NewFligth from "./LayoutAdmin/pages/NewFligth";
import NewFlight from "./LayoutAdmin/pages/NewFligth";
import NewTour from "./LayoutAdmin/pages/NewTour";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<ComingSoon />} /> */}
          <Route path="/" element={<Home />} />
          <Route exact path="/oferta/:id" element={<Details />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/hoteles" element={<Hotels />} />
          <Route path="/paquetes" element={<Packages />} />
          <Route path="/ofertas-de-viajes" element={<Offers />} />
          <Route path="/destinos" element={<Destinations />} />
          <Route path="/auth" element={<LayoutAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="ofertas" element={<OffersAdmin />} />
            <Route path="paquetes" element={<PackagesAdmin />} />
            <Route path="new-package" element={<NewOffer />} />
            <Route path="new-hotel" element={<NewHotel />} />
            <Route path="new-flight" element={<NewFlight />} />
            <Route path="new-tour" element={<NewTour />} />
          </Route>

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
