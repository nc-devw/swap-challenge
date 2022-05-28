import React, { useEffect } from "react";
import Card from "../Card";
import { useAppContext } from "../../context/global";
import IconWrapper from "../IconWrapper";
import { useRouter } from "next/router";
import ChevronRight from "../../public/assets/icons/ChevronRight";
import Detail from "./detail";

const ConfirmationCard = () => {
  const router = useRouter();

  const { transaction, addTransaction } = useAppContext();

  useEffect(() => {
    if (!transaction) {
      router.push("/swap");
    }
  }, []);

  return (
    transaction &&
    transaction.input &&
    transaction.output && (
      <Card>
        <div className="flex flex-col">
          <div className="text-center p-4 border-b">
            <p className="uppercase font-bold text-lg">Confirm your swap</p>
            <p className="font-bold text-small text-gray-400">
              You will receive approximately
            </p>
          </div>
          <div className="flex justify-around p-4 border-b">
            <Detail
              iconUrl={transaction.input.iconUrl}
              symbol={transaction.input.symbol}
              quantity={transaction.input.quantity}
            />
            <div className="flex items-center">
              <ChevronRight className="h-12 w-12" />
            </div>
            <Detail
              iconUrl={transaction.output.iconUrl}
              symbol={transaction.output.symbol}
              quantity={transaction.output.quantity}
            />
          </div>
          <div className="text-center p-4 border-b">
            <button
              className="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 "
              onClick={() => {
                const now = new Date();
                addTransaction({
                  date_created: now.toLocaleString("en-US"),
                });
                router.push("/transactions");
              }}
            >
              Confirm transaction
            </button>
          </div>
        </div>
      </Card>
    )
  );
};

export default ConfirmationCard;
