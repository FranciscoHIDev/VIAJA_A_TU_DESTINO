import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineAdsClick } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import LogoutButton from "../components/Auth0/LogoutButton";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

function LayoutProfile() {
  // const { isAuthenticated, user } = useAuth0();
  const crumbs = [
    { label: "Inicio", path: "/" },
    { label: "Mi perfil", path: "/mi-perfil" },
  ];
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <div className="ml-20 mt-5">
          <Breadcrumb crumbs={crumbs} />
        </div>

        <main className="flex-grow pt-20 pb-40">
          <div className="flex flex-row mx-40  justify-center">
            <NavLink to={"/mi-perfil/datos-personales"}>
              <div className="flex flex-row items-center bg-white border w-[400px] py-8 pl-5 rounded-md mr-8 cursor-pointer hover:border-stone-950">
                <FaRegUserCircle className="text-3xl " />
                <p className="ml-3">Datos personales</p>
              </div>
            </NavLink>
            <NavLink to={"/mi-perfil/alertas"}>
              <div className="flex flex-row items-center bg-white border w-[400px] py-8 pl-5  rounded-md mr-8 cursor-pointer hover:border-stone-950">
                <HiOutlineBellAlert className="text-3xl " />
                <p className="ml-3">Mis alertas</p>
              </div>
            </NavLink>
          </div>
          <div className="flex flex-row mx-40  justify-center mt-5">
            <NavLink to={"/mi-perfil/descuentos"}>
              <div className="flex flex-row items-center bg-white border w-[400px] py-8 pl-5 rounded-md mr-8 cursor-pointer hover:border-stone-950">
                <CiDiscount1 className="text-3xl " />
                <p className="ml-3">Mis descuentos</p>
              </div>
            </NavLink>
            <NavLink to={"/mi-perfil/favoritos"}>
              <div className="flex flex-row items-center bg-white border w-[400px] py-8 pl-5  rounded-md mr-8 cursor-pointer hover:border-stone-950">
                <MdOutlineFavoriteBorder className="text-3xl " />
                <p className="ml-3">Mis ofertas favoritas</p>
              </div>
            </NavLink>
          </div>
          <div className="flex flex-row mx-40  justify-center mt-5">
            <NavLink to={"/mi-perfil/reservas"}>
              <div className="flex flex-row items-center bg-white border w-[400px] py-8 pl-5 rounded-md mr-8 cursor-pointer hover:border-stone-950">
                <BsCartCheck className="text-3xl " />
                <p className="ml-3">Mis reservas</p>
              </div>
            </NavLink>
            <NavLink to={"/mi-perfil/ultimas-ofertas"}>
              <div className="flex flex-row items-center bg-white border w-[400px] py-8 pl-5  rounded-md mr-8 cursor-pointer hover:border-stone-950">
                <MdOutlineAdsClick className="text-3xl " />
                <p className="ml-3">Últimas ofertas visitadas</p>
              </div>
            </NavLink>
          </div>
          <div className="flex flex-row mt-4 pr-[277px] justify-end text-[#ff3e02] underline font-medium">
            <LogoutButton />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default LayoutProfile;
