import React from "react";
import axios from "axios";
import {
  FaRegCalendarAlt,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaMapMarkedAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { MdFavorite } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/actions";

function CardsFavorites({
  _id,
  title,
  summary,
  promotion,
  category,
  image,
  price,
  destination,
  availability,
  hotel,
  departure,
  arrival,
  author,
  date,
}) {
  const dispatch = useDispatch();
  const { user } = useAuth0();

  const usersDB = useSelector((state) => state.users);
  const userDB = usersDB.find((e) => e.email === user.email);
  console.log(userDB);

  const onClick = async () => {
    try {
      const favorite = {
        favorite: _id,
        email: userDB.email,
      };
      await axios.post("/api/users/favorite", favorite);
      dispatch(getAllUsers);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Favorito eliminado",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error, "error error");
    }
  };

  return (
    <React.Fragment>
      <div
        className="flex flex-row  mt-[30px] rounded-[20px] bg-[#fff] w-[900px] h-[300px] m-[12px] border
        "
      >
        <div className="flex w-[360px] h-[300px] ">
          <div className="flex items-start">
            <span onClick={onClick} className=" cursor-pointer">
              <MdFavorite className="cursor-pointer bg-white absolute rounded-md text-[30px] ml-72 mt-[28px] text-black opacity-[80%] p-[2px]" />
            </span>
            <p className="absolute mt-[20px] rounded-tr-[8px] rounded-br-[8px] px-5 py-1 text-[20px] font-[500] bg-[hsla(0,0%,100%,.8)] text-[#323231]">
              {promotion}
            </p>
            <img
              className="w-[360px] h-[300px] rounded-tl-[20px] rounded-bl-[20px] "
              src={image[0]}
              alt="image"
            />
          </div>
        </div>
        <div className="flex flex-col mt-2 mx-5">
          <div className="flex flex-col ">
            <h1 className="text-[22px] text-[#035373]  font-[600] uppercase">
              {title}
            </h1>
            <div className="flex flex-row items-center">
              <img
                className="w-[20px] mr-[10px]"
                src={category.image}
                alt={category.name}
              />
              <p className="text-[20px] text-[#323231]">{category.name}</p>
            </div>
            <div>
              <p className="mb-1 font-light text-[20px]">{summary}</p>
            </div>
            <div className="flex flex-row items-center">
              <FaRegCalendarAlt className="text-[#ff3e02] text-[20px]" />
              <p className="ml-[10px] text-[#323231] font-[400] text-[20px]">
                Disponibilidad:{" "}
                <span className=" font-[600] text-[#323231] text-[20px]">
                  {availability}
                </span>
              </p>
            </div>
            {departure ? (
              <div className="flex flex-row items-center">
                <FaPlaneDeparture className="text-[#ff3e02] text-[20px]" />
                <p className="ml-[10px] text-[#323231] font-[400] text-[20px]">
                  Salida:{" "}
                  <span className="text-[20px] font-[600] text-[#323231]">
                    {departure}
                  </span>
                </p>
              </div>
            ) : null}
          </div>

          <div>
            {arrival ? (
              <div className="flex flex-row items-center">
                <FaPlaneArrival className="text-[#ff3e02] text-[20px]" />
                <p className="ml-[10px] text-[#323231] font-[400] text-[20px]">
                  Llegada:{" "}
                  <span className="text-[20px] font-[600] text-[#323231]">
                    {arrival}
                  </span>
                </p>
              </div>
            ) : null}
            {/* {category.name === "Hotel" || category.name === "Tour" ? (
              <div className="flex flex-row items-center ">
                <FaMapMarkedAlt className="text-[#ff3e02] mr-[5px] text-[20px]" />
                <p className=" text-[#323231] font-[400] text-[20px] ">
                  Destino:{" "}
                  <span className="text-[20px] font-[600] text-[#323231]">
                    {destination.name}
                  </span>
                </p>
              </div>
            ) : null} */}
          </div>
          <div className="flex flex-row mt-2 items-center ">
            <div className="mr-10">
              <p className="text-[25px]">
                Desde
                <span className="text-[#ff3e02] font-bold text-[25px]">
                  {" "}
                  ${price}{" "}
                </span>
              </p>
            </div>
            <div>
              <NavLink to={`/oferta/${_id}`}>
                <button className="text-[20px] rounded-md border border-[#242424] bg-[#ff] py-1 px-1   hover:bg-[#ff3e02] hover:text-[#fff] hover:border-[#ff3e02]">
                  Ver oferta
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CardsFavorites;
