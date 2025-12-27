import axios from "axios";

const api = axios.create({
  baseURL: "https://ngo-cms-internship-production.up.railway.app",
});

export default api;
