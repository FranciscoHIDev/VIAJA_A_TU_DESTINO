import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeadset,
  FaUserCircle,
  FaRegQuestionCircle,
  FaRegHeart,
  FaSuitcase,
  FaBlog,
} from "react-icons/fa";
import { MdLocalOffer, MdHotel, MdFlight } from "react-icons/md";
import { GiMayanPyramid, GiWorld } from "react-icons/gi";

function NavBar() {
  return (
    <>
      <nav>
        <div className="flex flex-col bg-white top-0 absolute w-full">
          <div className="flex flex-row items-center justify-between">
            <Link to="/">
              <img
                className="md:ml-[40px] w-[150px] md:mt-[5px] ml-[15px] mt-[2px]"
                src="https://res.cloudinary.com/duaysiozi/image/upload/v1684173882/LOGO-OFICIAL-_lmdwby.svg"
                alt="logo-oficial"
              />
            </Link>
            <div className="flex flex-row bg-[#eee] items-center md:pr-[20px] md:pl-[30px] top-0 absolute right-0 h-[50px] rounded-tl-none rounded-bl-[24px]">
              <ul className="flex flex-row list-none ml-5 md:ml-0">
                <li className="flex md:mr-[25px]  mr-4 color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px] ">
                    {" "}
                    <a href="tel:+52 998 283 0657">
                      <FaHeadset className="text-[20px] md:text-[18px] text-[#035373]" />
                    </a>
                  </span>{" "}
                  <a href="tel:+52 998 283 0657">
                    <span className="hidden md:block">
                      Reservar: 998 283 0657
                    </span>
                  </a>
                </li>
                <li className="flex md:mr-[25px]  mr-4 color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px]">
                    <Link to="/favorite">
                      <FaUserCircle className="text-[20px] md:text-[18px] text-[#035373]" />
                    </Link>
                  </span>{" "}
                  <Link to="/favorite">
                    <span className="hidden md:block">Iniciar sesión</span>
                  </Link>
                </li>
                <li className="flex md:mr-[25px]  mr-4 color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px] text-[#8d9fa6]">
                    <Link to="/favorite">
                      <FaRegHeart className="text-[20px] md:text-[18px] text-[#035373]" />
                    </Link>
                  </span>
                  <Link to="/favorite">
                    <span className="hidden md:block">Favoritos</span>
                  </Link>
                </li>
                <li className="flex md:mr-[25px]  mr-4  color-[#444] text-[16px] items-center font-[400]">
                  <span className="mr-[5px] ">
                    <Link to="/favorite">
                      <FaRegQuestionCircle className="text-[20px] md:text-[18px] text-[#035373]" />
                    </Link>
                  </span>
                  <Link to="/favorite">
                    <span className="hidden md:block">Ayuda</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center mt-[10px] mb-5 relative w-full">
            <div className=" flex items-center overflow-y-hidden overflow-x-scroll md:overflow-x-hidden scroll-smooth md:mx-0 mx-10">
              <div>
                <ul className="list-none flex flex-row">
                  <li className="flex flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <MdLocalOffer />
                    <Link to="/home">Ofertas</Link>
                  </li>
                  <li className="flex flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <FaSuitcase />
                    <Link to="/home">Paquetes</Link>
                  </li>
                  <li className="flex flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <MdHotel />
                    <Link to="/home">Hoteles</Link>
                  </li>
                  <li className="flex flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <MdFlight />
                    <Link to="/home">Vuelos</Link>
                  </li>
                  <li className="flex  flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <GiMayanPyramid />
                    <Link to="/home">Tours</Link>
                  </li>
                  <li className="flex flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <GiWorld />
                    <Link to="/home">Destinos</Link>
                  </li>
                  <li className="flex flex-col items-center mr-[50px] text-[16px] text-[#444]">
                    <FaBlog />
                    <Link to="/home">Blog</Link>
                  </li>
                  {/* <li className="flex mr-[50px] text-[16px] text-[#444]">
                    <Link to="/sobre-nosotros">Acerca de</Link>
                  </li> */}
                </ul>
              </div>
              <div>
                <button className="rounded-md border border-[#242424] bg-[#ff] py-[0.4em] px-[1.2em]   hover:bg-[#ff3e02] hover:text-[#fff] hover:border-[#ff3e02]">
                  Cotizador
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
