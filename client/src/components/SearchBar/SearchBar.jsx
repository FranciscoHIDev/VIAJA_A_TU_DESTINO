import React from "react";

function SearchBar() {
  return (
    <React.Fragment>
      <div className="flex flex-row">
        <input
          className="p-2 rounded-s-md"
          type="text"
          name="search "
          placeholder="¿Dónde te gustaria viajar?"
        />
        <button className="bg-[#53b3cb] p-2 rounded-r-md text-white font-bold">
          Buscar
        </button>
      </div>
    </React.Fragment>
  );
}

export default SearchBar;
