import { FaUsers, FaHotel, FaImages, FaBlog } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div className="flex flex-col bg-[#d0d0df] w-auto items-center static ">
        <div className="flex mt-10 ">
          <Link to="/auth">
            <h1 className="text-4xl text-[#253777] font-medium border-b-2 border-[#ff3e02]">
              Mi perfil
            </h1>
          </Link>
        </div>
        <div className="flex flex-col mt-5 text-white border-none px-8 py-4 rounded-md ">
          <Link to="/">
            <div className="flex items-center">
              <FaUsers className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-black">Mis datos</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaBlog className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-black">Favoritos</p>
            </div>
          </Link>
          <Link to="/">
            <div className="flex items-center mt-4">
              <FaImages className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-black">Mis alertas</p>
            </div>
          </Link>

          <Link to="/">
            <div className="flex items-center mt-4">
              <FaHotel className="text-[#ff3e02] mr-3 text-2xl" />
              <p className="text-2xl text-black">Hoteles</p>
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