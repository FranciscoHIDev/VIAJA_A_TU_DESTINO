import { BrowserRouter, Route, Routes } from "react-router-dom";

// WEB PÚBLICA
import HomeNew from "./pages/Home/HomeNew";
import Offers from "./pages/Offerts/Offerts";
import Details from "./pages/Details/Details";
import Hotels from "./pages/Hotels/Hotels";
import Destinations from "./pages/Destinations/Destinations";
import Tours from "./pages/Tours/Tours";
import Flights from "./pages/Flights/Flights";
import Packages from "./pages/Packages/Packages";
import BlogPage from "./pages/Blog/BlogPage";
import AboutUs from "./pages/AboutUs/AboutUs";

import NoticeOfPrivacy from "./pages/NoticeOfPrivacy/NoticeOfPrivacy";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";

import NotFound from "./pages/NotFound/NotFound";

// COMPONENTES GENERALES
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// AUTH
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute/ProtectedAdminRoute.jsx";

// LAYOUT ADMIN
import LayoutAdmin from "./LayoutAdmin/LayoutAdmin";

// ADMIN - DASHBOARD
import HomeAdmin from "./LayoutAdmin/pages/HomeAdmin";

// ADMIN - OFERTAS
import OffersAdmin from "./LayoutAdmin/pages/OffersAdmin";
import PackagesAdmin from "./LayoutAdmin/pages/PackagesAdmin";

import NewOffer from "./LayoutAdmin/pages/NewOffer";
import NewHotel from "./LayoutAdmin/pages/NewHotel";
import NewFlight from "./LayoutAdmin/pages/NewFligth";
import NewTour from "./LayoutAdmin/pages/NewTour";

// ADMIN - INSIGHTS
import InsightsAdmin from "./LayoutAdmin/pages/InsightsAdmin.jsx";

// ADMIN - CRM
import AdminCRM from "./LayoutAdmin/pages/AdminCRM.jsx";
import ClientDetail from "./LayoutAdmin/pages/ClientDetail.jsx";

// ADMIN - COTIZADOR
import AdminQuote from "./LayoutAdmin/pages/AdminQuote.jsx";
import PublicQuote from "./LayoutAdmin/pages/PublicQuote.jsx";
import QuotesAdmin from "./LayoutAdmin/pages/QuotesAdmin.jsx";
import SalesAdmin from "./LayoutAdmin/pages/SalesAdmin.jsx";
import SaleDetail from "./LayoutAdmin/pages/SaleDetail.jsx";
import PublicReceipt from "./LayoutAdmin/pages/PublicReceipt.jsx";
import SettingsAdmin from "./LayoutAdmin/pages/SettingsAdmin.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* =====================================================
            SITIO PÚBLICO
        ===================================================== */}

        <Route path="/" element={<HomeNew />} />

        <Route path="/ofertas" element={<Offers />} />

        <Route path="/oferta/:slug" element={<Details />} />

        <Route path="/blog" element={<BlogPage />} />

        <Route path="/hoteles" element={<Hotels />} />

        <Route path="/paquetes" element={<Packages />} />

        <Route path="/tours" element={<Tours />} />

        <Route path="/destinos" element={<Destinations />} />

        <Route path="/vuelos" element={<Flights />} />

        <Route path="/acerca-de-nosotros" element={<AboutUs />} />

        <Route path="/aviso-de-privacidad" element={<NoticeOfPrivacy />} />

        <Route path="/politica-de-privacidad" element={<PrivacyPolicy />} />

        <Route
          path="/terminos-y-condiciones"
          element={<TermsAndConditions />}
        />

        <Route path="/cotizacion/:slug" element={<PublicQuote />} />
        <Route path="/recibo/:slug" element={<PublicReceipt />} />

        {/* =====================================================
            LOGIN ADMIN
            DEBE ESTAR FUERA DE ProtectedAdminRoute
        ===================================================== */}

        <Route path="/auth/login" element={<AdminLogin />} />

        {/* =====================================================
            ADMINISTRACIÓN PROTEGIDA
        ===================================================== */}

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/auth" element={<LayoutAdmin />}>
            {/* =================================================
                DASHBOARD
            ================================================= */}

            <Route index element={<HomeAdmin />} />

            {/* =================================================
                CRM
            ================================================= */}

            <Route path="crm" element={<AdminCRM />} />

            <Route path="crm/:id" element={<ClientDetail />} />

            {/* =================================================
                COTIZADOR
            ================================================= */}

            <Route path="cotizador" element={<AdminQuote />} />
            <Route path="cotizaciones" element={<QuotesAdmin />} />
            <Route path="ventas" element={<SalesAdmin />} />
            <Route path="ventas/:id" element={<SaleDetail />} />
            <Route path="configuracion" element={<SettingsAdmin />} />

            {/* =================================================
                INSIGHTS
            ================================================= */}

            <Route path="insights" element={<InsightsAdmin />} />

            {/* =================================================
                OFERTAS
            ================================================= */}

            <Route path="ofertas" element={<OffersAdmin />} />

            <Route path="paquetes" element={<PackagesAdmin />} />

            {/* CREAR PAQUETE */}

            <Route path="new-package" element={<NewOffer />} />

            <Route path="ofertas/:id/editar" element={<NewOffer />} />

            {/* CREAR HOTEL */}

            <Route path="new-hotel" element={<NewHotel />} />

            <Route path="hoteles/:id/editar" element={<NewHotel />} />

            {/* CREAR VUELO */}

            <Route path="new-flight" element={<NewFlight />} />

            <Route path="vuelos/:id/editar" element={<NewFlight />} />

            {/* CREAR TOUR */}

            <Route path="new-tour" element={<NewTour />} />

            <Route path="tours/:id/editar" element={<NewTour />} />
          </Route>
        </Route>

        {/* =====================================================
            404
        ===================================================== */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
