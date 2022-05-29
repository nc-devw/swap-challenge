export interface AppContext {
  assets: CoinUser[];
  transaction: Transaction;
  transactions: Transaction[];
}

export interface AppContextWithActions extends AppContext {
  swapAssets: (payload: {
    input: {
      symbol: string;
      quantity: number;
    };
    output: {
      symbol: string;
      quantity: number;
    };
  }) => void;
  createTransaction: (payload: Transaction) => void;
  addTransaction: (payload: { date_created: string }) => void;
  cancelTransaction: () => void;
}

export interface CoinUser {
  symbol: string;
  quantity: number;
}

export interface Transaction {
  input: {
    symbol: string;
    quantity: number;
    iconUrl: string;
  };
  output: {
    symbol: string;
    quantity: number;
    iconUrl: string;
  };
  date_created: string;
}

export enum actionType {
  SWAP_ASSETS = "SWAP_ASSETS",
  CREATE_TRANSACTION = "CREATE_TRANSACTION",
  CANCEL_TRANSACTION = "CANCEL_TRANSACTION",
  ADD_TRANSACTION = "ADD_TRANSACTION",
}

export type swapActions =
  | swapAssetsAction
  | createTransactionAction
  | cancelTransactionAction
  | addTransactionAction;

export interface swapAssetsAction {
  type: actionType.SWAP_ASSETS;
  payload: {
    input: {
      symbol: string;
      quantity: number;
    };
    output: {
      symbol: string;
      quantity: number;
    };
  };
}

export interface cancelTransactionAction {
  type: actionType.CANCEL_TRANSACTION;
}

export interface addTransactionAction {
  type: actionType.ADD_TRANSACTION;
  payload: {
    date_created: string;
  };
}

export interface createTransactionAction {
  type: actionType.CREATE_TRANSACTION;
  payload: Transaction;
}
