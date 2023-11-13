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
  return (
    <React.Fragment>
      <div className="flex flex-row  items-center justify-between md:hidden px-2">
        <div>
          <select
            className="rounded-xl  border-2 border-[#53b3cb] p-1"
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
            className="rounded-xl  border-2 border-[#53b3cb] p-1"
            onChange={handleDeparture}
          >
            <option value={""}>Saliendo desde</option>
            {[...new Set(offers.map((offer) => offer.departure))].map(
              (d, index) => (
                <option key={index}>{d}</option>
              )
            )}
          </select>
        </div>
        <div>
          <select
            className="rounded-xl  border-2 border-[#53b3cb] p-1"
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
      </div>
    </React.Fragment>
  );
}

export default FiltersMobile;
