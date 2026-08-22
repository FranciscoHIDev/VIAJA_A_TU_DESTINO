import { useState } from "react";
import {
  FaHome,
  FaHotel,
  FaSuitcase,
  FaPlane,
  FaMapMarkedAlt,
  FaPlus,
  FaTag,
  FaUsers,
  FaFileInvoiceDollar,
  FaClipboardList,
  FaDollarSign,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { MdLogout, MdInsights } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../Services/api";

const LOGO =
  "https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/i6jhddqaqz1ijctzrw42.webp";

const administrationNavigation = [
  {
    label: "Panel principal",
    to: "/auth",
    icon: FaHome,
    end: true,
  },
  {
    label: "Ofertas",
    to: "/auth/ofertas",
    icon: FaTag,
  },
];

const salesNavigation = [
  {
    label: "CRM",
    to: "/auth/crm",
    icon: FaUsers,
  },
  {
    label: "Cotizador",
    to: "/auth/cotizador",
    icon: FaFileInvoiceDollar,
  },
  {
    label: "Cotizaciones",
    to: "/auth/cotizaciones",
    icon: FaClipboardList,
  },
  {
    label: "Ventas",
    to: "/auth/ventas",
    icon: FaDollarSign,
  },
];

const analysisNavigation = [
  {
    label: "Insights",
    to: "/auth/insights",
    icon: MdInsights,
  },
];

const quickActions = [
  {
    label: "Nuevo paquete",
    to: "/auth/new-package",
    icon: FaSuitcase,
  },
  {
    label: "Nuevo hotel",
    to: "/auth/new-hotel",
    icon: FaHotel,
  },
  {
    label: "Nuevo vuelo",
    to: "/auth/new-flight",
    icon: FaPlane,
  },
  {
    label: "Nuevo tour",
    to: "/auth/new-tour",
    icon: FaMapMarkedAlt,
  },
];

function NavigationItem({ label, to, icon: Icon, end, compact = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
          isActive
            ? "bg-[#0260fe] text-white shadow-lg shadow-blue-500/20"
            : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition ${
              isActive
                ? "bg-white/15 text-white"
                : "bg-white/[0.06] text-slate-400 group-hover:bg-white/10 group-hover:text-white"
            }`}
          >
            <Icon />
          </span>

          <span className="min-w-0 flex-1 truncate">{label}</span>

          {compact ? (
            <FaPlus
              className={`text-[10px] transition ${
                isActive
                  ? "text-white/75"
                  : "text-slate-500 group-hover:text-blue-200"
              }`}
            />
          ) : null}
        </>
      )}
    </NavLink>
  );
}

function NavigationSection({ title, items }) {
  return (
    <section>
      <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => (
          <NavigationItem key={item.to} {...item} />
        ))}
      </div>
    </section>
  );
}

function SideBar() {
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const [contentOpen, setContentOpen] = useState(true);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      await api.post("/auth/logout");

      navigate("/auth/login", {
        replace: true,
      });
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/auth/login", {
          replace: true,
        });
        return;
      }

      setError("No fue posible cerrar sesión. Intenta nuevamente.");
      setLoggingOut(false);
    }
  };

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#0d1726] text-white shadow-xl lg:min-h-[calc(100dvh-68px)] lg:w-[270px]">
      {/* BRAND */}
      <div className="border-b border-white/[0.07] px-4 py-5">
        <Link
          to="/auth"
          aria-label="Ir al panel principal"
          className="group block"
        >
          <div
            className="
              flex
              min-h-[92px]
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-[20px]
              border
              border-slate-200/80
              bg-white
              px-4
              py-4
              shadow-[0_10px_30px_rgba(0,0,0,0.18)]
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:shadow-[0_14px_34px_rgba(0,0,0,0.24)]
            "
          >
            <img
              src={LOGO}
              alt="Viaja a tu Destino"
              className="
                block
                h-auto
                w-full
                max-w-[205px]
                object-contain
              "
            />
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        <NavigationSection
          title="Administración"
          items={administrationNavigation}
        />

        <NavigationSection title="Ventas" items={salesNavigation} />

        <NavigationSection title="Análisis" items={analysisNavigation} />

        {/* CREAR CONTENIDO */}
        <section>
          <button
            type="button"
            onClick={() => setContentOpen((prev) => !prev)}
            className="mb-2 flex w-full items-center justify-between px-3"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
              Crear contenido
            </span>

            <FaChevronDown
              className={`text-[9px] text-slate-600 transition-transform ${
                contentOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {contentOpen ? (
            <div className="space-y-1">
              {quickActions.map((item) => (
                <NavigationItem key={item.to} {...item} compact />
              ))}
            </div>
          ) : null}
        </section>

        {/* SETTINGS */}
        <section>
          <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600">
            Sistema
          </p>

          <NavigationItem
            label="Configuración"
            to="/auth/configuracion"
            icon={FaCog}
          />
        </section>
      </nav>

      {/* FOOTER */}
      <div className="border-t border-white/[0.07] p-3">
        <div className="mb-2 rounded-xl bg-white/[0.04] p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0260fe] text-xs font-black text-white">
              IF
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-black text-white">
                Administrador
              </p>

              <p className="mt-0.5 truncate text-[10px] text-slate-500">
                Sesión protegida
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition hover:bg-red-500/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
            <MdLogout className="text-lg" />
          </span>

          {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>

        {error ? (
          <p className="mt-2 rounded-lg bg-red-500/10 px-3 py-2 text-center text-[11px] text-red-300">
            {error}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

export default SideBar;
