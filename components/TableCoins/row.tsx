import React from "react";
import { CoinsBalance } from ".";
import IconWrapper from "@/components/IconWrapper";

interface RowProps extends CoinsBalance {
  key: string;
}

const Row = ({
  iconUrl,
  name,
  symbol,
  currentQuantity,
  currentUsdPrice,
}: RowProps) => (
  <div className="flex justify-between p-6 shadow">
    <div className="flex items-center">
      <IconWrapper src={iconUrl} alt={symbol} className="h-9 w-9" />
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

export default Row;
