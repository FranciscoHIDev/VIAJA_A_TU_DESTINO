import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [offer, setOffer] = useState([]);
  const [banner, setBanner] = useState([]);
  const [hotel, setHotel] = useState([]);
  const [pack, setPack] = useState([]);

  useEffect(() => {
    const allOffers = async () => {
      const { data } = await axios.get("/api/offers");
      setOffer(data);
    };

    const allBanners = async () => {
      const { data } = await axios.get("/api/banners");
      setBanner(data);
    };

    const allHotels = async () => {
      const { data } = await axios.get("/api/hotels");
      setHotel(data);
    };

    const allPackages = async () => {
      const { data } = await axios.get("/api/packages");
      setPack(data);
    };
    allOffers();
    allBanners();
    allHotels();
    allPackages();
  }, []);

  return (
    <ContextGlobal.Provider value={{ offer, banner, hotel, pack }}>
      {children}
    </ContextGlobal.Provider>
  );
};
