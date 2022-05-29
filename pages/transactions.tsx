import type { NextPage } from "next";
import Head from "next/head";
import TransactionsCard from "@/components/TransactionsCard";

const TransactionsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Belo | Transactions</title>
        {/* <meta name="description" content="Generated by create next app" />*/}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <TransactionsCard />
      </div>
    </>
  );
};

export default TransactionsPage;
