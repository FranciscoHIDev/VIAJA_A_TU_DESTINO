import React from "react";

import CardsFavorites from "../../components/CardsFavorites/CardsFavorites";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
function Favorites() {
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow mt-12 mb-20">
          <CardsFavorites />
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Favorites;
