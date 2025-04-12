import { LoginRequest } from "@/types/formRequest";
import axios from "axios";

export const login = (data: LoginRequest) =>
  axios
    .post<
      LoginRequest,
      any
    >(`${import.meta.env.VITE_API_URL}/auth/login`, { ...data })
    .then((res) => ({
      token: res.data.data.token,
    }));
