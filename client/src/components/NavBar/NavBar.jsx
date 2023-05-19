import React from "react";
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
        <div className="flex flex-col bg-white top-0 absolute w-full">
          <div className="flex flex-row items-center justify-between">
            <Link to="/">
              <img
                className="ml-[40px] w-[150px] mt-[5px]"
                src="https://res.cloudinary.com/duaysiozi/image/upload/v1684173882/LOGO-OFICIAL-_lmdwby.svg"
                alt="logo-oficial"
              />
            </Link>
            <div className="flex flex-row bg-[#eee] items-center pr-[30px] pl-[30px] top-0 absolute right-0 h-[50px] rounded-tl-none rounded-bl-[30px]">
              <ul className="flex flex-row list-none">
                <li className="flex mr-[25px] text-[#444] text-[16px] items-center font-[400]">
                  <a href="tel:+52 998 283 0657">
                    <span className="text-[#035373]">
                      <FaHeadset className="mr-[20px]" />
                    </span>
                    <span>Reservar: 998 283 0657</span>
                  </a>
                </li>
                <li className="flex mr-[25px] color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px] text-[#035373]">
                    {" "}
                    <FaUserCircle />
                  </span>{" "}
                  <Link to="/favorite">
                    <span>Iniciar sesión</span>
                  </Link>
                </li>
                <li className="flex mr-[25px] color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px] text-[#035373]">
                    <FaRegHeart />
                  </span>
                  <Link to="/favorite">
                    <span>Favoritos</span>
                  </Link>
                </li>
                <li className="flex mr-[25px] color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px] text-[#035373]">
                    <FaRegQuestionCircle />
                  </span>
                  <Link to="/favorite">
                    <span>Ayuda</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center mt-[5px]">
            <div>
              <ul className="list-none flex flex-row font-[400]">
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Ofertas</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Paquetes</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Hoteles</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Vuelos</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Tours</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Destinos</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Blog</Link>
                </li>
                <li className="flex mr-[50px] text-[20px] text-[#444]">
                  <Link to="/home">Sobre nosotros</Link>
                </li>
              </ul>
            </div>
            <div>
              <button className="rounded-md border border-[#242424] bg-[#ff] py-[0.4em] px-[1.2em]   hover:bg-[#ff3e02] hover:text-[#fff] hover:border-[#ff3e02]">
                Cotizador
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
