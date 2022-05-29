import axios, { AxiosRequestConfig } from "axios";

let baseUrl = "http://localhost:3000";

axios.defaults.baseURL = baseUrl;

const fetchData = async (params: AxiosRequestConfig) => {
  return await axios.request(params);
};

export default fetchData;
