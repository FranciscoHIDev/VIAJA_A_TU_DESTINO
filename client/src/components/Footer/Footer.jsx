import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <footer className="bg-[#f8f9fa]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-20 md:px-6 px-10">
          {/* Sobre nosotros */}
          <section>
            <h2 className="text-[18px] uppercase text-[#333] font-medium mb-4">
              Sobre nosotros
            </h2>
            <p className="text-[18px] text-[#555] ">
              Cazamos las mejores ofertas de viaje para ti, desde hoteles,
              vuelos y paquetes con promociones exclusivas, pagos flexibles y
              meses sin intereses.
            </p>
          </section>

          {/* Legales */}
          <nav>
            <h2 className="text-[18px]  uppercase text-[#333]  font-medium mb-4">
              Legales
            </h2>
            <NavLink to="/aviso-de-privacidad">
              <p className="text-[18px] text-[#555]  hover:text-[#FF6600]">
                Aviso de privacidad
              </p>
            </NavLink>
            <NavLink to="/politica-de-privacidad">
              <p className="text-[18px] text-[#555]  hover:text-[#FF6600]">
                Política de privacidad
              </p>
            </NavLink>
            <NavLink to="/terminos-y-condiciones">
              <p className="text-[18px] text-[#555]  hover:text-[#FF6600]">
                Términos y condiciones
              </p>
            </NavLink>
          </nav>

          {/* Contacto */}
          <address className="not-italic">
            <h2 className="text-[18px]  uppercase text-[#333] font-medium mb-4">
              Contacto
            </h2>
            <p className="text-[18px] text-[#555]  mb-3">
              Email: contacto@viajaatudestino.com
            </p>
            <p className="text-[18px] text-[#555]  mb-3">
              WhatsApp: 998 495 4637
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[18px] text-[#555] ">Síguenos</span>
              <a
                href="https://www.facebook.com/viajaatudestinoMx"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaFacebook className="mr-2 text-2xl text-[#555]  hover:text-[#FF6600]" />{" "}
              </a>{" "}
              <a
                href="https://www.instagram.com/viajaatudestinomx/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FaInstagram className="text-2xl text-black  hover:text-[#FF6600]" />{" "}
              </a>{" "}
            </div>
          </address>
        </div>

        {/* Footer bottom */}
        <div className="bg-[#f0f0f0] flex flex-col md:flex-row justify-between items-center py-4 text-[15px] md:px-20">
          <p className="text-[#555]  text-center font-medium">
            © 2026 viajaatudestino.com. Todos los derechos reservados.
          </p>

          <span className="text-[#555]  font-medium">
            ✈️ Cazamos las mejores ofertas de viaje para ti
          </span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
