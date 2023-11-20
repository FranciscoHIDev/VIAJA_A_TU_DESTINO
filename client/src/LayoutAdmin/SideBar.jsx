import {
  FaUsers,
  FaHotel,
  FaSuitcase,
  FaPlane,
  FaMapMarkedAlt,
  FaImages,
  FaBlog,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className="flex flex-col bg-[#131517] w-auto items-center static ">
        <div className="flex mt-5 ">
          <Link to="/auth">
            <h1 className="text-4xl text-white font-medium border-b-2 border-[#ff3e02]">
              Admin
            </h1>
          </Link>
        </div>
        <div className="flex flex-col mt-5 text-white border-none px-8 py-4 rounded-md bg-[#2d2d2e]">
          <Link to="/">
            <div className="flex items-center">
              <FaUsers className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Usuarios</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaBlog className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Blog</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaImages className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Banners</p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center mt-4">
              <FaHotel className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Hoteles</p>
            </div>
          </Link>
          <Link to="paquetes">
            <div className="flex items-center mt-4">
              <FaSuitcase className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Paquetes</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaPlane className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Vuelos</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaMapMarkedAlt className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl">Tours</p>
            </div>
          </Link>
        </div>
        <button className="mt-8 bg-white rounded-lg px-2  py-1 mx-4 text-2xl flex items-center">
          <MdLogout className="mr-2 text-[#ff3e02]" />
          Cerrar sesión
        </button>
      </div>
    </>
  );
}

export default SideBar;
