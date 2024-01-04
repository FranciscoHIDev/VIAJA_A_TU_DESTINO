import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeadset,
  FaSuitcase,
  FaPlane,
  FaHotel,
  FaUserCircle,
} from "react-icons/fa";
import { GiMayanPyramid } from "react-icons/gi";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth0/LoginButton";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { FaChevronDown } from "react-icons/fa";
import LogoutButton from "../Auth0/LogoutButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, postUser } from "../../redux/actions/actions";

function NavBar() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const [userDB, setUserDB] = useState({});

  React.useEffect(() => {
    dispatch(getAllUsers);
  }, [dispatch]);

  const usersDB = useSelector((state) => state.users);

  React.useEffect(() => {
    if (user && isAuthenticated) {
      const myUser = usersDB.find((e) => e.email === user.email);
      if (myUser) {
        setUserDB(myUser);
      } else {
        const newUser = {
          name: user.given_name,
          lastName: user.family_name,
          email: user.email,
          image: user.image,
        };
        dispatch(postUser(newUser));
      }
    }
  }, [user, isAuthenticated, usersDB, dispatch]);

  return (
    <React.Fragment>
      <nav>
        <div className="flex flex-col bg-white top-0  w-full relative md:py-4">
          <div className="flex flex-row items-center justify-between ">
            <div className="flex items-center">
              <div>
                <Link to="/">
                  <img
                    className="md:ml-[40px] w-[150px] md:mt-[5px] ml-[15px] mt-[2px]"
                    src="https://res.cloudinary.com/duaysiozi/image/upload/v1684173882/LOGO-OFICIAL-_lmdwby.svg"
                    alt="logo-oficial"
                  />
                </Link>
              </div>

              <div className="lg:flex ml-16 hidden">
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
                    <Link to="/vuelos">
                      <FaPlane className="text-[20px]" />
                    </Link>
                    <Link to="/vuelos">Vuelos</Link>
                  </li>
                  <li className="flex  flex-col items-center md:mr-[50px] mr-[14px]   text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="/tours">
                      {" "}
                      <GiMayanPyramid className="text-[20px]" />
                    </Link>
                    <Link to="/tours">Tours</Link>
                  </li>
                  <li className="flex items-center">
                    <a
                      href="https://viajaatudestino.priceres.com.mx/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="rounded-md  py-[1px] px-[5px] text-[#fff]  bg-[#ff3e02] font-medium hover:bg-[#53b3cb]">
                        Cotizador
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-row bg-[#eee] items-center md:pr-[20px] md:pl-[30px] pl-2 top-0 absolute right-0 md:h-[60px] h-[50px] rounded-tl-none rounded-bl-[30px]">
              <ul className="flex flex-row list-none ml-2 md:ml-0 ">
                <li className="flex md:mr-[25px]  mr-2 color-[#444] text-[16px] items-center font-[400] ">
                  <span className="mr-[5px] ">
                    {" "}
                    <a href="tel:+52 998 283 0657">
                      <FaHeadset className="text-[19px] md:text-[18px] text-[#035373]" />
                    </a>
                  </span>{" "}
                  <a href="tel:+52 998 283 0657">
                    <span className="hidden lg:block">
                      Reservar: 998 283 0657
                    </span>
                  </a>
                </li>

                <li className="flex md:mr-[25px]  mr-2 color-[#444] text-[16px] items-center font-[400]">
                  {isAuthenticated && user ? (
                    <>
                      <Menu
                        menuButton={
                          <MenuButton className="">
                            <div className="flex flex-row items-center">
                              <div>
                                <FaUserCircle className="text-[19px] md:text-[18px] text-[#035373] mr-[5px]" />
                              </div>
                              <div>
                                <span className="text-[15px]">
                                  Hi, {userDB.name}
                                </span>
                              </div>
                              <FaChevronDown className="ml-2 text-[#035373] text-[15px]" />
                            </div>
                          </MenuButton>
                        }
                        align="end"
                        transition
                        arrow
                        menuClassName="bg-white"
                      >
                        <MenuItem className=" hover:bg-transparent">
                          <div className="flex flex-row items-center border-b-[1px]">
                            <Link
                              to="#"
                              className="rounded-lg transition-colors  flex items-center gap-x-2 py-1 px-4 flex-1"
                            >
                              <div className="flex mr-3">
                                <img
                                  className="w-5 h-5"
                                  src={userDB.image}
                                  alt={userDB.name}
                                />
                              </div>
                              <div className="flex flex-col ">
                                <span className="text-black ">
                                  {userDB.name}
                                </span>
                                <span className="text-black">
                                  {userDB.email}
                                </span>
                              </div>
                            </Link>
                          </div>
                        </MenuItem>
                        {userDB.role === "user" ? (
                          <MenuItem className="hover:bg-transparent">
                            <Link
                              to="/mi-perfil/favoritos"
                              className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1 text-black hover:text-white"
                            >
                              Favoritos
                            </Link>
                          </MenuItem>
                        ) : null}

                        {isAuthenticated && userDB.role === "superAdmin" ? (
                          <MenuItem className="hover:bg-transparent">
                            <Link
                              to="/auth"
                              className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1 text-black  hover:text-white"
                            >
                              Web Admin
                            </Link>
                          </MenuItem>
                        ) : (
                          <MenuItem className="hover:bg-transparent">
                            <Link
                              to="/mi-perfil"
                              className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1 text-black  hover:text-white"
                            >
                              Mi Perfil
                            </Link>
                          </MenuItem>
                        )}
                        <MenuItem className="hover:bg-transparent">
                          <Link
                            to="#"
                            className="rounded-lg transition-colors hover:bg-[#131517] flex items-center gap-x-2 py-1 px-4 flex-1 text-black  hover:text-white"
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
          <div className="flex flex-row justify-around items-center mt-2 mb-3 w-full lg:hidden">
            <div className=" flex items-center  lg:mx-0 mx-5">
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
                    <Link to="/vuelos">
                      <FaPlane className="text-[20px]" />
                    </Link>
                    <Link to="/vuelos">Vuelos</Link>
                  </li>
                  <li className="flex  flex-col items-center md:mr-[50px] mr-[14px]   text-[16px] text-[#444]  hover:text-[#035373]">
                    <Link to="/tours">
                      {" "}
                      <GiMayanPyramid className="text-[20px]" />
                    </Link>
                    <Link to="/tours">Tours</Link>
                  </li>
                </ul>
              </div>
              <div>
                <a
                  href="https://viajaatudestino.priceres.com.mx/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="rounded-md  py-[1px] px-[5px] text-[#fff]  bg-[#ff3e02] font-medium">
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
