import React from "react";
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
            <div className="flex items-center ml-10">
              <FaPlus />
              <p className="ml-2">Añadir</p>
            </div>
            <div className="flex items-center ml-10">
              <FaSignal />
              <p className="ml-2">Insights</p>
            </div>
          </div>
          <div className="flex">
            <Link to="/">
              <div className="flex flex-row items-center">
                <img
                  className="w-5 h-5 rounded-full mr-2"
                  src="https://media.licdn.com/dms/image/D4E35AQGXBtCBhpNixw/profile-framedphoto-shrink_100_100/0/1680011008516?e=1687737600&v=beta&t=B2SbKS4m8Rjs6ueg66vc5HDaPmLnifoBcV0OQVR7f-E"
                  alt="image"
                />
                <p className="">Hola, Admin</p>
                <FaChevronDown className="mt-1 ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
