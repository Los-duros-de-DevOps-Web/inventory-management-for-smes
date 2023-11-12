import prisma from "../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const storeId = req.body.storeId;
    const store = req.body.store;
    const products = req.body.products;

    const inventory = await prisma.inventory.create({
      data: {
        products: products,
        store: store,
        storeId: storeId,
      },
    });

    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(500).end();
  }
}
