import { render } from "@testing-library/react";
import Confirmation from "@/pages/confirmation";

let transaction = {
  input: { iconUrl: "http://test", quantity: 0 },
  output: { iconUrl: "http://test", quantity: 0 },
};
const mockPush = jest.fn();

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("@/context/global", () => ({
  useAppContext: () => ({
    transaction: transaction,
  }),
}));

describe("Confirmation", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Confirmation />);
    expect(asFragment()).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should redirect to swap", () => {
    transaction.input.iconUrl = "";
    render(<Confirmation />);
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith("/swap");
  });
});
