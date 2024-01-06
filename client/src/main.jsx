import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { Auth0Provider } from "@auth0/auth0-react";

//axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.baseURL = "https://api.viajaatudestino.com/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-diy5j51e8e7m2tec.us.auth0.com"
      clientId="f8Jjj4658bzQcB9JczyCXILdXgqtNzXV"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </Provider>
);
