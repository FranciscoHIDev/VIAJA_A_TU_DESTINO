import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../redux/actions/actions";

function FiltersMobile() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const departures = offers.map((o) => o.departure);
  console.log(departures);
  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="flex flex-row md:hidden justify-around">
        <div>
          <select className="rounded-xl  border-2 border-[#53b3cb] p-1">
            <option value={""}>Categorías</option>

            <option>Paquetes</option>
            <option>Hoteles</option>
            <option>Vuelos</option>
            <option>Tours</option>
          </select>
        </div>
        <div>
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
