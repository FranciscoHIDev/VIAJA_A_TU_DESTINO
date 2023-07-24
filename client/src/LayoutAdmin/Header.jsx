import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

import { FaHome, FaPlus, FaChevronDown, FaSignal } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className=" bg-black text-white px-8 justify-between py-3  w-full top-0">
        <div className="flex flex-row justify-between">
          <div className="flex">
            <Link to="/">
              <div className="flex items-center ">
                <FaHome />
                <p className="ml-2">Home</p>
              </div>
            </Link>
            <div className="flex  ml-10">
              <Menu
                menuButton={
                  <MenuButton className="flex flex-row items-center">
                    <FaPlus className="mr-2" />
                    <span>Añadir</span>
                  </MenuButton>
                }
                align="start"
                arrow
                arrowClassName="bg-[#131517]"
                transition
                // menuClassName="bg-[#131517]"
              >
                <MenuItem>
                  <Link
                    to="#"
                    className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                  >
                    <span className=" bg-red-300 rounded-lg px-2 ">New</span>
                    Paquete Vuelo + Hotel
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                  >
                    <span className="bg-red-300 rounded-lg px-2  ">New</span>
                    Hotel
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#Icon ? ("
                    className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                  >
                    <span className="bg-red-300 rounded-lg px-2">New</span>
                    Vuelo
                  </Link>
                </MenuItem>
                <MenuItem>
                  {" "}
                  <Link
                    to="#"
                    className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                  >
                    <span className="bg-red-300 rounded-lg px-2">New</span>
                    Tour
                  </Link>
                </MenuItem>
              </Menu>
            </div>
            <div className="flex items-center ml-10">
              <FaSignal />
              <p className="ml-2">Insights</p>
            </div>
          </div>
          <div className="flex">
            <Menu
              menuButton={
                <MenuButton className="">
                  <div className="flex flex-row items-center">
                    <div>
                      <img
                        className="w-5 h-5  mr-2"
                        src="https://res.cloudinary.com/duaysiozi/image/upload/v1690172933/favicon_idaanl.png"
                        alt="image"
                      />
                    </div>
                    <div>
                      <span className="">Hola, Admin</span>
                    </div>
                    <FaChevronDown className="ml-2" />
                  </div>
                </MenuButton>
              }
              align="end"
              arrow
              arrowClassName="bg-[#131517]"
              transition
              // menuClassName="bg-[#131517]"
            >
              <MenuItem className=" hover:bg-transparent">
                <div className="flex flex-row items-center">
                  <Link
                    to="#"
                    className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                  >
                    <div className="flex mr-3">
                      <img
                        className="w-5 h-5"
                        src="https://res.cloudinary.com/duaysiozi/image/upload/v1690172933/favicon_idaanl.png"
                        alt="name"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span>Isidoro</span>
                      <span>ihilario00@gamil.com</span>
                    </div>
                  </Link>
                </div>
              </MenuItem>
              <MenuItem className="hover:bg-transparent">
                <Link
                  to="#"
                  className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                >
                  Perfil
                </Link>
              </MenuItem>
              <MenuItem className="hover:bg-transparent">
                <Link
                  to="#"
                  className="rounded-lg transition-colors hover:bg-[#a8a9aa] flex items-center gap-x-2 py-1 px-4 flex-1"
                >
                  Cerrar sesión
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
