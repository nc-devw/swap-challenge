import React from "react";
import Row from "./row";

type Props = {};

const TableCoins = (props: Props) => {
  return (
    <div className="w-100 border-2 rounded-lg m-4 shadow">
      <div className="flex flex-col">
        <Row
          iconUrl="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
          name="Bitcoin"
          symbol="btc"
          usd={56.24}
          quantity={0.00000245}
        />
      </div>
    </div>
  );
};

export default TableCoins;
