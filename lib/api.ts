import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import { getIdToken } from "firebase/auth";

import { env } from "@/constants/env";
import { auth } from "@/services/firebase";

type ApiClient = Omit<AxiosInstance, "get" | "post" | "put" | "patch" | "delete"> & {
  get<T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  delete<T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T>;
  post<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  put<T = unknown, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>;
  patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<T>;
};

// Custom Axios instance with common configurations
const api = axios.create({
  baseURL: env.backendUrl,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
}) as ApiClient;

// Request interceptor to add authentication token
api.interceptors.request.use(
  async (config) => {
    config.headers = config.headers || {};

    const idToken = auth.currentUser ? await getIdToken(auth.currentUser) : null;

    if (idToken && !config.headers.Authorization) {
      const authToken = `Bearer ${idToken}`;
      config.headers.Authorization = authToken;
    }

    return config;
  },
  (error: AxiosError) => {
    console.error("[API Request error]", error);

    return Promise.reject(error);
  },
);

// Response interceptor to standardize response format
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.error("[API Response error]", error?.response?.data);

    return Promise.reject(error?.response?.data);
  },
);

export { api };
export type { ApiClient };
