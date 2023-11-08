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
    const products = await prisma.product.findMany({});
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).end();
  }
}
