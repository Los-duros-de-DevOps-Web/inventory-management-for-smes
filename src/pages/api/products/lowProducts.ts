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
    const productsWithLowStock =
      await prisma.$queryRaw`SELECT * FROM "public"."Product" WHERE "quantityInStock" < "lowStockRange"`;
    return res.status(200).json(productsWithLowStock);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
