import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
const authFetch = axios.create({
  baseURL: apiUrl,
});

export default authFetch;
