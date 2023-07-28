import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from "react-icons/fa";

function LoginButton() {
  const { loginWithPopup } = useAuth0();
  return (
    <React.Fragment>
      <button
        className="hidden lg:flex items-center "
        onClick={() => loginWithPopup()}
      >
        <FaUserCircle className="text-[20px] md:text-[18px] text-[#035373] mr-[5px]" />
        Iniciar sesión
      </button>
      <button
        className=" lg:hidden items-center "
        onClick={() => loginWithPopup()}
      >
        <FaUserCircle className="text-[20px] md:text-[18px] text-[#035373] mr-[5px]" />
      </button>
    </React.Fragment>
  );
}

export default LoginButton;
