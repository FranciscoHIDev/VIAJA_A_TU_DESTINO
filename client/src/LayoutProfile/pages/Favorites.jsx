import React from "react";
import CardsFavorites from "../../components/CardsFavorites/CardsFavorites";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
function Favorites() {
  const crumbs = [
    { label: "Inicio", path: "/" },
    { label: "Mi perfil", path: "/mi-perfil" },
    { label: "Favoritos", path: "/favoritos" },
  ];
  return (
    <React.Fragment>
      <div className="min-h-screen h-screen flex flex-col">
        <NavBar />
        <div className="ml-20 mt-5">
          <Breadcrumb crumbs={crumbs} />
        </div>

        <main className="flex-grow mt-12 mb-20">
          <CardsFavorites />
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Favorites;
