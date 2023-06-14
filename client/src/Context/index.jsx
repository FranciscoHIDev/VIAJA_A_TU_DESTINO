import { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [offer, setOffer] = useState([]);

  return <Context.Provider>{children}</Context.Provider>;
};
