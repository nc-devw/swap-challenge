import CoinController from "../../../../pages/api/coins";

jest.mock("@/services/coins", () => ({ getAllCoins: () => Promise.resolve() }));

const mockSetHeader = jest.fn();
const mockEnd = jest.fn();
const mockJson = jest.fn(() => Promise.resolve());
const mockStatus = jest.fn(() => ({
  json: mockJson,
  end: mockEnd,
}));

describe("Api coin", () => {
  it("should response 200", async () => {
    let res = {
      status: mockStatus,
    };
    await CoinController({ method: "GET" }, res);

    expect(mockStatus).toBeCalledWith(200);
  });

  it("should response 200", async () => {
    let res = {
      status: mockStatus,
      setHeader: mockSetHeader,
    };
    await CoinController({ method: "TEST" }, res);

    expect(mockSetHeader).toBeCalledWith("Allow", ["GET"]);
    expect(mockStatus).toBeCalledWith(405);
    expect(mockEnd).toBeCalledWith("Method TEST Not Allowed");
  });
});
