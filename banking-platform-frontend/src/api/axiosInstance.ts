// src/api/axiosInstance.ts
import axios from "axios";
import BASE_API_URL from "../config/apiConfig";

// Create base Axios instance
const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Custom GET method
export const apiGet = (url: string, config = {}) => {
  return api.request({
    method: "GET",
    url,
    // ...config,
  });
};

// Custom POST method
export const apiPost = (url: string, data: any, config = {}) => {
  return api.request({
    method: "POST",
    url,
    data,
    // ...config,
  });
};

export default api;
