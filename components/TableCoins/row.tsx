import React from "react";
import Image from "next/image";

type RowProps = {
  iconUrl: string;
  name: string;
  symbol: string;
  usd: number;
  quantity: number;
};

const Row = ({ iconUrl, name, symbol, usd, quantity }: RowProps) => {
  return (
    <div className="flex justify-between p-4 border-b-2">
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
        <div className="font-bold">$ {usd}</div>
        <div className="font-light text-sm text-gray-400">{`${quantity} ${symbol}`}</div>
      </div>
    </div>
  );
};

export default Row;
