import React, { useState, useEffect } from "react";
import axios from "axios";
import CardHotels from "../CardHotels/CardHotels";

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
    <div className="container">
      {hotels.map((e) => {
        return (
          <CardHotels
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
      })}
    </div>
  );
}

export default CardsHotels;
