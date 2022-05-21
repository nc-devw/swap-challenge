import React from "react";
import { useAppContext } from "../../context/global";
import useRestClient from "../../hooks/useRestClient";
import Row from "./row";

type Props = {};

const TableCoins = (props: Props) => {
  const { response } = useRestClient({
    method: "GET",
    url: `/coins`,
  });

  const { user } = useAppContext();

  return (
    <div className="w-100 rounded-lg m-4 shadow">
      <div className="flex flex-col">
        {response?.data &&
          user &&
          response.data.map((coin: any) => (
            <Row
              key={coin.symbol}
              iconUrl={coin.iconUrl}
              name={coin.name}
              symbol={coin.symbol}
              usdPrice={coin.usdPrice}
              userCoins={user.coins}
            />
          ))}
      </div>
    </div>
  );
};

export default TableCoins;
