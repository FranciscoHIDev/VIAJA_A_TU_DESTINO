import React, { useState, useEffect } from "react";
import axios from "axios";
import CardOffers from "./../CardOffers/CardOffers";
import Loading from './../Loading/Loading'

function CardsOffers() {
  const [offers, setOffers] = useState([]);

  const allOffers = async () => {
    const { data } = await axios.get("/api/offers");
    console.log(data);
    setOffers(data);
  };
  useEffect(() => {
    allOffers();
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-center">
      {offers? offers.map((e) => {
        return (
          <CardOffers
            key={crypto.randomUUID()}
            title={e.title}
            image={e.image}
            category={e.category}
            summary={e.summary}
            promotion={e.promotion}
            price={e.price}
            availability={e.availability}
            departure={e.departure}
            arrival={e.arrival}
            destination={e.destination}
            author={e.author}
            date={e.date}
          />
        );
      }):(<Loading/>)}
    </div>
  );
}

export default CardsOffers;
