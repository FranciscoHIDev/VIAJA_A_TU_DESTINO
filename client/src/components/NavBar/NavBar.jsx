import React from "react";
import { Link } from "react-router-dom";
import {
  FaHeadset,
  FaRegHeart,
  FaSuitcase,
  FaBlog,
  FaPlane,
  FaHotel,
  FaSearchLocation,
  FaUserCircle,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { GiMayanPyramid } from "react-icons/gi";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth0/LoginButton";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FaChevronDown } from "react-icons/fa";
import LogoutButton from "../Auth0/LogoutButton";

function NavBar() {
  const { isAuthenticated, user } = useAuth0();

  return (
    <React.Fragment>
      <nav>
        <div className="flex flex-col bg-white top-0  w-full relative">
          <div className="flex flex-row items-center justify-between">
            <Link to="/">
              <img
                className="md:ml-[40px] w-[150px] md:mt-[5px] ml-[15px] mt-[2px]"
                src="https://res.cloudinary.com/duaysiozi/image/upload/v1684173882/LOGO-OFICIAL-_lmdwby.svg"
                alt="logo-oficial"
              />
            </Link>
            <div className="flex flex-row bg-[#eee] items-center md:pr-[20px] md:pl-[30px] top-0 absolute right-0 h-[50px] rounded-tl-none rounded-bl-[24px]">
              <ul className="flex flex-row list-none ml-5 md:ml-0 ">
                <li className="flex md:mr-[25px]  mr-4 color-[#444] text-[16px] items-center font-[400] ">
                  <span className="mr-[5px] ">
                    {" "}
                    <a href="tel:+52 998 283 0657">
                      <FaHeadset className="text-[20px] md:text-[18px] text-[#035373]" />
                    </a>
                  </span>{" "}
                  <a href="tel:+52 998 283 0657">
                    <span className="hidden lg:block">
                      Reservar: 998 283 0657
                    </span>
                  </a>
                </li>
                <li className="flex md:mr-[25px] mr-4  color-[#444] text-[16px] items-center font-[400] ">
                  <span className="mr-[5px] text-[#8d9fa6]">
                    <Link to="#">
                      <FaRegHeart className="text-[20px] md:text-[18px] text-[#035373] " />
                    </Link>
                  </span>
                  <Link to="#">
                    <span className="hidden lg:block">Favoritos</span>
                  </Link>
                </li>
                <li className="flex md:mr-[25px]  mr-4 color-[#444] text-[16px] items-center font-[400]">
                  {isAuthenticated && user ? (
                    <>
                      <Menu
                        menuButton={
                          <MenuButton className="">
                            <div className="flex flex-row items-center">
                              <div>
                                <FaUserCircle className="text-[20px] md:text-[18px] text-[#035373] mr-[5px]" />
                              </div>
                              <div>
                                <span className="">Hola, {user.name}</span>
                              </div>
                              <FaChevronDown className="ml-2 text-[#035373]" />
                            </div>
                          </MenuButton>
                        }
                        arrow
                        arrowClassName="bg-[#1E1F25]"
                        align="end"
                        transition
                        menuClassName="bg-[#1E1F25]"
                      >
                        <MenuItem className=" hover:bg-transparent">
                          <div className="flex flex-row items-center">
                            <Link
                              to="#"
                              className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1"
                            >
                              <div className="flex mr-3">
                                <img
                                  className="w-5 h-5"
                                  src={user.image}
                                  alt={user.name}
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-white">{user.name}</span>
                                <span className="text-white">{user.email}</span>
                              </div>
                            </Link>
                          </div>
                        </MenuItem>
                        <MenuItem className="hover:bg-transparent">
                          <Link
                            to="#"
                            className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1 text-white"
                          >
                            Perfil
                          </Link>
                        </MenuItem>
                        <MenuItem className="hover:bg-transparent">
                          <Link
                            to="#"
                            className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1"
                          >
                            <LogoutButton />
                          </Link>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <LoginButton />
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center mt-2 mb-3 w-full">
            <div className=" flex items-stretch overflow-x-scroll  lg:overflow-x-hidden lg:mx-0 mx-10">
              <div>
                <ul className="list-none flex flex-row">
                  <li className="flex flex-col items-center md:mr-[50px] mr-[14px]  text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="/paquetes">
                      <FaSuitcase className="text-[20px]" />
                    </Link>
                    <Link to="/paquetes">Paquetes</Link>
                  </li>
                  <li className="flex flex-col items-center md:mr-[50px] mr-[14px]   text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="/hoteles">
                      <FaHotel className="text-[20px]" />
                    </Link>
                    <Link to="/hoteles">Hoteles</Link>
                  </li>
                  <li className="flex flex-col items-center md:mr-[50px] mr-[14px]  text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="#">
                      <FaPlane className="text-[20px]" />
                    </Link>
                    <Link to="#">Vuelos</Link>
                  </li>
                  <li className="flex  flex-col items-center md:mr-[50px] mr-[14px]   text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="#">
                      {" "}
                      <GiMayanPyramid className="text-[20px]" />
                    </Link>
                    <Link to="#">Tours</Link>
                  </li>

                  <li className="flex flex-col items-center md:mr-[50px] mr-[14px]   text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="#">
                      {" "}
                      <FaBlog className="text-[20px]" />
                    </Link>
                    <Link to="#">Blog</Link>
                  </li>
                </ul>
              </div>
              <div>
                <a
                  href="https://viajaatudestino.priceres.com.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="rounded-md border border-[#242424] bg-[#ff] py-[0.4em] px-[1.2em]   hover:bg-[#ff3e02] hover:text-[#fff] hover:border-[#ff3e02]">
                    Cotizador
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
