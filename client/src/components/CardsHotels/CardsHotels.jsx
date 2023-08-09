import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllOffers } from "../../redux/actions/actions";
import CardOffers from "../CardOffers/CardOffers";

function CardsHotels() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const hotels = offers.filter((offer) => offer.category.name === "Hotel");
  const all = hotels.reverse();

  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {all.map((e) => {
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

export default CardsHotels;
