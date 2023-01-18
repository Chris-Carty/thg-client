import axios from "axios";

const api = axios.create({
  baseURL: "https://rvnu-api.com",
});

export default api;
