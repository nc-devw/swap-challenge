import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ConfirmationCard from "@/components/ConfirmationCard";

let transaction = {
  input: { iconUrl: "http://test" },
  output: { iconUrl: "http://test" },
};
const mockPush = jest.fn();
const mockCancelTransaction = jest.fn();
const mockSwapAssets = jest.fn();
const mockAddTransaction = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/context/global", () => ({
  useAppContext: () => ({
    transaction: transaction,
    cancelTransaction: mockCancelTransaction,
    swapAssets: mockSwapAssets,
    addTransaction: mockAddTransaction,
  }),
}));

describe("Confirmation", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should render correctly", () => {
    const { asFragment } = render(<ConfirmationCard />);
    expect(asFragment).toMatchSnapshot();
  });

  it("should redirect to transactions when click in confirm button", async () => {
    render(<ConfirmationCard />);

    fireEvent.click(screen.getByTestId("confirm-ok-button"));

    await waitFor(() => {
      expect(mockSwapAssets).toBeCalledTimes(1);
      expect(mockAddTransaction).toBeCalledTimes(1);
      expect(mockCancelTransaction).toBeCalledTimes(0);
      expect(mockPush).toBeCalledWith("/transactions");
    });
  });

  it("should redirect to swap when click in confirm button", async () => {
    render(<ConfirmationCard />);

    fireEvent.click(screen.getByTestId("confirm-cancel-button"));

    await waitFor(() => {
      expect(mockCancelTransaction).toBeCalledTimes(1);
      expect(mockSwapAssets).toBeCalledTimes(0);
      expect(mockAddTransaction).toBeCalledTimes(0);
      expect(mockPush).toBeCalledWith("/swap");
    });
  });
});
