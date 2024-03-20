import axios from "axios";

const DEBUG: boolean = JSON.parse(import.meta.env.VITE_DEBUG);

const baseURL = DEBUG
  ? import.meta.env.VITE_LOCAL_URL
  : import.meta.env.VITE_PRODUCTION_URL;

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000, // Tiempo de espera de 5 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
