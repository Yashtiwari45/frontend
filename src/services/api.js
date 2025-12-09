import axios from "axios";
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://backend-inky-beta.vercel.app/";

export const fetchSales = async (params) => {
  const res = await axios.get(`${API_BASE}/api/sales`, { params });
  return res.data;
};