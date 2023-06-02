import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FrequentQuestions from "./pages/FrequentQuestions/FrequentQuestions";
import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Details from "./pages/Details/Details";
import NotFound from "./pages/NotFound/NotFound";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/oferta/:id" element={<Details />} />
          <Route path="/sobre-nosotros" element={<About />} />
          <Route path="/preguntas-frecuentes" element={<FrequentQuestions />} />
          <Route path="/aviso-de-privacidad" element={<NoticeOfPrivacy />} />
          <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
          <Route
            path="/terminos-y-condiciones"
            element={<TermsAndConditions />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
