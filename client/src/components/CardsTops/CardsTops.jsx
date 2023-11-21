import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../redux/actions/actions";
import CardTop from "../CardTop/CardTop";

function CardsTops() {
  const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.topOffers);
  const offersTop = allOffers.slice(-3);
  useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-center">
        {offersTop.map((e) => {
          return (
            <CardTop
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
    </React.Fragment>
  );
}

export default CardsTops;
