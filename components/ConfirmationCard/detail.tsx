import React from "react";
import IconWrapper from "@/components/IconWrapper";

interface Props {
  iconUrl: string;
  symbol: string;
  quantity: number;
}

const Detail = ({ iconUrl, symbol, quantity }: Props) => (
  <div className="flex text-center w-80 justify-center break-all">
    <div className="flex flex-col items-center">
      <IconWrapper src={iconUrl} alt={symbol} className="pl-2 h-9 w-9" />
      <span className="pl-2 uppercase font-bold">{symbol}</span>
      <div className="ml-4 flex items-center">
        <span className="text-lg">{parseFloat(quantity.toFixed(5))}</span>
      </div>
    </div>
  </div>
);

export default Detail;
