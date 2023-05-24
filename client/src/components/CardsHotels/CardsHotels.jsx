import React, { useState, useEffect } from "react";
import axios from "axios";
import CardHotel from "../CardHotel/CardHotel";
import Loading from "../Loading/Loading";

function CardsHotels() {
  const [hotels, setHotels] = useState([]);

  const allHotels = async () => {
    const { data } = await axios.get("/api/hotels");
    console.log(data);
    setHotels(data);
  };
  useEffect(() => {
    allHotels();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center">
      {hotels ? (
        hotels.map((e) => {
          return (
            <CardHotel
              key={crypto.randomUUID()}
              name={e.name}
              image={e.image}
              persons={e.persons}
              discount={e.discount}
              price={e.price}
              previousPrice={e.previousPrice}
              destination={e.destination}
              from={e.from}
              to={e.to}
              link={e.link}
            />
          );
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default CardsHotels;
