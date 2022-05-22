import { AxiosResponse } from "axios";
import React from "react";
import { useAppContext } from "../../context/global";
import useRestClient from "../../hooks/useRestClient";
import { Coin } from "../../services/transforms/coins";
import Card from "../Card";
import Row from "./row";

type Props = {};

export interface CoinsBalance extends Coin {
  currentQuantity: number;
  currentUsdPrice?: number;
}

const TableCoins = (props: Props) => {
  const { response }: { response: AxiosResponse<Coin[], any> | undefined } =
    useRestClient({
      method: "GET",
      url: `/coins`,
    });

  const { assets } = useAppContext();

  const [balance, setBalance] = React.useState(0);
  const [coins, setCoins] = React.useState<CoinsBalance[]>([]);

  React.useEffect(() => {
    if (
      response?.data.length === 0 ||
      assets.length === 0 ||
      coins.length !== 0
    ) {
      return;
    }

    response?.data.forEach((coinData) => {
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

      return;
    });

    return;
  }, [response, assets]);
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
