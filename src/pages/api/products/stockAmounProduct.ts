import prisma from "../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const productsInStock: any =
      await prisma.$queryRaw`SELECT SUM("quantityInStock") AS "totalStock" FROM "Product"`;
    const totalStockBigInt: bigint = productsInStock[0].totalStock as bigint;
    const totalStock: number = parseInt(totalStockBigInt.toString(), 10);

    return res.status(200).json(totalStock);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
