import React from "react";
import Image from "next/image";
import { CoinsBalance } from ".";

interface RowProps extends CoinsBalance {
  key: string;
}

const Row = ({
  iconUrl,
  name,
  symbol,
  currentQuantity,
  currentUsdPrice,
}: RowProps) => {
  console.log("name", name);
  return (
    <div className="flex justify-between p-6 shadow">
      <div className="flex items-center">
        <div className="h-9 w-9">
          <Image src={iconUrl} alt={symbol} width="100%" height="100%" />
        </div>
        <div className="ml-2 flex flex-col justify-center text-sm">
          <div className="font-bold">{name}</div>
          <div className="uppercase">{symbol}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold">$ {currentUsdPrice}</div>
        <div className="font-light text-sm text-gray-400">{`${currentQuantity} ${symbol}`}</div>
      </div>
    </div>
  );
};

export default Row;
