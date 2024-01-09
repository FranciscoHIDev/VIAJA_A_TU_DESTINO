import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineAdsClick } from "react-icons/md";
import { BsCartCheck } from "react-icons/bs";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

function LayoutProfile() {
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow pt-20 pb-40">
          <div className="flex flex-row mx-40  justify-center">
            <div className="flex flex-row items-center bg-white border w-full py-8 pl-5 rounded-md mr-8 cursor-pointer hover:border-stone-950">
              <FaRegUserCircle className="text-3xl " />
              <p className="ml-3">Datos personales</p>
            </div>
            <div className="flex flex-row items-center bg-white border w-full py-8 pl-5  rounded-md mr-8 cursor-pointer hover:border-stone-950">
              <HiOutlineBellAlert className="text-3xl " />
              <p className="ml-3">Mis alertas</p>
            </div>
          </div>
          <div className="flex flex-row mx-40  justify-center mt-5">
            <div className="flex flex-row items-center bg-white border w-full py-8 pl-5 rounded-md mr-8 cursor-pointer hover:border-stone-950">
              <CiDiscount1 className="text-3xl " />
              <p className="ml-3">Mis descuentos</p>
            </div>
            <div className="flex flex-row items-center bg-white border w-full py-8 pl-5  rounded-md mr-8 cursor-pointer hover:border-stone-950">
              <MdOutlineFavoriteBorder className="text-3xl " />
              <p className="ml-3">Mis ofertas favoritas</p>
            </div>
          </div>
          <div className="flex flex-row mx-40  justify-center mt-5">
            <div className="flex flex-row items-center bg-white border w-full py-8 pl-5 rounded-md mr-8 cursor-pointer hover:border-stone-950">
              <BsCartCheck className="text-3xl " />
              <p className="ml-3">Mis reservas</p>
            </div>
            <div className="flex flex-row items-center bg-white border w-full py-8 pl-5  rounded-md mr-8 cursor-pointer hover:border-stone-950">
              <MdOutlineAdsClick className="text-3xl " />
              <p className="ml-3">Últimas ofertas visitadas</p>
            </div>
          </div>
          <div className="flex flex-row mx-48 mt-4 justify-end ">
            <button className="">Cerrar Sesion</button>
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
