import React from "react";

function SideBar() {
  return (
    <>
      <div className="flex flex-col bg-[#131517] w-full items-center">
        <div className="flex mt-5">
          <h1 className="text-4xl text-white">
            Admin<span className="text-5xl text-[#ff3e02]">.</span>
          </h1>
        </div>
        <div className="flex flex-col mt-5 text-white">
          <p className="text-2xl">Menu</p>
          <p className="text-2xl">Ofertas</p>
          <p className="text-2xl">Hoteles</p>
          <p className="text-2xl">Paquetes</p>
        </div>
      </div>
    </>
  );
}

export default SideBar;
