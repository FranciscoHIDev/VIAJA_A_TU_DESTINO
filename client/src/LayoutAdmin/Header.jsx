import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className=" bg-black text-white px-8 justify-between py-3 fixed w-full top-0">
        <div className="flex flex-row justify-between">
          <div className="flex">
            <Link to="/">
              <div className="flex items-center ">
                <FaHome />
                <p className="ml-2">Home</p>
              </div>
            </Link>
            <div className="ml-10">
              <p>Añadir</p>
            </div>
          </div>
          <div className="flex">
            <p className="mr-2">Hola, Admin</p>
            <img src="image" alt="image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
