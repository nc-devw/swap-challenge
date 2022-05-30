import React from "react";
import Image from "next/image";
import { CoinsBalance } from ".";
import ExpandMore from "@/public/assets/icons/ExpandMore";

const SelectCoin = ({
  coins,
  currency,
  setCurrency,
  value,
  setValue,
  swapCurrency,
  setSwapValue,
  name,
}: {
  coins: CoinsBalance[];
  currency: CoinsBalance;
  setCurrency: React.Dispatch<React.SetStateAction<CoinsBalance>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  swapCurrency: CoinsBalance;
  setSwapValue: React.Dispatch<React.SetStateAction<string>>;
  name?: string;
}) => {
  const [open, setOpen] = React.useState(false);

  const handleCurrency = (coin: CoinsBalance) => {
    setCurrency(coin);
    setOpen(false);
  };

  const handleChange = (
    ev: React.FormEvent<HTMLInputElement>,
    maxValue: number
  ) => {
    const currentValue = ev.currentTarget.value;

    if (currentValue === "") {
      setValue(currentValue);
    }
    if (!/^\d+\.{0,1}\d{0,15}$/.test(currentValue)) {
      return;
    }

    let newValue = "";

    if (Number(currentValue) > maxValue && name !== "output") {
      newValue = maxValue.toString();
    } else {
      newValue = ev.currentTarget.value;
    }

    const swapValue =
      (Number(newValue) * currency.usdPrice) / swapCurrency.usdPrice;
    setSwapValue(swapValue.toString());
    return setValue(newValue);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex relative">
        <div
          className="flex cursor-pointer"
          onClick={() => {
            setOpen((prevState) => !prevState);
          }}
        >
          <Image
            alt="cripto"
            src={currency?.iconUrl || "/"}
            width={20}
            height={20}
          />
          <span className="ml-2 uppercase font-bold">{currency?.symbol}</span>
          <ExpandMore className="h-6 w-6" />
        </div>
        <div className="pl-6 text-sm text-gray-400">
          <span>
            Balance: {parseFloat(currency?.currentQuantity.toFixed(5))}
          </span>
        </div>
        <div
          style={{ display: open ? "block" : "none" }}
          className="shadow rounded absolute bg-white z-10 left-20 top-2 w-24 border"
        >
          {coins.map(
            (coin: CoinsBalance) =>
              coin.symbol !== currency?.symbol && (
                <div
                  className="flex items-center p-2 m-2 hover:text-slate-50 hover:bg-violet-500 cursor-pointer rounded"
                  key={coin.symbol}
                  onClick={() => handleCurrency(coin)}
                >
                  <Image
                    alt="cripto"
                    src={coin.iconUrl}
                    width={20}
                    height={20}
                  />
                  <span className="ml-2 font-bold uppercase text-sm">
                    {coin.symbol}
                  </span>
                </div>
              )
          )}
        </div>
      </div>
      <div className="m-2">
        <input
          className="bg-gray-100 rounded p-2"
          type="text"
          value={value}
          onChange={(ev) => handleChange(ev, currency?.currentQuantity)}
        />
      </div>
    </div>
  );
};

export default SelectCoin;
