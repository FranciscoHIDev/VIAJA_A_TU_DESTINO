import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <React.Fragment>
      <footer className="bg-[#3794ff]">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-20 md:px-20 px-12">
    
    {/* Sobre nosotros */}
    <section>
      <h2 className="text-2xl uppercase text-white font-medium mb-4">
        Sobre nosotros
      </h2>
      <p className="text-[18px] text-white">
        Somos una agencia de viajes 100% en línea, especializada en encontrar las mejores ofertas de hoteles y paquetes vuelo + hotel al mejor precio.
      </p>
    </section>

    {/* Legales */}
    <nav>
      <h2 className="text-2xl uppercase text-white font-medium mb-4">
        Legales
      </h2>
      <NavLink to="/aviso-de-privacidad"><p className="text-[18px] text-white hover:text-[#FF6600]">Aviso de privacidad</p></NavLink>
      <NavLink to="/politica-de-privacidad"><p className="text-[18px] text-white hover:text-[#FF6600]">Política de privacidad</p></NavLink>
      <NavLink to="/terminos-y-condiciones"><p className="text-[18px] text-white hover:text-[#FF6600]">Términos y condiciones</p></NavLink>

    </nav>

    {/* Contacto */}
    <address className="not-italic">
      <h2 className="text-2xl uppercase text-white font-medium mb-4">
        Contacto
      </h2>
      <p className="text-[18px] text-white mb-3">
        Email: contacto@viajaatudestino.com
      </p>
      <div className="flex items-center gap-3">
        <span className="text-[18px] text-white">Síguenos</span>
        <a href="https://www.facebook.com/viajaatudestinoMx" target="_blank" rel="noopener noreferrer" > {" "} <FaFacebook className="mr-2 text-2xl text-white hover:text-[#FF6600]" /> </a> <a href="https://www.instagram.com/viajaatudestinomx/" target="_blank" rel="noopener noreferrer" > <FaInstagram className="text-2xl text-white hover:text-[#FF6600]" /> </a> </div>
      
    </address>

  </div>

  {/* Footer bottom */}
  <div className="flex flex-col md:flex-row justify-between items-center py-4 text-[15px] md:px-20">
    <p className="text-white text-center">
      © 2025 viajaatudestino.com. Todos los derechos reservados.
    </p>
    <a href="https://franciscodev.vercel.app" target="_blank" rel="noopener noreferrer">
      <span className="text-white">
        Desarrollado by <strong className="text-[#FF6600]">Isidoro de Viaje</strong>
      </span>
    </a>
  </div>
</footer>

    </React.Fragment>
  );
}

export default Footer;
