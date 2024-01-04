import { FaUsers, FaHotel, FaImages } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className="flex flex-col bg-[#292929] w-auto items-center static ">
        <div className="flex mt-10 ">
          <Link to="/auth">
            <h1 className="text-4xl text-[#fff] font-medium border-b-2 border-[#ff3e02]">
              Mi perfil
            </h1>
          </Link>
        </div>
        <div className="flex flex-col mt-5 text-white border-none px-8 py-4 rounded-md ">
          <Link to="/">
            <div className="flex items-center">
              <FaUsers className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-white">Mis datos</p>
            </div>
          </Link>
          <Link to="favoritos">
            <div className="flex items-center mt-4">
              <MdFavorite className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-white">Favoritos</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaImages className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-white">Mis alertas</p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center mt-4">
              <FaHotel className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-white">Hoteles</p>
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
