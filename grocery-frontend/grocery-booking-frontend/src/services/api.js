// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(
        "JWT token attached to request:",
        token.substring(0, 15) + "...(truncated)"
      );
    } else {
      console.warn("No JWT token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
