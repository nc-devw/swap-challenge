import React from "react";
import { useAppContext } from "@/context/global";
import { Coin } from "@/services/transforms/coins";
import Card from "@/components/Card";
import Row from "./row";

type Props = {
  coins: Coin[];
};

export interface CoinsBalance extends Coin {
  currentQuantity: number;
  currentUsdPrice?: number;
}

const TableCoins = ({ coins: coinsData }: Props) => {
  const { assets } = useAppContext();

  const [balance, setBalance] = React.useState(0);
  const [coins, setCoins] = React.useState<CoinsBalance[]>([]);

  React.useEffect(() => {
    setCoins([]);
    coinsData.forEach((coinData) => {
      const coin = assets.find((coin) => coin.symbol === coinData.symbol);

      if (!coin) {
        let newArray = [...coins, { ...coinData, currentQuantity: 0 }];
        setCoins(newArray);
        return;
      }
      const currentUsdPrice = coin.quantity * coinData.usdPrice;
      setBalance((prevState) => prevState + currentUsdPrice);

      setCoins((prevState) => [
        ...prevState,
        {
          ...coinData,
          currentQuantity: coin.quantity,
          currentUsdPrice,
        },
      ]);
    });
  }, []);

  return (
    <Card>
      <div className="flex flex-col">
        <div className="text-center p-4 shadow">
          <p className="uppercase font-bold text-lg">Your assets</p>
          <p className="uppercase text-sm text-gray-400">{`Total Balance: ${balance} USD`}</p>
        </div>
        {coins.length > 0 &&
          coins.map((coin: CoinsBalance) => (
            <Row key={coin.symbol} {...coin} />
          ))}
      </div>
    </Card>
  );
};

export default TableCoins;
