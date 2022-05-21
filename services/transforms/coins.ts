import { AxiosResponse } from "axios";

// TODO: esto lo divido en mas interfaces??
interface CoinGeckoData {
  name: string;
  symbol: string;
  image: {
    small: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
  };
}

export interface Coin {
  name: string;
  symbol: string;
  iconUrl: string;
  usdPrice: number;
}

// TODO: averiguar que va en este any
export const coinApiToCoinApp: (
  response: AxiosResponse<CoinGeckoData, any>[]
) => Coin[] = (response) =>
  response.map(({ data: { name, symbol, image, market_data } }) => ({
    name,
    symbol,
    iconUrl: image.small,
    usdPrice: market_data.current_price.usd,
  }));
