export const coinApiToCoinApp = (({ name, symbol, image, market_data }: any) => ({
    name,
    symbol,
    iconUrl: image.small,
    usdPrice: market_data.current_price.usd,
  }))