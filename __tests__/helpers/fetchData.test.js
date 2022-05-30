import fetchData from "@/helpers/fetchData";

const mockRequest = jest.fn();

import axios from "axios";

jest.mock("axios", () => ({
  request: (params) => mockRequest(params),
  defaults: { baseUrl: undefined },
}));

describe("FetchData", () => {
  const oldEnv = process.env;

  afterAll(() => {
    process.env = oldEnv;
  });
  // it("should execute with correct params", async () => {
  //   const params = "testParams";

  //   await fetchData("testParams");

  //   expect(mockRequest).toBeCalledWith(params);
  // });

  it("should change base url axios", async () => {
    process.env.VERCEL_URL = "test";

    await fetchData();

    expect(axios.defaults.baseURL).toEqual("test");
  });
});
