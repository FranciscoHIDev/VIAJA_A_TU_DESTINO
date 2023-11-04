import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getAllOffers } from "../../redux/actions/actions";

function FiltersMobile() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const departures = offers.map((o) => o.departure);

  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  function handleCategory(e) {
    e.preventDefault(e);
    dispatch(filterByCategory(e.target.value));
  }

  return (
    <React.Fragment>
      <div className="flex flex-row  items-center justify-between md:hidden">       
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
        <div >
          <select className="rounded-xl  border-2 border-[#53b3cb] p-1">
            <option value={""}>Saliendo desde</option>
            {departures.filter((d) => (
              <option key="d">{d}</option>
            ))}
          </select>
        </div>
        <div>
          <select className="rounded-xl  border-2 border-[#53b3cb] p-1">
            <option value={""}>Destinos</option>
            {[
              ...new Set(
                offers.map((offer) => offer.destination.name.toLowerCase())
              ),
            ].map((destination, index) => (
              <option key={index}>{destination}</option>
            ))}
          </select>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FiltersMobile;
