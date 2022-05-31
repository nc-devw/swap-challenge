import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TableSwap from "@/components/TableSwap";

const mockCoins = [
  {
    name: "Bitcoin",
    symbol: "btc",
    iconUrl:
      "https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579",
    usdPrice: 31661,
  },
  {
    name: "Ethereum",
    symbol: "eth",
    iconUrl:
      "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    usdPrice: 1994.29,
  },
  {
    name: "USD Coin",
    symbol: "usdc",
    iconUrl:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389",
    usdPrice: 1,
  },
];

jest.mock("@/context/global", () => ({
  useAppContext: () => ({
    assets: [
      {
        symbol: "btc",
        quantity: 0.002,
      },
      {
        symbol: "usdc",
        quantity: 100,
      },
    ],
  }),
}));

describe("Table Swap", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<TableSwap coins={mockCoins} />);
    expect(asFragment()).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });
});
