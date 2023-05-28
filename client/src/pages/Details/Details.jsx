import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Details() {
  const { id } = useParams();
  const [offer, setOffer] = useState([]);

  const getOffersById = async (_id) => {
    const { data } = await axios.get(`/api/offers/${_id}`);
    console.log(data);
    setOffer(data);
  };

  useEffect(() => {
    getOffersById(id);
  }, [id]);

  return (
    <React.Fragment>
      <div className="min-h-screen flex flex-col">
        <header>
          <NavBar />
        </header>
        <main className="flex-grow border-solid border-t-[#53b3cb] border-4 mt-[128px]">
          <div className="flex felx-col mb-20">
            {offer.length !== 0 ? (
              <div className="flex flex-col mx-2 ">
                <div className="w-[600px] flex">
                  <img className="mr-4" src={offer.image[0]} alt="image" />
                  <img src={offer.image[1]} alt="image" />
                </div>
                <div className="mt-8  mx-4  grid grid-rows-1 gap-4">
                  <div className="">
                    <button className="bg-[#53b3cb] px-4  py-1 rounded-md text-white font-medium">
                      🔥{offer.promotion}
                    </button>
                    <h1 className="mt-3 text-3xl font-bold">{offer.title}</h1>
                    <p className="mt-2 text-[20px]">{offer.summary}</p>
                    <p className="mt-5 text-[17px]">
                      Creado el {offer.date} by {offer.author}
                    </p>
                    <p className="mt-2 text-2xl font-bold">Descripción</p>
                    <p className="text-[18px]">{offer.description}</p>
                  </div>
                  <div className="">
                    <div className="w-[400px] h-[500px] border-black border">
                      <h1>Hola</h1>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Loading />
            )}
          </div>
        </main>
        <footer className="mt-auto">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Details;
