import axios from "axios";

export interface ApiResponse<T> {
  data: T;
  status: number;
}

const baseUrl = "http://localhost:8080/api"

const api = axios.create({
  timeout: 60000,
  baseURL: baseUrl,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
