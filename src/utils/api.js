import axios from "axios";

const api = axios.create({
  baseURL: "https://rvnuapi.app",
});

export default api;
