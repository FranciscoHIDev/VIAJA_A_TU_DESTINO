import React from "react";
import CardOffers from "./../CardOffers/CardOffers";
import { getAllOffers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";

function CardsOffers() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);  
  
  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  return (
    <div className="flex flex-wrap items-center justify-center">
      {offers.map((e) => {
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
