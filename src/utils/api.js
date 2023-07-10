import axios from "axios";

const api = axios.create({
  baseURL: "https://payment-initiation-server-960f7bd93f9a.herokuapp.com",
});

export default api;
