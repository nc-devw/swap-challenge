import fetchData from "@/helpers/fetchData";

const mockRequest = jest.fn();
jest.mock("axios", () => ({
  request: (params) => mockRequest(params),
  defaults: { baseUrl: undefined },
}));

describe("FetchData", () => {
  it("should execute with correct params", async () => {
    const params = "testParams";

    await fetchData("testParams");

    expect(mockRequest).toBeCalledWith(params);
  });
});
