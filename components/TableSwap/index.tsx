import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React from "react";
import { useAppContext } from "../../context/global";
import useRestClient from "../../hooks/useRestClient";
import SwapIcon from "../../public/assets/icons/Swap";
import { Coin } from "../../services/transforms/coins";
import Card from "../Card";
import SelectCoin from "./SelectCoin";

type Props = {};

export interface CoinsBalance extends Coin {
  currentQuantity: number;
  currentUsdPrice: number;
}

const classDisabled = "cursor-not-allowed bg-gray-400 hover:bg-gray-600";

const TableSwap = (props: Props) => {
  const router = useRouter();

  const { response }: { response: AxiosResponse<Coin[], any> | undefined } =
    useRestClient({
      method: "GET",
      url: `/coins`,
    });

  const { assets, createTransaction } = useAppContext();
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
      const coin = assets?.find((coin) => coin.symbol === coinData.symbol);

      if (!coin) {
        let newArray = [
          ...coins,
          { ...coinData, currentQuantity: 0, currentUsdPrice: 0 },
        ];
        setCoins(newArray);
        return;
      }
      const currentUsdPrice = coin.quantity * coinData.usdPrice;

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

  const [currencyInput, setCurrencyInput] = React.useState(coins[0]);
  const [currencyOutput, setCurrencyOutput] = React.useState(coins[1]);

  const [valueInput, setValueInput] = React.useState("0");
  const [valueOutput, setValueOutput] = React.useState("0");

  React.useEffect(() => {
    setCurrencyInput(coins[0]);
    setCurrencyOutput(coins[1]);
  }, [coins]);

  const isEnabled = React.useMemo(() => {
    if (!Number(valueInput) || !Number(valueOutput)) {
      return false;
    }
    if (Number(valueInput) > currencyInput.currentQuantity) {
      return false;
    }

    return true;
  }, [valueInput, currencyInput, valueOutput, currencyOutput]);
  const swapCurrencies = () => {
    const oldCurrencyInput = { ...currencyInput };
    const oldValueInput = valueInput;
    setCurrencyInput(currencyOutput);
    setValueInput(valueOutput);
    setCurrencyOutput(oldCurrencyInput);
    setValueOutput(oldValueInput);
  };

  return (
    <Card className="w-80">
      <div className="flex flex-col">
        <div className="text-center p-4 border-b">
          <p className="uppercase font-bold text-lg">Swap</p>
          <p className="font-bold text-small text-gray-400">
            Trade tokens in an instant
          </p>
        </div>
        <div className="flex flex-col border-b p-4 items-center">
          <div className="flex">
            <div className="flex">
              <SelectCoin
                coins={coins}
                currency={currencyInput}
                setCurrency={setCurrencyInput}
                value={valueInput}
                setValue={setValueInput}
                swapCurrency={currencyOutput}
                setSwapValue={setValueOutput}
              />
            </div>
          </div>
          <div className="pt-2 pb-3">
            <SwapIcon
              className="w-8 h-8 fill-violet-500 hover:fill-violet-600 cursor-pointer"
              onClick={swapCurrencies}
            />
          </div>
          <div className="flex">
            <div className="flex">
              <SelectCoin
                coins={coins}
                currency={currencyOutput}
                setCurrency={setCurrencyOutput}
                value={valueOutput}
                setValue={setValueOutput}
                swapCurrency={currencyInput}
                setSwapValue={setValueInput}
                name="output"
              />
            </div>
          </div>
        </div>
        <div className="text-center p-4">
          <button
            className={`text-white font-bold py-2 px-4 rounded ${
              isEnabled ? "bg-blue-500 hover:bg-blue-700 " : classDisabled
            }`}
            onClick={() => {
              if (isEnabled) {
                createTransaction({
                  input: {
                    symbol: currencyInput.symbol,
                    quantity: Number(valueInput),
                    iconUrl: currencyInput.iconUrl,
                  },
                  output: {
                    symbol: currencyOutput.symbol,
                    quantity: Number(valueOutput),
                    iconUrl: currencyOutput.iconUrl,
                  },
                });
                router.push("/confirmation");
              }
            }}
          >
            Swap
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TableSwap;
