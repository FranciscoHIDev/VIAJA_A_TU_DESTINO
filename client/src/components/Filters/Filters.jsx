import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  filterByCategory,
  filterByDeparture,
  filterByDestination,
  getAllOffers,
} from "../../redux/actions/actions";

function Filters() {
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
      <div className="md:flex flex-row justify-center items-center hidden bg-white mx-40 py-4 rounded-md border ">
        <div className="mr-10 hidden md:block">
          <p className="text-[#ff3e02] font-bold">Filtrar por:</p>
        </div>
        <div className="mr-10">
          <select
            className="rounded-xl  border-2  p-1 outline-none"
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
            className="rounded-xl  border-2  p-1 outline-none"
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
        <div>
          <button
            className="ml-10 bg-[#ff3e02] text-white px-2 rounded-md"
            onClick={(e) => handleClearFilter(e)}
          >
            Limpiar
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Filters;
