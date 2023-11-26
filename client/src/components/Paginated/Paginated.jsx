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
      <nav className="flex justify-center my-[20px]">
        <button
          className=" m-1 text-xl px-2"
          hidden={page === 1}
          onClick={Prev}
        >
          {`«`}
        </button>
        {pageNumbers?.map((num) => (
          <button
            className={` text-xl px-2 border ${
              page === num
                ? "bg-[#f9f9f9] text-[#ff3e02]"
                : "bg-[#fff] text-black hover:bg-slate-200"
            }`}
            key={crypto.randomUUID()}
            onClick={(e) => paginate(e, num)}
          >
            {num}
          </button>
        ))}
        <button
          className=" m-1 text-xl px-2 hover:text-[#ff3e02]"
          hidden={page === maxPage}
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
