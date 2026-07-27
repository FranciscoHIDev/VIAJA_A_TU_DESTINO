import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaHeadset,
  FaSuitcase,
  FaBookReader,
  FaHotel,
  FaUsers,
  FaChevronRight,
} from "react-icons/fa";

import { GiMayanPyramid } from "react-icons/gi";

const navItems = [
  {
    name: "Paquetes",
    path: "/paquetes",
    icon: FaSuitcase,
  },
  {
    name: "Hoteles",
    path: "/hoteles",
    icon: FaHotel,
  },
  {
    name: "Tours",
    path: "/tours",
    icon: GiMayanPyramid,
  },
  {
    name: "Blog",
    path: "/blog",
    icon: FaBookReader,
  },
  {
    name: "Quiénes somos",
    path: "/acerca-de-nosotros",
    icon: FaUsers,
  },
];

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Cierra el menú cuando cambia la ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Impide el scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Cierra el menú con la tecla Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        aria-label="Navegación principal"
        className="relative border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl"
      >
        <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Ir al inicio de Viaja a tu Destino"
            className="relative z-50 flex flex-none items-center"
          >
            <img
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1785018355/i6jhddqaqz1ijctzrw42.webp"
              alt="Viaja a tu Destino"
              className="h-auto w-[155px] object-contain sm:w-[175px] lg:w-[190px]"
            />
          </Link>

          {/* Menú de escritorio */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition duration-300 xl:px-4 ${
                      isActive
                        ? "bg-[#0260fe]/10 text-[#0260fe]"
                        : "text-slate-600 hover:bg-slate-100 hover:text-[#0260fe]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`text-[17px] transition duration-300 ${
                          isActive
                            ? "text-[#0260fe]"
                            : "text-slate-400 group-hover:text-[#0260fe]"
                        }`}
                      />

                      <span>{item.name}</span>

                      <span
                        className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#ff6600] transition-all duration-300 ${
                          isActive ? "w-7" : "w-0 group-hover:w-7"
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Reservaciones escritorio */}
          <div className="hidden items-center lg:flex">
            <a
              href="tel:+529982830657"
              className="group flex items-center gap-3 rounded-2xl bg-[#ff6600] px-5 py-3 text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:bg-[#e85d00] hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 transition group-hover:bg-white/20">
                <FaHeadset className="text-lg" />
              </span>

              <span className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">
                  Reservaciones
                </span>

                <span className="mt-1 text-sm font-black">998 283 0657</span>
              </span>
            </a>
          </div>

          {/* Botón móvil */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#023e73] shadow-sm transition hover:border-[#0260fe]/30 hover:bg-[#0260fe]/5 hover:text-[#0260fe] lg:hidden"
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Línea inferior decorativa */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#0260fe] via-[#3794ff] to-[#ff6600]" />

        {/* Fondo oscuro móvil */}
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setIsMenuOpen(false)}
          className={`fixed inset-0 top-[74px] z-40 bg-[#023e73]/45 backdrop-blur-sm transition-all duration-300 lg:hidden ${
            isMenuOpen
              ? "visible opacity-100"
              : "invisible pointer-events-none opacity-0"
          }`}
        />

        {/* Menú móvil */}
        <div
          id="mobile-navigation"
          className={`absolute left-3 right-3 top-[calc(100%+10px)] z-50 origin-top overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 sm:left-auto sm:right-5 sm:w-[390px] lg:hidden ${
            isMenuOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "invisible -translate-y-3 scale-95 pointer-events-none opacity-0"
          }`}
        >
          <div className="max-h-[calc(100vh-105px)] overflow-y-auto p-4">
            {/* Encabezado móvil */}
            <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#023e73] to-[#0260fe] p-5 text-white">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/65">
                Viaja a tu Destino
              </p>

              <h2 className="mt-2 text-xl font-black">
                ¿A dónde quieres viajar?
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/75">
                Explora hoteles, paquetes, tours y ofertas para tus próximas
                vacaciones.
              </p>
            </div>

            {/* Enlaces móviles */}
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-2xl px-4 py-3.5 transition ${
                        isActive
                          ? "bg-[#0260fe]/10 text-[#0260fe]"
                          : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="flex items-center gap-4">
                          <span
                            className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                              isActive
                                ? "bg-[#0260fe] text-white"
                                : "bg-slate-100 text-slate-500 group-hover:bg-[#0260fe]/10 group-hover:text-[#0260fe]"
                            }`}
                          >
                            <Icon className="text-lg" />
                          </span>

                          <span className="font-bold">{item.name}</span>
                        </span>

                        <FaChevronRight
                          className={`text-xs transition ${
                            isActive
                              ? "text-[#0260fe]"
                              : "text-slate-300 group-hover:translate-x-1 group-hover:text-[#0260fe]"
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Contacto móvil */}
            <div className="mt-5 border-t border-slate-100 pt-5">
              <a
                href="tel:+529982830657"
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ff6600] px-5 py-4 font-black text-white shadow-md transition hover:bg-[#e85d00]"
              >
                <FaHeadset className="text-lg" />
                Reservar: 998 283 0657
              </a>

              <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                Atención personalizada para ayudarte con tu próximo viaje.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
