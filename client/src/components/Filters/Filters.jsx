import React from "react";
import { MdLocationOn, MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, getAllOffers } from "../../redux/actions/actions";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
            {/* <div className="flex justify-between hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Paquete"
                  value="Paquete"
                  onClick={handleCategory}
                />
                Paquete
              </label>
            </div>
            <div className="flex justify-between hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Hotel"
                  value="Hotel"
                  onClick={handleCategory}
                />
                Hotel
              </label>
            </div>
            <div className="flex hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Vuelo"
                  value="Vuelo"
                  onClick={handleCategory}
                />
                Vuelo
              </label>
            </div>
            <div className="flex justify-between hover:bg-[#53b3cb] cursor-pointer">
              <label className="cursor-pointer">
                <input
                  className="cursor-pointer mr-3"
                  type="checkbox"
                  name="Tour"
                  value="Tour"
                  onClick={handleCategory}
                />
                Tour
              </label>
            </div> */}
            <FormGroup onChange={handleCategory}>
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Paquete"
                value={"Paquete"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Hotel"
                value={"Hotel"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Vuelo"
                value={"Vuelo"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Tour"
                value={"Tour"}
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Filters;
