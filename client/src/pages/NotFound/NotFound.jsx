import React from "react";
import NavBar from "./../../components/NavBar/NavBar";
import Footer from "./../../components/Footer/Footer";

function NotFound() {
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <header>
        <NavBar />
      </header>
      <main className="flex-grow">
        <div className="flex flex-col items-center my-20">
          <h1 className="text-5xl mb-5">ERROR 404</h1>
          <p className="text-2xl">Lo sentimos esta página no existe</p>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default NotFound;
