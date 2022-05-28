import React from "react";
import { Transaction, useAppContext } from "../../context/global";
import ChevronRight from "../../public/assets/icons/ChevronRight";
import Card from "../Card";
import IconWrapper from "../IconWrapper";
import Detail from "./detail";

const TransactionsCard = () => {
  const { transactions } = useAppContext();
  console.log("transactions", transactions);
  return (
    <Card>
      <div className="flex flex-col">
        <div className="text-center p-4 border-b">
          <p className="uppercase font-bold text-lg">Transactions</p>
        </div>
        {transactions.map(
          (transaction: Transaction) =>
            transaction.output &&
            transaction.input && (
              <div
                className="flex p-4 items-center justify-around"
                key={transaction.input.symbol}
              >
                <span className="font-bold">{transaction.date_created}</span>
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
                  output
                />
              </div>
            )
        )}
      </div>
    </Card>
  );
};

export default TransactionsCard;
