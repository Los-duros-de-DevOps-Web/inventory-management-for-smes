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
    const { storeId } = req.query;

    const inventory: any = await prisma.inventory.findMany({
      where: { id: Number(storeId) },
      include: {
        products: true,
      },
    });

    let countProducts = 0;

    if (inventory) {
      countProducts = inventory.products.length;
    }

    return res.status(200).json(inventory);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
