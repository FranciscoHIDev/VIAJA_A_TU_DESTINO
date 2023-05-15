import React, { useState, useEffect } from "react";
import axios from "axios";
import CardOffers from "./../CardOffers/CardOffers";
import "./CardsOffers.css";

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
    <div className="container">
      {offers.map((e) => {
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
      })}
    </div>
  );
}

export default CardsOffers;
