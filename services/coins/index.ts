import axios from 'axios'
import { coinApiToCoinApp } from '../transforms/coins'

const apiClient = axios.create({
  baseURL: 'http://api.coingecko.com/api/v3/coins',
  timeout: 3000
})


export const getAllCoins = async () => {
  const uri = '/bitcoin'
  const result = await apiClient.get(uri)
  return coinApiToCoinApp(result.data)
}
