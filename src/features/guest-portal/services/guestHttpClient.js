import axios from "axios";
import { getGuestToken } from "./guestAuthStorage";

const guestHttpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

guestHttpClient.interceptors.request.use((config) => {
  const token = getGuestToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default guestHttpClient;