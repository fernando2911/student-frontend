import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE } from "../config/globals";

const api = axios.create({
  timeout: 60000,
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken && typeof decodedToken.exp === "number") {
      const isTokenExpired = (decodedToken.exp * 1000) < Date.now();

      if (!isTokenExpired) {
        config.headers['Authorization'] = 'Bearer ' + token;
      } else {
        sessionStorage.removeItem('token');
        window.location.href = '/login'; 
      }
    } else {
      sessionStorage.removeItem('token');
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
