// src/services/auth.js
import API from "./api";

export const login = async (username, password) => {
  const response = await API.post("/auth/login", { username, password });
  // Backend may return plain string token or { token: "..." }, handle both:
  const token = response.data?.token ?? response.data;
  if (!token) throw new Error("No token received from server");
  localStorage.setItem("token", token);
  return token;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = () => !!localStorage.getItem("token");
export const getToken = () => localStorage.getItem("token");
