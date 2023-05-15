import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="header-container">
            <img
              className=""
              src="https://res.cloudinary.com/duaysiozi/image/upload/v1684173882/LOGO-OFICIAL-_lmdwby.svg"
              alt="logo-oficial"
            />
            <div className="header-info">
              <p>Contactanos +52 998 283 0657 </p>
              <p>Iniciar Sesión</p>
              <p>Favoritos</p>
              <p>Ayuda</p>
            </div>
          </div>
          <div className="header-navegation">
            <ul>
              <li>
                <Link to="/home">Ofertas</Link>
              </li>
              <li>
                <Link to="/home">Paquetes</Link>
              </li>
              <li>
                <Link to="/home">Hoteles</Link>
              </li>
              <li>
                <Link to="/home">Vuelos</Link>
              </li>
              <li>
                <Link to="/home">Tours</Link>
              </li>
              <li>
                <Link to="/home">Blog</Link>
              </li>
            </ul>
            
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
