import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FrequentQuestions from "./pages/FrequentQuestions/FrequentQuestions";
import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Details from "./pages/Details/Details";
import NotFound from "./pages/NotFound/NotFound";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import { ContextProvider } from "./ContextGlobal/ContextGlobal";
import Hotels from "./pages/Hotels/Hotels";
import Packages from "./pages/Packages/Packages";
import Offers from "./pages/Offers/Offers";
import Destinations from "./pages/Destinations/Destinations";
import LayoutAdmin from "./LayoutAdmin/LayoutAdmin";

function App() {
  return (
    <div>
      <ContextProvider>
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
            <Route path="/auth" element={<LayoutAdmin />} />
            <Route
              path="/preguntas-frecuentes"
              element={<FrequentQuestions />}
            />
            <Route path="/aviso-de-privacidad" element={<NoticeOfPrivacy />} />
            <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
            <Route
              path="/terminos-y-condiciones"
              element={<TermsAndConditions />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
