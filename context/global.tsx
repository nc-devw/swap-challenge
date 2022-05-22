import React, { useContext } from "react";

interface AppContext {
  assets: CoinUser[];
}

export interface CoinUser {
  symbol: string;
  quantity: number;
}

interface Actions {
  type: string;
  payload: SwapAssetsAction;
}

interface SwapAssetsAction {
  input: {
    symbol: string;
    quantity: number;
  };
  output: {
    symbol: string;
    quantity: number;
  };
}

const initialState = {
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
};

const actions = {
  SWAP_ASSETS: "SWAP_ASSETS",
};

const reducer = (state: AppContext, action: Actions) => {
  switch (action.type) {
    case actions.SWAP_ASSETS:
      return {
        assets: state.assets.map((coin) => {
          if (coin.symbol === action.payload.input.symbol) {
            coin.quantity = action.payload.input.quantity;
          }
          if (coin.symbol === action.payload.output.symbol) {
            coin.quantity = action.payload.output.quantity;
          }
          return coin;
        }),
      };
    default:
      return state;
  }
};

// context.js
export const Ctx = React.createContext<AppContext>({
  assets: [],
});

export function useAppContext() {
  return useContext(Ctx);
}

export function AppProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = {
    assets: state.assets,
    swapAssets: (payload: {
      input: { symbol: string; quantity: number };
      output: { symbol: string; quantity: number };
    }) => {
      dispatch({ type: actions.SWAP_ASSETS, payload });
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
