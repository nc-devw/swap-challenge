import { NextApiRequest, NextApiResponse } from "next";
import { getAllCoins } from "@/services/coins";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case "GET":
      return res.status(200).json(await getAllCoins());
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
