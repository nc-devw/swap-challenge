import { render, waitFor } from "@testing-library/react";
import Home, { getServerSideProps } from "@/pages/index";

jest.mock("../../helpers/fetchData", () => () => ({ data: [] }));

describe("Home", () => {
  it("should render correctly", () => {
    const { asFragment } = render(<Home coins={[]} />);
    expect(asFragment).toMatchSnapshot();
  });

  it("should receive properties correctly", async () => {
    const props = await getServerSideProps();
    expect(props).toEqual({
      props: { coins: [] },
    });
  });
});
