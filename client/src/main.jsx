import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
//axios.defaults.baseURL = "https://viaja-a-tu-destino.vercel.app/";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
