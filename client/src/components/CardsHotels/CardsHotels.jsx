import React from "react";
import CardHotel from "../CardHotel/CardHotel";
import {useSelector, useDispatch} from "react-redux"
import { getAllHotels } from '../../redux/actions/actions';


function CardsHotels() {
const hotels= useSelector((state)=>state.hotels)
const dispatch= useDispatch()

React.useEffect(()=>{
dispatch(getAllHotels)
},[dispatch])

  return (
    <div className="flex flex-wrap items-center justify-center">
      {hotels.map((e) => {
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
