import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full">
        <div className="grid grid-cols-3 md:flex-row md:justify-around bg-[#3794ff] py-20 md:items-center md:pl-0 justify-center">
          <div className="grid justify-center pl-20">
            <div className="mb-4 md:items-center ">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Sobre nosotros
              </h2>
            </div>
            <div className="text-[18px] md:mb-0 mb-4">
                <p className="text-white">
                  Somos una agencia de viajes 100% en línea, 
                  especializada en encontrar  las mejores ofertas 
                  de hoteles y Paquetes vuelo + hotel al mejor precio.
                </p>
            </div>
          </div>
          <div className="grid justify-center">
            <div className="mb-4 md:items-center">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Legales
              </h2>
            </div>
            <div className="text-[18px] md:mb-0 mb-4">
              <NavLink to="/aviso-de-privacidad">
                {" "}
                <p className="text-white hover:text-[#FF6600]">
                  Aviso de privacidad
                </p>
              </NavLink>
              <NavLink to="/politica-de-privacidad">
                {" "}
                <p className="text-white hover:text-[#FF6600]">
                  Política de privacidad
                </p>
              </NavLink>
              <NavLink to="/terminos-y-condiciones">
                <p className="text-white hover:text-[#FF6600]">
                  Términos y condiciones
                </p>
              </NavLink>
            </div>
          </div>
          <div className="grid justify-center">
            <div className="mb-4 md:items-center">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Contacto
              </h2>
            </div>
            <div className="flex flex-col ">
              <div>
                <p className="text-[18px] text-white">
                  Email: <span>contacto@viajaatudestino.com</span>
                </p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-[18px] mr-2 text-white">Síguenos</p>
                <a
                  href="https://www.facebook.com/viajaatudestinoMx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <FaFacebook className="mr-2 text-2xl text-white hover:text-[#FF6600]" />
                </a>
                <a
                  href="https://www.instagram.com/viajaatudestinomx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-2xl text-white hover:text-[#FF6600]" />
                </a>
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row md:justify-around bg-[#3794ff] py-4 flex-col items-center text-[15px]">
          <p className="text-center text-white drop-shadow-[0.1em_0.1em_0.1em_black]">
            Copyright © 2025 viajaatudestino.com. Todos los derechos reservados.
          </p>
          <a
            href="https://franciscodev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white">
              Desarrollado by{" "}
              <span className="text-[#FF6600] font-extrabold drop-shadow-[0.1em_0.1em_0.1em_white]">Isidoro de Viaje</span>
            </p>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
