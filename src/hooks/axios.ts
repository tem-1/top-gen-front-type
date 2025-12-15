import axios from "axios";
import { utga } from "./img";

// http://localhost:9090/

const axiosInstance = axios.create({
  baseURL:
    utga === true
      ? "https://topgenius.tanusoft.mn/api/v1"
      : "http://localhost:9090/api/v1", // Set your API base URL here
  // baseURL: "http://localhost:5000",
  // timeout: 5000 // Set a timeout for requests (in milliseconds)
});

// Add an interceptor to include the Bearer token in the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from wherever you store it (e.g., localStorage)
    const token: any = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set Content-Type to application/json

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
