import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full">
        <div className="flex lg:flex-row justify-around bg-[#a8b3b3] py-10 flex-col items-center">
          <div>
            <div className="flex mb-3">
              <h2 className="text-2xl uppercase">Sobre nosotros</h2>
            </div>
            <div className="text-[18px]">
              <p>¿Quiénes somos?</p>
              <p>Preguntas frecuentes</p>
              <p>Trabaja con nosotros</p>
            </div>
          </div>
          <div>
            <div className="flex mb-3">
              <h2 className="text-2xl uppercase">Legales</h2>
            </div>
            <div className="text-[18px]">
              <p>Aviso de privacidad</p>
              <p>Política de privacidad</p>
              <p>Términos y condiciones</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex mb-3">
              <h2 className="text-2xl uppercase">Contacto</h2>
            </div>
            <div className="flex flex-col">
              <div>
                <p className="text-[18px]">
                  Email: <span>contacto@viajaatudestino.com</span>
                </p>
              </div>
              <div className="flex flex-row items-center">
                <p className="text-[18px] mr-2">Síguenos</p>
                <FaFacebook className="mr-2 text-2xl" />
                <FaInstagram className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:flex-row lg:justify-around bg-[#884e11] py-2 flex-col  justify-center">
          <p>
            Copyright © 2023 viajaatudestino.com. Todos los derechos reservados.
          </p>
          <a
            href="https://franciscodev.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Powered by FranciscoDEv</p>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
