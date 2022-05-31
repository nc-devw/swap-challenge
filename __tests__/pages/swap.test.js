import { render } from "@testing-library/react";
import Swap, { getServerSideProps } from "@/pages/swap";

jest.mock("../../helpers/fetchData", () => () => ({ data: [] }));

describe("Swap", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Swap coins={[]} />);
    expect(asFragment()).toBeDefined();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should receive properties correctly", async () => {
    const props = await getServerSideProps();
    expect(props).toEqual({
      props: { coins: [] },
    });
  });
});
