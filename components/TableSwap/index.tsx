import { AxiosResponse } from "axios";
import React from "react";
import { useAppContext } from "../../context/global";
import useRestClient from "../../hooks/useRestClient";
import { Coin } from "../../services/transforms/coins";
import Card from "../Card";

type Props = {};

export interface CoinsBalance extends Coin {
  currentQuantity: number;
  currentUsdPrice?: number;
}

const TableSwap = (props: Props) => {
  const { response }: { response: AxiosResponse<Coin[], any> | undefined } =
    useRestClient({
      method: "GET",
      url: `/coins`,
    });

  const { user } = useAppContext();

  const [balance, setBalance] = React.useState(0);
  const [coins, setCoins] = React.useState<CoinsBalance[]>([]);

  React.useEffect(() => {
    if (
      response?.data.length === 0 ||
      user?.coins.length === 0 ||
      coins.length !== 0
    ) {
      return;
    }

    response?.data.forEach((coinData) => {
      const coin = user?.coins?.find((coin) => coin.symbol === coinData.symbol);

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
  }, [response, user]);
  return (
    <Card>
      <div className="flex flex-col">
        <div className="text-center p-4 border-b">
          <p className="uppercase font-bold text-lg">Swap</p>
          <p className="font-bold text-small text-gray-400">
            Trade tokens in an instant
          </p>
        </div>
        <div className="flex flex-col border-b p-4">
          <div className="flex justify-between">
            <div className="flex">
              {/* // select */}
              <span>icon</span>
              <span>BNB</span>
              <span>chevron</span>
            </div>
            <div>
              <span>Balance: 0.0017</span>
            </div>
          </div>
          <div>
            <span>chevron de swap</span>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              {/* // select */}
              <span>icon</span>
              <span>BTC</span>
              <span>chevron</span>
            </div>
            <div>
              <span>Balance: 0.0017</span>
            </div>
          </div>
        </div>
        <div className="text-center p-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Swap
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TableSwap;
