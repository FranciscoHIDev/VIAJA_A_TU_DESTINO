import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { Auth0Provider } from "@auth0/auth0-react";

//axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider>
    </StrictMode>
  </Provider>
);
