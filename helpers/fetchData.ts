import axios, { AxiosRequestConfig } from "axios";

let baseUrl = "http://localhost:3000";

const fetchData = async (params: AxiosRequestConfig) => {
  if (process.env.VERCEL_URL) {
    baseUrl = "https://" + process.env.VERCEL_URL;
  }

  axios.defaults.baseURL = baseUrl;

  return await axios.request(params);
};

export default fetchData;
