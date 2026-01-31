import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from "react-icons/fa";

function LoginButton() {
  const { loginWithPopup } = useAuth0();
  return (
    <React.Fragment>
      <button
        className="hidden lg:flex items-center border-none "
        onClick={() => loginWithPopup()}
      >
        <FaUserCircle className="text-[20px] md:text-[18px] mr-[5px] text-white" />
        <span className="text-white font-semibold">Iniciar sesión</span>
      </button>
      <button
        className=" lg:hidden items-center border-none"
        onClick={() => loginWithPopup()}
      >
        <FaUserCircle className="text-[20px] md:text-[18px] mr-[5px] text-white font-semibold" />
      </button>
    </React.Fragment>
  );
}

export default LoginButton;
