import httpClient from "@/lib/httpClient";
import {
  LoginRequest,
  RegisterRequest,
  StorePlantRequest,
} from "@/types/formRequest";
import { Plant } from "@/types/responses";

export const login = (data: LoginRequest) =>
  httpClient
    .post<
      LoginRequest,
      any
    >(`${import.meta.env.VITE_API_URL}/auth/login`, { ...data })
    .then((res) => ({
      token: res.data.data.token,
    }));

export const register = (data: RegisterRequest) =>
  httpClient
    .post<
      RegisterRequest,
      any
    >(`${import.meta.env.VITE_API_URL}/auth/register`, { ...data })
    .then((res) => ({
      token: res.data.data.token,
    }));

export const logout = () =>
  httpClient.post<LoginRequest, any>(
    `${import.meta.env.VITE_API_URL}/auth/logout`
  );

export const getUserInfo = () =>
  httpClient
    .get<void, any>(`${import.meta.env.VITE_API_URL}/user`)
    .then((res) => ({
      name: res.data.name,
      id: res.data.id,
    }));

export const getUserPlants = (userId: string) =>
  httpClient
    .get<void, any>(`${import.meta.env.VITE_API_URL}/users/${userId}/plants`)
    .then((res) => res.data.data as Plant[]);

export const storePlant = (userId: string, data: StorePlantRequest) => {
  const formData = new FormData();
  
  // Convert data to FormData
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value instanceof File ? value : value.toString());
    }
  });
  
  return httpClient.post<FormData, any>(
    `${import.meta.env.VITE_API_URL}/users/${userId}/plants`,
    formData
  );
};
