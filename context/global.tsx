import React, { useContext } from "react";
import {
  actionType,
  AppContext,
  AppContextWithActions,
  swapActions,
  Transaction,
} from "./types.d";

const initialTransaction: Transaction = {
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

const initialState: AppContextWithActions = {
  assets: [
    {
      symbol: "btc",
      quantity: 0.002,
    },
    {
      symbol: "eth",
      quantity: 0.1,
    },
    {
      symbol: "dai",
      quantity: 100,
    },
    {
      symbol: "usdt",
      quantity: 1000,
    },
  ],
  transaction: { ...initialTransaction },
  transactions: [],
  swapAssets: () => {},
  createTransaction: () => {},
  cancelTransaction: () => {},
  addTransaction: () => {},
};

const reducer = (state: AppContext, action: swapActions): AppContext => {
  switch (action.type) {
    case actionType.SWAP_ASSETS:
      const indexInput = state.assets.findIndex(
        (asset) => asset.symbol === action.payload?.input?.symbol
      );

      const newObjectInput = {
        symbol: state.assets[indexInput].symbol,
        quantity:
          state.assets[indexInput].quantity - action.payload.input.quantity,
      };

      const indexOutput = state.assets.findIndex(
        (asset) => asset.symbol === action.payload?.output?.symbol
      );

      const newObjectOutput = {
        symbol: state.assets[indexOutput].symbol,
        quantity:
          state.assets[indexOutput].quantity - action.payload.output.quantity,
      };

      const assets = [...state.assets];

      assets[indexInput] = newObjectInput;
      assets[indexOutput] = newObjectOutput;

      return {
        ...state,
        assets: [...assets],
      };
    case actionType.CREATE_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    case actionType.CANCEL_TRANSACTION:
      return {
        ...state,
        transaction: { ...initialTransaction },
      };
    case actionType.ADD_TRANSACTION:
      const transaction = { ...state.transaction };
      return {
        ...state,
        transaction: { ...initialTransaction },
        transactions: transaction
          ? [
              ...state.transactions,
              { ...transaction, date_created: action.payload.date_created },
            ]
          : state.transactions,
      };
    default:
      return state;
  }
};

// context.js
export const Ctx = React.createContext<AppContextWithActions>(initialState);

export function useAppContext() {
  return useContext(Ctx);
}

export function AppProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    assets: state.assets,
    transaction: state.transaction,
    transactions: state.transactions,
    swapAssets: (payload: {
      input: {
        symbol: string;
        quantity: number;
      };
      output: {
        symbol: string;
        quantity: number;
      };
    }) => dispatch({ type: actionType.SWAP_ASSETS, payload }),
    createTransaction: (payload: Transaction) =>
      dispatch({ type: actionType.CREATE_TRANSACTION, payload }),
    addTransaction: (payload: { date_created: string }) =>
      dispatch({ type: actionType.ADD_TRANSACTION, payload }),
    cancelTransaction: () => dispatch({ type: actionType.CANCEL_TRANSACTION }),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
