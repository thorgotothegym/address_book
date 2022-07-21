import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  return config;
});

export default api;
