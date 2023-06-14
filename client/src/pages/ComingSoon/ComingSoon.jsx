import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function ComingSoon() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center mt-10 mb-20 md:px-20 px-2 items-center">
        <h1 className="text-2xl text-[#035373] font-bold">
          EN ESTOS MOMENTOS NOS ENCONTRAMOS ACTUALIZANDO NUESTRO SITIO WEB
        </h1>
        <p className="mt-4 text-2xl">
          Puedes reservar tus vacaciones en linea haz click al botón
        </p>
        <a
          href="https://viajaatudestino.priceres.com.mx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className=" border-2 p-2 mt-4 bg-[#ff3e02] rounded-lg text-white hover:bg-[#035373] font-bold">
            QUIERO RESERVAR
          </button>
        </a>
      </div>
      <Footer />
    </>
  );
}

export default ComingSoon;
