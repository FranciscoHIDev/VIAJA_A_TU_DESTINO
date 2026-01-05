import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOffers } from "../../redux/actions/actions";
import CardTop from "../CardTop/CardTop";
import Paginated from "../Paginated/Paginated";

function CardsOferts() {
  const dispatch = useDispatch();
  const allOffers = useSelector((state) => state.topOffers);
  const all = allOffers.slice().reverse();
  useEffect(() => {
    dispatch(getAllOffers);
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const [offerPerPage] = useState(3);
  const lastOffer = page * offerPerPage;

  const firstOffer = lastOffer - offerPerPage;
  const totalOffers = all.slice(firstOffer, lastOffer);

  const maxPage = Math.ceil(allOffers.length / offerPerPage);

  function paginate(e, num) {
    e.preventDefault();
    setPage(num);
  }

  return (
    <React.Fragment>
      <div className="flex flex-wrap justify-center">
        {totalOffers.map((e) => {
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

      <Paginated
        offerPerPage={offerPerPage}
        offers={allOffers.length}
        paginate={paginate}
        setPage={setPage}
        page={page}
        maxPage={maxPage}
      />
    </React.Fragment>
  );
}

export default CardsOferts;
