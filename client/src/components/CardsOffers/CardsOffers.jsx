import React, { useContext } from "react";
import CardOffers from "./../CardOffers/CardOffers";
import { ContextGlobal } from "../../ContextGlobal/ContextGlobal";

function CardsOffers() {
  const { offer } = useContext(ContextGlobal);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {offer.map((e) => {
        return (
          <CardOffers
            key={crypto.randomUUID()}
            _id={e._id}
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
