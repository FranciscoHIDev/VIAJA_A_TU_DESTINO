import React, { useState } from "react";
import CardOffers from "../CardOffers/CardOffers";
import { getAllOffers } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import Paginated from "../Paginated/Paginated";

function CardsOffers() {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const all = offers.reverse();

  React.useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const [offerPerPage] = useState(6);
  const lastOffer = page * offerPerPage;

  const firstOffer = lastOffer - offerPerPage;
  const totalOffers = all.slice(firstOffer, lastOffer);

  const maxPage = Math.ceil(offers.length / offerPerPage);

  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-center">
        {totalOffers.map((e) => {
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

      <Paginated
        offerPerPage={offerPerPage}
        offers={offers.length}
        paginate={paginate}
        setPage={setPage}
        page={page}
        maxPage={maxPage}
      />
    </React.Fragment>
  );
}

export default CardsOffers;
