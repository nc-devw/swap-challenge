import React, { useContext } from "react";

interface AppContext {
  user?: User;
}

interface User {
  name: string;
  coins: Coin[];
}

export interface Coin {
  symbol: string;
  quantity: number;
}

// context.js
export const Ctx = React.createContext<AppContext>({});

export function useAppContext() {
  return useContext(Ctx);
}

export function AppProvider({ children }: { children: React.ReactElement }) {
  const [app, setApp] = React.useState<AppContext>({});

  React.useEffect(() => {
    setApp({
      user: {
        name: "ncdevw",
        coins: [
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
      },
    });
  }, []);

  return <Ctx.Provider value={app}>{children}</Ctx.Provider>;
}
