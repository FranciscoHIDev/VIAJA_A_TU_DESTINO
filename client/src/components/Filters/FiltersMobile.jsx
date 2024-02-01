import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByDeparture,
  filterByDestination,
  getAllOffers,
} from "../../redux/actions/actions";

function FiltersMobile() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);

  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  function handleCategory(e) {
    e.preventDefault(e);
    dispatch(filterByCategory(e.target.value));
  }

  function handleDeparture(e) {
    e.preventDefault(e);
    dispatch(filterByDeparture(e.target.value));
  }
  function handleDestination(e) {
    e.preventDefault(e);
    dispatch(filterByDestination(e.target.value));
  }

  function handleClearFilter(e) {
    e.preventDefault(e);
    dispatch(getAllOffers);
  }
  return (
    <React.Fragment>
      <div className="flex flex-row  items-center justify-between md:hidden px-2 bg-white mx-3 py-2 rounded-xl border">
        <div>
          <select
            className="rounded-xl  border-2 p-1 outline-none text-[12px]"
            onChange={handleCategory}
          >
            <option value={""}>Categorías</option>
            <option value="Paquete">Paquetes</option>
            <option value="Hotel">Hoteles</option>
            <option value="Vuelo">Vuelos</option>
            <option value="Tour">Tours</option>
          </select>
        </div>

        <div>
          <select
            className="rounded-xl  border-2  p-1 outline-none text-[12px]"
            onChange={handleDestination}
          >
            <option value={""}>Destinos</option>
            {[...new Set(offers.map((offer) => offer.destination.name))].map(
              (destination, index) => (
                <option key={index}>{destination}</option>
              )
            )}
          </select>
        </div>
        <div className="flex items-center">
          <button
            className=" bg-[#ff3e02] text-white px-1 rounded-md text-[12px]"
            onClick={(e) => handleClearFilter(e)}
          >
            Limpiar
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FiltersMobile;
