import axios from "axios";

const apiOrigin = import.meta.env.VITE_API_URL.replace(/\/$/, "");

const api = axios.create({
  baseURL: `${apiOrigin}/api`,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;