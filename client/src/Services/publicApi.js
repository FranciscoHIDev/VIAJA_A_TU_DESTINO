import axios from "axios";

const apiOrigin = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const publicApi = axios.create({
  baseURL: `${apiOrigin}/api`,
  timeout: 15000,
});

export default publicApi;