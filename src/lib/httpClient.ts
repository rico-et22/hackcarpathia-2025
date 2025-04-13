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

    if (error.response?.status === 422) {
      const validationMessage = error.response?.data.message || "Nieprawidłowe dane logowania";
      // You can throw an error or log the message for display in the UI
      throw new Error(validationMessage);
    }
    
    return error;
  }
);

export default httpClient;
