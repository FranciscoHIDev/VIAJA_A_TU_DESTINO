import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  FaHome,
  FaPlus,
  FaChevronDown,
  FaSignal,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";

function Header() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    let active = true;

    const getAdmin = async () => {
      try {
        const response = await api.get("/auth/me");

        if (active) {
          setAdmin(response.data.admin);
        }
      } catch {
        if (active) {
          navigate("/admin/login", { replace: true });
        }
      }
    };

    getAdmin();

    return () => {
      active = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);
    setLogoutError("");

    try {
      await api.post("/auth/logout");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/admin/login", { replace: true });
        return;
      }

      setLogoutError("No fue posible cerrar sesión. Intenta nuevamente.");
      setLoggingOut(false);
    }
  };

  const adminName = admin?.email?.split("@")[0] || "Admin";

  return (
    <header className="relative w-full bg-[#111827] px-4 py-3 text-white shadow-lg md:px-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className="flex items-center rounded-lg bg-[#3794ff] px-3 py-2 text-sm font-semibold transition hover:bg-[#0260fe]"
          >
            <FaHome />
            <span className="ml-2">Ver sitio</span>
          </Link>

          <Menu
            menuButton={
              <MenuButton className="flex items-center rounded-lg bg-[#3794ff] px-3 py-2 text-sm font-semibold transition hover:bg-[#0260fe]">
                <FaPlus className="mr-2" />
                Añadir
              </MenuButton>
            }
            align="start"
            arrow
            transition
          >
            <MenuItem>
              <Link
                to="/auth/new-package"
                className="flex items-center gap-2 px-4 py-2"
              >
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  Nuevo
                </span>
                Paquete Vuelo + Hotel
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/auth/new-hotel"
                className="flex items-center gap-2 px-4 py-2"
              >
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  Nuevo
                </span>
                Hotel
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/auth/new-flight"
                className="flex items-center gap-2 px-4 py-2"
              >
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  Nuevo
                </span>
                Vuelo
              </Link>
            </MenuItem>

            <MenuItem>
              <Link
                to="/auth/new-tour"
                className="flex items-center gap-2 px-4 py-2"
              >
                <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                  Nuevo
                </span>
                Tour
              </Link>
            </MenuItem>
          </Menu>

          <button
            type="button"
            className="flex items-center rounded-lg bg-[#3794ff] px-3 py-2 text-sm font-semibold transition hover:bg-[#0260fe]"
          >
            <FaSignal />
            <span className="ml-2">Insights</span>
          </button>
        </div>

        <Menu
          menuButton={
            <MenuButton className="flex items-center rounded-lg bg-[#ff6600] px-3 py-2 transition hover:bg-[#0260fe]">
              <img
                className="mr-2 h-6 w-6"
                src="https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/gurktfbavkjxjl8rycvs.webp"
                alt=""
              />
              <span className="max-w-[170px] truncate text-sm font-semibold">
                Hola, {adminName}
              </span>
              <FaChevronDown className="ml-2 text-xs" />
            </MenuButton>
          }
          align="end"
          arrow
          transition
        >
          <MenuItem className="hover:bg-transparent">
            <div className="px-4 py-3">
              <p className="font-bold text-gray-800">Administrador</p>
              <p className="mt-1 max-w-[220px] truncate text-sm text-gray-500">
                {admin?.email || "Cargando..."}
              </p>
            </div>
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            className="border-t border-gray-100 text-red-600 hover:bg-red-50"
          >
            <div className="flex items-center gap-2 px-4 py-2 font-semibold">
              <FaSignOutAlt />
              {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </div>
          </MenuItem>
        </Menu>
      </div>

      {logoutError && (
        <p className="absolute right-4 top-full z-50 mt-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white shadow-lg">
          {logoutError}
        </p>
      )}
    </header>
  );
}

export default Header;
