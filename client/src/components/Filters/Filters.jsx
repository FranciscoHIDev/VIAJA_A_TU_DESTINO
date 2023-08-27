import React from "react";

function Filters() {
  return (
    <React.Fragment>
      <div className="w-auto">
        <div className="flex justify-between border-gray-400 border p-2">
          <p>Filtros</p>
          <p>Quitar Todos</p>
        </div>
        <div className="border-gray-400 border p-2">
          <div className="flex justify-between">
            <p>SALIENDO DESDE</p>
            <p>Quitar</p>
          </div>
          <div className="mx-3 mt-2">
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
            <div>
              <p>Cancún</p>
            </div>
          </div>
        </div>
        <div className="border-gray-400 border p-2">
          <div className="flex justify-between">
            <p>Tipo de oferta</p>
            <p>Quitar</p>
          </div>
          <div className="mx-3 mt-2">
            <div className="flex justify-between">
              <label>Paquete</label>
              <input type="checkbox" name="Paquete" value="paquete" />
            </div>
            <div className="flex justify-between">
              <label>Hotel</label>
              <input type="checkbox" name="Paquete" value="paquete" />
            </div>
            <div className="flex justify-between">
              <label>Vuelo</label>
              <input type="checkbox" name="Paquete" value="paquete" />
            </div>
            <div className="flex justify-between">
              <label>Tour</label>
              <input type="checkbox" name="Paquete" value="paquete" />
            </div>
          </div>
        </div>
        {/* <div className="ml-[20px] flex md:flex-col  mt-3">
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
        </div> */}
      </div>
    </React.Fragment>
  );
}

export default Filters;
