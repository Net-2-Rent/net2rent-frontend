import axios from "axios";
import { getGuestToken, clearGuestSession } from "./guestAuthStorage";

const guestHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

guestHttpClient.interceptors.request.use((config) => {
  const token = getGuestToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

guestHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearGuestSession();
      if (window.location.pathname !== "/") {
        window.location.assign("/");
      }
    }
    return Promise.reject(error);
  }
);

export default guestHttpClient;