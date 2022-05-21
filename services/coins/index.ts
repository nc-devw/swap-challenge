import axios from "axios";
import { coinApiToCoinApp } from "../transforms/coins";

const apiClient = axios.create({
  baseURL: "http://api.coingecko.com/api/v3/coins",
  timeout: 3000,
});

export const getAllCoins = async () => {
  const results = await Promise.all([
    apiClient.get("/bitcoin"),
    apiClient.get("/ethereum"),
    apiClient.get("/dai"),
    apiClient.get("/tether"),
  ]);

  return coinApiToCoinApp(results);
};
