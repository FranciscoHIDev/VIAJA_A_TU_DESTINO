import React, { useContext } from "react";
import CardPackage from "../CardPackage/CardPackage";
import Loading from "../Loading/Loading";
import { ContextGlobal } from "../../ContextGlobal/ContextGlobal";

function CardsPackages() {
  const { pack } = useContext(ContextGlobal);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {pack ? (
        pack.map((e) => {
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
        })
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default CardsPackages;
