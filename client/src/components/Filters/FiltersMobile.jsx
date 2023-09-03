import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../redux/actions/actions";

function FiltersMobile() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const categorys = offers.filter((offer) => offer.category);
  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);
  return (
    <React.Fragment>
      <div className="flex flex-row md:hidden justify-around">
        <div>
          <select className="rounded-md  border-2 border-[#53b3cb]">
            <option value={""}>Categorías</option>
            <option>Paquetes</option>
            <option>Hoteles</option>
            <option>Vuelos</option>
            <option>Tours</option>
          </select>
        </div>
        <div>
          <select className="rounded-md  border-2 border-[#53b3cb]">
            <option value={""}>Saliendo desde</option>
          </select>
        </div>
        <div>
          <select className="rounded-md  border-2 border-[#53b3cb]">
            <option value={""}>Destino</option>
          </select>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FiltersMobile;
