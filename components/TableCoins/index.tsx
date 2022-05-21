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
    <div className="w-100 rounded-lg m-12 shadow">
      <div className="flex flex-col">
        <div className="flex justify-center p-4 shadow">
          <span className="uppercase font-bold text-lg">Your assets</span>
        </div>
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
