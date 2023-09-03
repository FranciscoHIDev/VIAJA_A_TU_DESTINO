import React from "react";
import { MdLocationOn, MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterByHotels, getAllOffers } from "../../redux/actions/actions";

function Filters() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);

  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  function handleHotels(e) {
    e.preventDefault();
    dispatch(filterByHotels(e.target.value));
  }

  return (
    <React.Fragment>
      <div className="md:flex flex-col hidden">
        <div className="p-1 bg-[#ddf3fa] rounded-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <MdLocationOn className="text-[#ff3e02] text-[20px] mr-1" />
              <p className="text-[14px] text-zinc-600">SALIENDO DESDE</p>
            </div>
            <button className="text-[#ff3e02] text-[15px]">Quitar</button>
          </div>
          <div className="mx-3 mt-2">
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Ciudad de México{" "}
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className=" cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Monterrey
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Guadalajara
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Cancún
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Veracruz
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Ciudad Juárez
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Santa Lucia
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                Tijuana
              </label>
            </div>
            <div className="cursor-pointer hover:bg-[#53b3cb]">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Ciudad de México"
                  value="Ciudad de México"
                />
                León / Bajío
              </label>
            </div>
          </div>
        </div>
        <div className="bg-[#ddf3fa] p-2 mt-5 rounded-md">
          <div className="flex justify-between">
            <div className="flex items-center">
              <MdLocalOffer className="text-[#ff3e02] text-[20px] mr-1" />
              <p className="text-[14px] text-zinc-600">TIPO DE OFERTA</p>
            </div>
            <button className="text-[#ff3e02] text-[15px]">Quitar</button>
          </div>
          <div className="mx-3 mt-2">
            <div className="flex justify-between hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
                Paquete
              </label>
            </div>
            <div
              className="flex justify-between hover:bg-[#53b3cb] cursor-pointer"
              onClick={handleHotels}
            >
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Paquete"
                  value="hotel"
                />
                Hotel
              </label>
            </div>
            <div className="flex hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
                Vuelo
              </label>
            </div>
            <div className="flex justify-between hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Paquete"
                  value="paquete"
                />
                Tour
              </label>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Filters;
