import React, { useContext } from "react";

interface AppContextState {
  assets: CoinUser[];
  transaction?: Transaction;
  transactions: Transaction[];
}

interface AppContext extends AppContextState {
  swapAssets: (payload: Transaction) => void;
  createTransaction: (payload: Transaction) => void;
  addTransaction: () => void;
  cancelTransaction: () => void;
}

export interface CoinUser {
  symbol: string;
  quantity: number;
}

interface Transaction {
  input?: {
    symbol: string;
    quantity: number;
  };
  output?: {
    symbol: string;
    quantity: number;
  };
  date_created?: string;
  exchange_rate?: string;
}

type swapActions =
  | swapAssetsAction
  | createTransactionAction
  | cancelTransactionAction
  | addTransactionAction;

interface swapAssetsAction {
  type: actionType.SWAP_ASSETS;
  payload: Transaction;
}

interface cancelTransactionAction {
  type: actionType.CANCEL_TRANSACTION;
}

interface addTransactionAction {
  type: actionType.ADD_TRANSACTION;
}

interface createTransactionAction {
  type: actionType.CREATE_TRANSACTION;
  payload: Transaction;
}

const initialState: AppContext = {
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
  transaction: undefined,
  transactions: [],
  swapAssets: () => {},
  createTransaction: () => {},
  cancelTransaction: () => {},
  addTransaction: () => {},
};

enum actionType {
  SWAP_ASSETS = "SWAP_ASSETS",
  CREATE_TRANSACTION = "CREATE_TRANSACTION",
  CANCEL_TRANSACTION = "CANCEL_TRANSACTION",
  ADD_TRANSACTION = "ADD_TRANSACTION",
}

const reducer = (state: AppContext, action: swapActions): AppContext => {
  switch (action.type) {
    case actionType.SWAP_ASSETS:
      return {
        ...state,
        assets: state.assets.map((coin) => {
          if (coin.symbol === action.payload?.input?.symbol) {
            coin.quantity = action.payload.input.quantity;
          }
          if (coin.symbol === action.payload?.output?.symbol) {
            coin.quantity = action.payload.output.quantity;
          }
          return coin;
        }),
      };
    case actionType.CREATE_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };
    case actionType.CANCEL_TRANSACTION:
      return {
        ...state,
        transaction: undefined,
      };
    case actionType.ADD_TRANSACTION:
      const transaction = { ...state.transaction };
      return {
        ...state,
        transaction: undefined,
        transactions: transaction
          ? [...state.transactions, transaction]
          : state.transactions,
      };
    default:
      return state;
  }
};

// context.js
export const Ctx = React.createContext<AppContext>(initialState);

export function useAppContext() {
  return useContext(Ctx);
}

export function AppProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    assets: state.assets,
    transaction: state.transaction,
    transactions: state.transactions,
    swapAssets: (payload: Transaction) =>
      dispatch({ type: actionType.SWAP_ASSETS, payload }),
    createTransaction: (payload: Transaction) =>
      dispatch({ type: actionType.CREATE_TRANSACTION, payload }),
    addTransaction: () => dispatch({ type: actionType.ADD_TRANSACTION }),
    cancelTransaction: () => dispatch({ type: actionType.CANCEL_TRANSACTION }),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
