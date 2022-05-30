import { render } from "@testing-library/react";
import TableCoins from "@/components/TableCoins";

const mockCoins = [
  {
    name: "Bitcoin",
    symbol: "btc",
    iconUrl:
      "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
    usdPrice: 31872,
  },
  {
    name: "USD Coin",
    symbol: "usdc",
    iconUrl:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
    usdPrice: 1,
  },
];

describe("Table Coins", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<TableCoins coins={mockCoins} />);
    expect(asFragment).toMatchSnapshot();
  });
});
