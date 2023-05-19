import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <React.Fragment>
      <div className="container-footer">
        <div className="first-footer">
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
        <div className="footer-second">
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
