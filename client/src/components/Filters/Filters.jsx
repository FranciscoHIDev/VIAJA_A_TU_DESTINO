import React from "react";

function Filters() {
  return (
    <React.Fragment>
      <div className="ml-[20px] flex flex-row mt-3">
        <button className="mr-4 bg-[#53b3cb] rounded-lg px-2 text-white font-medium active:bg-[#ff3e02]">
          Seleccionar todo
        </button>
        <button className="mr-4 bg-[#53b3cb] rounded-lg px-2 text-white font-medium  active:bg-[#ff3e02]">
          Paquetes
        </button>
        <button className="mr-4 bg-[#53b3cb] rounded-lg px-2 text-white font-medium  active:bg-[#ff3e02]">
          Hoteles
        </button>
        <button className="mr-4  bg-[#53b3cb] rounded-lg px-2 text-white font-medium  active:bg-[#ff3e02]">
          Vuelos
        </button>
        <button className=" bg-[#53b3cb] rounded-lg px-2 text-white font-medium  active:bg-[#ff3e02]">
          Tours
        </button>
      </div>
    </React.Fragment>
  );
}

export default Filters;
