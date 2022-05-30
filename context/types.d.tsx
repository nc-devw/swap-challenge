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
