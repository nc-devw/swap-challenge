import { Transaction } from "@/context/types.d";

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
