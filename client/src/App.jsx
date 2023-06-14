import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ContextProvider } from "./Context";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FrequentQuestions from "./pages/FrequentQuestions/FrequentQuestions";
import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Details from "./pages/Details/Details";
import NotFound from "./pages/NotFound/NotFound";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

function App() {
  return (
    <div>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ComingSoon />} />
            <Route path="/home" element={<Home />} />
            <Route exact path="/oferta/:id" element={<Details />} />
            <Route path="/sobre-nosotros" element={<About />} />
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
