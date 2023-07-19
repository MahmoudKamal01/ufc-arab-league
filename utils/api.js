// api.js
import axios from "axios";
import Cookies from "js-cookie";

// const apiUrl = "http://localhost:4000";
const apiUrl = "https://ufc-arab-league.onrender.com";

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
