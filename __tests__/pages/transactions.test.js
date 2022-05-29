import { render } from "@testing-library/react";
import Transactions from "@/pages/transactions";

let transactions = [];

jest.mock("@/context/global", () => ({
  useAppContext: () => ({
    transactions,
  }),
}));

describe("Transaction", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Transactions />);
    expect(asFragment).toMatchSnapshot();
  });
});
