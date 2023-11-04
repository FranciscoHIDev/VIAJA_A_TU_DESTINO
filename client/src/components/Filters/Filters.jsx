import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getAllOffers } from "../../redux/actions/actions";

function Filters() {
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
    <div className="md:flex flex-row justify-center items-center hidden">
      <div className="mr-10 hidden md:block"><p className="text-[#ff3e02] font-bold">Filtrar por:</p></div>
      <div className="mr-10">
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
      <div className="mr-10">
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

export default Filters;
