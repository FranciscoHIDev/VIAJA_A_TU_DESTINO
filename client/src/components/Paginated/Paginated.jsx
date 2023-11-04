import React from "react";
import PropTypes from "prop-types";

function Paginated({ offers, offerPerPage, paginate, page, setPage, maxPage }) {
  const pageNumbers = [];
  const numberPages = Math.ceil(offers / offerPerPage);

  for (let i = 0; i < numberPages; i++) {
    pageNumbers.push(i + 1);
  }
  function Prev() {
    setPage(page - 1);
  }

  function Next() {
    setPage(page + 1);
  }
  return (
    <React.Fragment>
      <nav className="flex justify-center mb-[50px]">
        <button
          className=" m-1 text-xl px-2"
          disabled={page === 1}
          onClick={Prev}
        >
          {`«`}
        </button>
        {pageNumbers?.map((num) => (
          <button
            className={`m-1 text-xl px-2 rounded-md ${
              page === num
                ? "bg-[#ff3e02] text-white"
                : "bg-[#53b3cb] text-white"
            }`}
            key={crypto.randomUUID()}
            onClick={(e) => paginate(e, num)}
          >
            {num}
          </button>
        ))}
        <button
          className=" m-1 text-xl px-2"
          disabled={page === maxPage}
          onClick={Next}
        >{`»`}</button>
      </nav>
    </React.Fragment>
  );
}
Paginated.propTypes = {
  offers: PropTypes.number.isRequired,
  offerPerPage: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  maxPage: PropTypes.number.isRequired,
};
export default Paginated;
