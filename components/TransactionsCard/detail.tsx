import React from "react";
import IconWrapper from "@/components/IconWrapper";

interface Props {
  iconUrl: string;
  symbol: string;
  quantity: number;
  output?: boolean;
}

const Detail = ({ iconUrl, symbol, quantity, output }: Props) => {
  return (
    <div className="flex items-center">
      <div className="ml-4 flex items-center">
        <span
          className={`text-lg ${
            output ? "text-green-500" : "text-red-500"
          } font-bold`}
        >
          {`${output ? "+" : "-"}`}
          {parseFloat(quantity.toFixed(5))}
        </span>
      </div>
      <span className="pl-2 uppercase font-bold">{symbol}</span>
      <IconWrapper src={iconUrl} alt={symbol} className="pl-2 h-9 w-9" />
    </div>
  );
};

export default Detail;
