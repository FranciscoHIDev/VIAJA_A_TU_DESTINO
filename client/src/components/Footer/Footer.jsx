import React from "react";

function Footer() {
  return (
    <React.Fragment>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-around bg-[#a8b3b3]">
          <div>
            <h3>Contacto</h3>
          </div>
          <div>
            {" "}
            <h3>Empresa</h3>
          </div>
          <div>
            {" "}
            <h3>Legales</h3>
          </div>
        </div>
        <div className="flex flex-row justify-around bg-[#a8b3b3]">
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
