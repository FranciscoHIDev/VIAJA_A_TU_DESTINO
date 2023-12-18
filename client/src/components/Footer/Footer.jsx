import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full">
        <div className="flex md:flex-row flex-col md:justify-around bg-[#011c39] py-20  md:items-center md:pl-0 pl-10">
          <div>
            <div className="flex  flex-col mb-4 md:items-center ">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Sobre nosotros
              </h2>
            </div>
            <div className="text-[18px] md:mb-0 mb-4  flex flex-col">
              <NavLink to="/sobre-nosotros">
                {" "}
                <p className="text-white hover:text-[#ff3e02]">
                  ¿Quiénes somos?
                </p>
              </NavLink>
              <NavLink to="/preguntas-frecuentes">
                <p className="text-white hover:text-[#ff3e02]">
                  Preguntas frecuentes
                </p>
              </NavLink>
              <NavLink to="#">
                <p className="text-white hover:text-[#ff3e02]">
                  Trabaja con nosotros
                </p>
              </NavLink>
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4 md:items-center">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Legales
              </h2>
            </div>
            <div className="text-[18px] md:mb-0 mb-4 flex flex-col ">
              <NavLink to="/aviso-de-privacidad">
                {" "}
                <p className="text-white hover:text-[#ff3e02]">
                  Aviso de privacidad
                </p>
              </NavLink>
              <NavLink to="/politica-de-privacidad">
                {" "}
                <p className="text-white hover:text-[#ff3e02]">
                  Política de privacidad
                </p>
              </NavLink>
              <NavLink to="/terminos-y-condiciones">
                <p className="text-white hover:text-[#ff3e02]">
                  Términos y condiciones
                </p>
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex mb-4 flex-col md:items-center">
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
                  <FaFacebook className="mr-2 text-2xl text-white hover:text-[#ff3e02]" />
                </a>
                <a
                  href="https://www.instagram.com/viajaatudestinomx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-2xl text-white hover:text-[#ff3e02]" />
                </a>
              </div>
              <br></br>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row md:justify-around bg-[#051225] py-2 flex-col items-center ">
          <p className="text-center text-white drop-shadow-[0.1em_0.1em_0.1em_black]">
            Copyright © 2023 viajaatudestino.com. Todos los derechos reservados.
          </p>
          <a
            href="https://codelabtech.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white drop-shadow-[0.1em_0.1em_0.1em_black] ">
              Desarrollado by{" "}
              <span className="text-[#ff3e02] font-bold">CodeLab Tech</span>
            </p>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
