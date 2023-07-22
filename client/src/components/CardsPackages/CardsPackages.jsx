import React from "react";
import CardPackage from "../CardPackage/CardPackage";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPackages } from "../../redux/actions/actions";


function CardsPackages() {
const dispatch= useDispatch()
const packages = useSelector((state)=> state.packages)

React.useEffect(()=>{
dispatch(getAllPackages)
},[dispatch])


  return (
    <div className="flex flex-wrap items-center justify-center">
      {packages? (
       packages.map((e) => {
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
