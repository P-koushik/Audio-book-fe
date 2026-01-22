import axios, { AxiosError, AxiosInstance } from "axios";
import { getIdToken } from "firebase/auth";

import { env } from "@/constants/env";
import { auth } from "@/services/firebase";

// Custom Axios instance with common configurations
const api: AxiosInstance = axios.create({
  baseURL: env.backendUrl,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

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
