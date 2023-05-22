import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { AiOutlineLine } from "react-icons/ai";

function Footer() {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full">
        <div className="flex md:flex-row flex-col md:justify-around bg-[#011c39] py-10  md:items-center md:pl-0 pl-10">
          <div>
            <div className="flex  flex-col mb-4 md:items-center ">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Sobre nosotros
              </h2>
            </div>
            <div className="text-[18px] md:mb-0 mb-4 md:items-center flex flex-col">
              <p className="text-white hover:text-[#ff3e02]">¿Quiénes somos?</p>
              <p className="text-white hover:text-[#ff3e02]">
                Preguntas frecuentes
              </p>
              <p className="text-white hover:text-[#ff3e02]">
                Trabaja con nosotros
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col mb-4 md:items-center">
              <h2 className="text-2xl uppercase text-white font-[500]">
                Legales
              </h2>
            </div>
            <div className="text-[18px] md:mb-0 mb-4 flex flex-col md:items-center">
              <p className="text-white hover:text-[#ff3e02]">
                Aviso de privacidad
              </p>
              <p className="text-white hover:text-[#ff3e02]">
                Política de privacidad
              </p>
              <p className="text-white hover:text-[#ff3e02]">
                Términos y condiciones
              </p>
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
                <FaFacebook className="mr-2 text-2xl text-white hover:text-[#ff3e02]" />
                <FaInstagram className="text-2xl text-white hover:text-[#ff3e02]" />
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
            href="https://franciscodev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white drop-shadow-[0.1em_0.1em_0.1em_black] hover:text-[#ff3e02]">
              Desarrollado by FranciscoDEv
            </p>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
