import React from "react";
import { MdLocationOn, MdLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByDeparture,
  getAllOffers,
} from "../../redux/actions/actions";
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

  function handleDeparture(e) {
    e.preventDefault(e);
    dispatch(filterByDeparture(e.target.value));
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
            <FormGroup onChange={handleDeparture}>
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Ciudad de México"
                value={"Ciudad de México"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Monterrey"
                value={"Monterrey"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="  Guadalajara"
                value={"Guadalajara"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Cancún"
                value={"Cancún"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label=" Veracruz"
                value={"Veracruz"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="Ciudad Juárez"
                value={"Ciudad Juárez"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label=" Santa Lucia"
                value={"Santa Lucia"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label=" Tijuana"
                value={"Tijuana"}
              />
              <FormControlLabel
                className=" hover:bg-[#53b3cb] "
                control={<Checkbox />}
                label="  León / Bajío"
                value={"Leon"}
              />
            </FormGroup>
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
