import React from "react";
import { useAppContext } from "@/context/global";
import { Transaction } from "@/context/types.d";
import ChevronRight from "@/public/assets/icons/ChevronRight";
import Card from "@/components/Card";
import Detail from "./detail";

const TransactionsCard = () => {
  const { transactions } = useAppContext();
  return (
    <Card>
      <div className="flex flex-col">
        <div className="text-center p-4 border-b">
          <p className="uppercase font-bold text-lg">Transactions</p>
        </div>
        {transactions.length > 0 ? (
          transactions.map((transaction: Transaction) => (
            <div
              className="flex flex-col p-4 items-center justify-around border-b"
              key={transaction.input.symbol}
            >
              <span className="font-bold">{transaction.date_created}</span>
              <Detail
                iconUrl={transaction.input.iconUrl}
                symbol={transaction.input.symbol}
                quantity={transaction.input.quantity}
              />
              <div className="flex items-center rotate-90 md:rotate-0">
                <ChevronRight className="h-12 w-12" />
              </div>
              <Detail
                iconUrl={transaction.output.iconUrl}
                symbol={transaction.output.symbol}
                quantity={transaction.output.quantity}
                output
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col p-4 items-center justify-around border-b">
            <span>There are no transactions</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default TransactionsCard;
