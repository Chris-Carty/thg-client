import axios from "axios";

const api = axios.create({
  baseURL: "https://piggy-bank-server.herokuapp.com",
});

export default api;
