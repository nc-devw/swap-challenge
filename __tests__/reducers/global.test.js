import reducer from "@/reducers/global";

const initialTransaction = {
  date_created: "",
  input: {
    iconUrl: "",
    symbol: "",
    quantity: 0,
  },
  output: {
    iconUrl: "",
    symbol: "",
    quantity: 0,
  },
};

const mockInitialState = {
  assets: [
    {
      symbol: "btc",
      quantity: 100,
    },
    {
      symbol: "eth",
      quantity: 100,
    },
  ],
  transaction: { ...initialTransaction },
  transactions: [],
};
describe("Global Reducer", () => {
  it("should receive the initial values", async () => {
    const result = reducer(mockInitialState, { type: undefined });
    expect(result).toEqual(mockInitialState);
  });

  it("should swap assets correctly", async () => {
    const result = reducer(mockInitialState, {
      type: "SWAP_ASSETS",
      payload: {
        input: {
          symbol: "btc",
          quantity: 50,
        },
        output: {
          symbol: "eth",
          quantity: 200,
        },
      },
    });
    expect(result).toEqual({
      ...mockInitialState,
      assets: [
        {
          symbol: "btc",
          quantity: 50,
        },
        {
          symbol: "eth",
          quantity: 300,
        },
      ],
    });
  });

  it("should create transaction correctly", async () => {
    const result = reducer(mockInitialState, {
      type: "CREATE_TRANSACTION",
      payload: 2,
    });
    expect(result).toEqual({
      ...mockInitialState,
      transaction: 2,
    });
  });

  it("should cancel transaction correctly", async () => {
    const result = reducer(mockInitialState, {
      type: "CANCEL_TRANSACTION",
    });
    expect(result).toEqual(mockInitialState);
  });

  it("should add transaction correctly", async () => {
    const mockPayload = { date_created: "2022-05-29 22:18" };
    const result = reducer(mockInitialState, {
      type: "ADD_TRANSACTION",
      payload: mockPayload,
    });
    expect(result).toEqual({
      ...mockInitialState,
      transactions: [{ ...initialTransaction, ...mockPayload }],
    });
  });
});
