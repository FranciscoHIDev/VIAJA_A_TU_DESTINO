import React, { useContext } from "react";

import CardHotel from "../CardHotel/CardHotel";
import { ContextGlobal } from "../../ContextGlobal/ContextGlobal";

function CardsHotels() {
  const { hotel } = useContext(ContextGlobal);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {hotel.map((e) => {
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
      })}
    </div>
  );
}

export default CardsHotels;
