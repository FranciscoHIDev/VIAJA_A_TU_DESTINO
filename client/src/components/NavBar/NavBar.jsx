import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import {
  FaHeadset,
  FaUserCircle,
  FaRegQuestionCircle,
  FaRegHeart,
} from "react-icons/fa";

function NavBar() {
  return (
    <>
      <nav>
        <div className="navbar-container">
          <div className="header-container">
            <Link to="/">
              <img
                className="logo-image"
                src="https://res.cloudinary.com/duaysiozi/image/upload/v1684173882/LOGO-OFICIAL-_lmdwby.svg"
                alt="logo-oficial"
              />
            </Link>
            <div className="header-info">
              <ul className="items-list">
                <li className="list-info">
                  <a href="tel:+52 998 283 0657">
                    <span className="icon-header-info">
                      <FaHeadset />
                    </span>
                    <span>Reservar: 998 283 0657</span>
                  </a>
                </li>
                <li className="list-info">
                  <span className="icon-header-info">
                    {" "}
                    <FaUserCircle className="icon" />
                  </span>{" "}
                  <Link to="/favorite">
                    <span>Iniciar sesión</span>
                  </Link>
                </li>
                <li className="list-info">
                  <span className="icon-header-info">
                    <FaRegHeart />
                  </span>
                  <Link to="/favorite">
                    <span>Favoritos</span>
                  </Link>
                </li>
                <li className="list-info">
                  <span className="icon-header-info">
                    <FaRegQuestionCircle />
                  </span>
                  <Link to="/favorite">
                    <span>Ayuda</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-navegation">
            <div>
              <ul className="items-menu">
                <li className="list-menu">
                  <Link to="/home">Ofertas</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Paquetes</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Hoteles</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Vuelos</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Tours</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Destinos</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Blog</Link>
                </li>
                <li className="list-menu">
                  <Link to="/home">Sobre nosotros</Link>
                </li>
              </ul>
            </div>
            <div>
              <button>Cotizador</button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
