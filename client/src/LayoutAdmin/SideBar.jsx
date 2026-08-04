import { useState } from "react";
import {
  FaHome,
  FaHotel,
  FaSuitcase,
  FaPlane,
  FaMapMarkedAlt,
  FaPlus,
  FaTag,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import api from "../Services/api";

const mainNavigation = [
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
  {
    label: "Paquetes",
    to: "/auth/paquetes",
    icon: FaSuitcase,
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

function SideBar() {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      await api.post("/auth/logout");
      navigate("/admin/login", { replace: true });
    } catch (requestError) {
      if (requestError.response?.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setError("No fue posible cerrar sesión. Intenta nuevamente.");
      setLoggingOut(false);
    }
  };

  return (
    <aside className="flex w-full shrink-0 flex-col bg-[#101827] p-4 text-white shadow-xl lg:min-h-[calc(100dvh-68px)] lg:w-72">
      <Link
        to="/auth"
        className="mb-8 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:bg-white/10"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0260fe] text-xl font-black shadow-lg shadow-blue-500/30">
          V
        </div>

        <div>
          <p className="text-lg font-black leading-tight">Viaja a tu Destino</p>
          <p className="mt-1 text-xs font-medium text-blue-200">
            Panel administrativo
          </p>
        </div>
      </Link>

      <nav className="flex-1 space-y-7">
        <section>
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
            Administración
          </p>

          <div className="space-y-1">
            {mainNavigation.map(({ label, to, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#0260fe] text-white shadow-lg shadow-blue-500/20"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="text-lg" />
                {label}
              </NavLink>
            ))}
          </div>
        </section>

        <section>
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.18em] text-gray-500">
            Crear contenido
          </p>

          <div className="space-y-1">
            {quickActions.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#0260fe] text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-xs">
                  <Icon />
                </span>
                {label}
                <FaPlus className="ml-auto text-xs text-blue-200" />
              </NavLink>
            ))}
          </div>
        </section>
      </nav>

      <div className="mt-8 border-t border-white/10 pt-5">
        <div className="mb-4 rounded-xl bg-white/5 px-4 py-3">
          <p className="text-sm font-semibold text-white">Sesión protegida</p>
          <p className="mt-1 text-xs text-gray-400">
            Acceso exclusivo de administrador
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MdLogout className="text-xl" />
          {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>

        {error && (
          <p className="mt-3 rounded-lg bg-red-500/15 px-3 py-2 text-center text-xs text-red-200">
            {error}
          </p>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
