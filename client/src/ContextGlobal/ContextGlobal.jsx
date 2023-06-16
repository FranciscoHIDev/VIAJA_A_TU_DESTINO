import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ContextGlobal = createContext();

export const ContextProvider = ({ children }) => {
  const [offer, setOffer] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const allOffers = async () => {
      const { data } = await axios.get("/api/offers");
      setOffer(data);
    };

    const allBanners = async () => {
      const { data } = await axios.get("/api/banners");
      setBanner(data);
    };
    allOffers();
    allBanners();
  }, []);

  return (
    <ContextGlobal.Provider value={{ offer, banner }}>
      {children}
    </ContextGlobal.Provider>
  );
};
