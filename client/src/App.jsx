import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import FrequentQuestions from "./pages/FrequentQuestions/FrequentQuestions";
import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-nosotros" element={<About />} />
        <Route path="/preguntas-frecuentes" element={<FrequentQuestions />} />
        <Route path="/aviso-de-privacidad" element={<NoticeOfPrivacy />} />
        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />
        <Route path="/terminos-y-condiciones" element={<TermsAndConditions/>}/>
      </Routes>
    </div>
  );
}

export default App;
