import axios from "axios";

const { VITE_SERVER_URL } = import.meta.env;

const api = axios.create({ baseURL: VITE_SERVER_URL });

api.interceptors.request.use((config) => {
  if (localStorage.getItem("AUTH_TOKEN")) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "AUTH_TOKEN"
    )}`;
  }

  return config;
});

export default api;
