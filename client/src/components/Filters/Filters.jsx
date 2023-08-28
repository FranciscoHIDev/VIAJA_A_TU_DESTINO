import React from "react";
import { MdLocationOn, MdLocalOffer } from "react-icons/md";

function Filters() {
  return (
    <React.Fragment>
      <div className="flex flex-col">
        <div className="p-1 bg-blue-100 rounded-md w-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MdLocationOn className="text-[#ff3e02] text-[20px] mr-1" />
              <p className="text-[15px] text-zinc-600">SALIENDO DESDE</p>
            </div>
            <button className="text-[#ff3e02]">Quitar</button>
          </div>
          <div className="mx-3 mt-2">
            <div>
              <label>
                Ciudad de México{" "}
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Monterrey
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Guadalajara
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Cancún
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Veracruz
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Ciudad Juárez
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Santa Lucia
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                Tijuana
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
            <div>
              <label>
                León / Bajío
                <input
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="bg-blue-100 p-2 mt-5 rounded-md">
          <div className="flex justify-between">
            <div className="flex items-center">
              <MdLocalOffer className="text-[#ff3e02] text-[20px] mr-1" />
              <p className="text-[15px] text-zinc-600">TIPO DE OFERTA</p>
            </div>

            <button className="text-[#ff3e02]">Quitar</button>
          </div>
          <div className="mx-3 mt-2">
            <div className="flex justify-between">
              <label className="cursor-pointer">
                Paquete
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <label className="cursor-pointer">
                Hotel
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
              </label>
            </div>
            <div className="flex">
              <label className="cursor-pointer">
                Vuelo
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <label className="cursor-pointer">
                Tour
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Filters;
