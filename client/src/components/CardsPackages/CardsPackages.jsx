import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPackage from "../CardPackage/CardPackage";

function CardsPackages() {
  const [packages, setPackages] = useState([]);

  const allPackages = async () => {
    const { data } = await axios.get("/api/packages");
    console.log(data);
    setPackages(data);
  };
  useEffect(() => {
    allPackages();
  }, []);
  return (
    <div className="container">
      {packages.map((e) => {
        return (
          <CardPackage
            key={crypto.randomUUID()}
            departure={e.departure}
            destination={e.destination}
            image={e.image}
            hotel={e.hotel}
            promotion={e.promotion}
            price={e.price}
            previousPrice={e.previousPrice}
            persons={e.persons}
            from={e.from}
            to={e.to}
            link={e.link}
          />
        );
      })}
    </div>
  );
}

export default CardsPackages;
