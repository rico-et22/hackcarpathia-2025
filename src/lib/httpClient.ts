import axios from "axios";
import { ACCESS_TOKEN_ITEM } from "./constants";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  if (localStorage.getItem(ACCESS_TOKEN_ITEM)) {
    config.headers["Authorization"] =
      "Bearer " + localStorage.getItem(ACCESS_TOKEN_ITEM);
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_ITEM);
      window.location.href = "/login";
    }
    return error;
  }
);

export default httpClient;
