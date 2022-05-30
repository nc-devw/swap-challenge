import React, { useContext } from "react";
import reducer from "@/reducers/global";
import { actionType } from "@/reducers/index.d";
import { AppContextWithActions, Transaction } from "./types.d";

export const initialTransaction: Transaction = {
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
