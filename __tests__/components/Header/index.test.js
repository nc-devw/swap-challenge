import { render } from "@testing-library/react";
import Header from "@/components/Header";

describe("Header", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Header />);
    expect(asFragment).toMatchSnapshot();
  });
});
