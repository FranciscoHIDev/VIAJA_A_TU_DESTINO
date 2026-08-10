import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";
import Details from "./pages/Details/Details";
import NotFound from "./pages/NotFound/NotFound";
import Hotels from "./pages/Hotels/Hotels";
import Destinations from "./pages/Destinations/Destinations";
import LayoutAdmin from "./LayoutAdmin/LayoutAdmin";
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
import BlogPage from "./pages/Blog/BlogPage";
import HomeNew from "./pages/Home/HomeNew";
import AboutUs from "./pages/AboutUs/AboutUs";
import Offers from "./pages/Offerts/Offerts";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute/ProtectedAdminRoute.jsx";
import InsightsAdmin from "./LayoutAdmin/pages/InsightsAdmin.jsx";
function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/ofertas" element={<Offers />} />
          <Route exact path="/oferta/:id" element={<Details />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/hoteles" element={<Hotels />} />
          <Route path="/paquetes" element={<Packages />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/destinos" element={<Destinations />} />
          <Route path="/vuelos" element={<Flights />} />
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/auth" element={<LayoutAdmin />}>
              <Route index element={<HomeAdmin />} />
              <Route path="insights" element={<InsightsAdmin />} />
              <Route path="ofertas" element={<OffersAdmin />} />
              <Route path="paquetes" element={<PackagesAdmin />} />
              <Route path="new-package" element={<NewOffer />} />
              <Route path="ofertas/:id/editar" element={<NewOffer />} />
              <Route path="new-hotel" element={<NewHotel />} />
              <Route path="hoteles/:id/editar" element={<NewHotel />} />
              <Route path="new-flight" element={<NewFlight />} />
              <Route path="vuelos/:id/editar" element={<NewFlight />} />
              <Route path="new-tour" element={<NewTour />} />
              <Route path="tours/:id/editar" element={<NewTour />} />
            </Route>
          </Route>

          <Route path="/acerca-de-nosotros" element={<AboutUs />} />
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
