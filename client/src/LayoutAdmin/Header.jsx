import { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import {
  FaHome,
  FaPlus,
  FaChevronDown,
  FaSignOutAlt,
  FaUsers,
  FaFileInvoiceDollar,
  FaSuitcase,
  FaHotel,
  FaPlane,
  FaMapMarkedAlt,
  FaExternalLinkAlt,
  FaUserCircle,
  FaCog,
} from "react-icons/fa";
import { MdInsights } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import api from "../Services/api";

const addOptions = [
  {
    label: "Nuevo prospecto",
    description: "Registrar cliente en CRM",
    to: "/auth/crm?new=1",
    icon: FaUsers,
    iconClass: "bg-blue-50 text-[#0260fe]",
  },
  {
    label: "Nueva cotización",
    description: "Crear propuesta de viaje",
    to: "/auth/cotizador",
    icon: FaFileInvoiceDollar,
    iconClass: "bg-orange-50 text-[#ff6600]",
  },
  {
    divider: true,
  },
  {
    label: "Nuevo paquete",
    description: "Vuelo + hotel",
    to: "/auth/new-package",
    icon: FaSuitcase,
    iconClass: "bg-blue-50 text-[#0260fe]",
  },
  {
    label: "Nuevo hotel",
    description: "Oferta de hospedaje",
    to: "/auth/new-hotel",
    icon: FaHotel,
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Nuevo vuelo",
    description: "Oferta aérea",
    to: "/auth/new-flight",
    icon: FaPlane,
    iconClass: "bg-violet-50 text-violet-600",
  },
  {
    label: "Nuevo tour",
    description: "Actividad o experiencia",
    to: "/auth/new-tour",
    icon: FaMapMarkedAlt,
    iconClass: "bg-cyan-50 text-cyan-600",
  },
];

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
          navigate("/admin/login", {
            replace: true,
          });
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

      navigate("/admin/login", {
        replace: true,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/admin/login", {
          replace: true,
        });

        return;
      }

      setLogoutError("No fue posible cerrar sesión. Intenta nuevamente.");

      setLoggingOut(false);
    }
  };

  const adminName =
    admin?.name || admin?.email?.split("@")[0] || "Administrador";

  const adminInitials = adminName
    .split(" ")
    .slice(0, 2)
    .map((word) => word?.[0])
    .join("")
    .toUpperCase();

  return (
    <header className="relative z-40 w-full border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:px-6">
      <div className="flex items-center justify-between gap-4">
        {/* =================================================
            IZQUIERDA
        ================================================= */}

        <div className="flex min-w-0 items-center gap-2">
          {/* VER SITIO */}

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3.5
              py-2.5
              text-sm
              font-bold
              text-slate-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#0260fe]
            "
          >
            <FaHome className="text-[#0260fe]" />

            <span className="hidden sm:inline">Ver sitio</span>

            <FaExternalLinkAlt className="hidden text-[9px] text-slate-400 lg:block" />
          </Link>

          {/* AÑADIR */}

          <Menu
            menuButton={
              <MenuButton
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#0260fe]
                  px-3.5
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-blue-700
                "
              >
                <FaPlus />

                <span className="hidden sm:inline">Añadir</span>

                <FaChevronDown className="text-[9px] text-blue-100" />
              </MenuButton>
            }
            align="start"
            transition
            gap={8}
            menuClassName="
              !min-w-[290px]
              !overflow-hidden
              !rounded-2xl
              !border
              !border-slate-200
              !bg-white
              !p-2
              !shadow-2xl
            "
          >
            <div className="px-3 pb-2 pt-2">
              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                Crear
              </p>

              <p className="mt-1 text-sm font-black text-[#12304a]">
                ¿Qué deseas agregar?
              </p>
            </div>

            {addOptions.map((item, index) => {
              if (item.divider) {
                return (
                  <MenuDivider
                    key={`divider-${index}`}
                    className="!my-2 !border-slate-100"
                  />
                );
              }

              const Icon = item.icon;

              return (
                <MenuItem
                  key={item.to}
                  className="
                    !rounded-xl
                    !p-0
                    hover:!bg-slate-50
                  "
                >
                  <Link
                    to={item.to}
                    className="
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-2.5
                    "
                  >
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        text-sm
                        ${item.iconClass}
                      `}
                    >
                      <Icon />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-black text-[#12304a]">
                        {item.label}
                      </span>

                      <span className="mt-0.5 block text-[11px] text-slate-400">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </MenuItem>
              );
            })}
          </Menu>

          {/* INSIGHTS */}

          <Link
            to="/auth/insights"
            className="
              hidden
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-3.5
              py-2.5
              text-sm
              font-bold
              text-slate-600
              transition
              hover:border-blue-200
              hover:bg-blue-50
              hover:text-[#0260fe]
              md:inline-flex
            "
          >
            <MdInsights className="text-lg text-[#0260fe]" />
            Insights
          </Link>

          {/* COTIZACIÓN RÁPIDA */}

          <Link
            to="/auth/cotizador"
            className="
              hidden
              items-center
              gap-2
              rounded-xl
              border
              border-orange-200
              bg-orange-50
              px-3.5
              py-2.5
              text-sm
              font-bold
              text-[#ff6600]
              transition
              hover:bg-[#ff6600]
              hover:text-white
              xl:inline-flex
            "
          >
            <FaFileInvoiceDollar />
            Cotizar
          </Link>
        </div>

        {/* =================================================
            USUARIO
        ================================================= */}

        <Menu
          menuButton={
            <MenuButton
              className="
                flex
                min-w-0
                items-center
                gap-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                px-2
                py-1.5
                text-left
                transition
                hover:border-blue-200
                hover:bg-slate-50
                sm:px-3
              "
            >
              {/* AVATAR */}

              <span
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#12304a]
                  text-xs
                  font-black
                  text-white
                  shadow-sm
                "
              >
                {adminInitials || "AD"}
              </span>

              {/* USER */}

              <span className="hidden min-w-0 sm:block">
                <span className="block max-w-[160px] truncate text-xs font-black text-[#12304a]">
                  {adminName}
                </span>

                <span className="mt-0.5 block text-[10px] font-medium text-slate-400">
                  Administrador
                </span>
              </span>

              <FaChevronDown className="text-[9px] text-slate-400" />
            </MenuButton>
          }
          align="end"
          transition
          gap={8}
          menuClassName="
            !min-w-[270px]
            !overflow-hidden
            !rounded-2xl
            !border
            !border-slate-200
            !bg-white
            !p-2
            !shadow-2xl
          "
        >
          {/* PERFIL */}

          <MenuItem
            className="
              !cursor-default
              !rounded-xl
              !p-0
              hover:!bg-transparent
            "
          >
            <div className="w-full px-3 py-3">
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-blue-50
                    text-sm
                    font-black
                    text-[#0260fe]
                  "
                >
                  {adminInitials || "AD"}
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#12304a]">
                    {adminName}
                  </p>

                  <p className="mt-0.5 max-w-[180px] truncate text-[11px] text-slate-400">
                    {admin?.email || "Cargando..."}
                  </p>
                </div>
              </div>
            </div>
          </MenuItem>

          <MenuDivider className="!my-1 !border-slate-100" />

          {/* CONFIGURACIÓN */}

          <MenuItem
            className="
              !rounded-xl
              !p-0
              hover:!bg-slate-50
            "
          >
            <Link
              to="/auth/configuracion"
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-semibold
                text-slate-600
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-slate-100
                  text-slate-500
                "
              >
                <FaCog />
              </span>
              Configuración
            </Link>
          </MenuItem>

          <MenuDivider className="!my-1 !border-slate-100" />

          {/* LOGOUT */}

          <MenuItem
            onClick={handleLogout}
            disabled={loggingOut}
            className="
              !rounded-xl
              !p-0
              hover:!bg-red-50
            "
          >
            <div
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-bold
                text-red-500
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  bg-red-50
                  text-red-500
                "
              >
                <FaSignOutAlt />
              </span>

              {loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
            </div>
          </MenuItem>
        </Menu>
      </div>

      {/* ERROR LOGOUT */}

      {logoutError && (
        <div
          className="
            absolute
            right-4
            top-[calc(100%+8px)]
            z-[100]
            max-w-sm
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-xs
            font-semibold
            text-red-600
            shadow-xl
          "
        >
          {logoutError}
        </div>
      )}
    </header>
  );
}

export default Header;
