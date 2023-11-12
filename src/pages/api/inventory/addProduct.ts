import prisma from "../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }
  try {
    const inventoryId = req.body.inventoryId;
    const productId = req.body.productId;

    const inventory = await prisma.product.update({
      where: { id: productId },
      data: { inventoryId: inventoryId },
    });

    return res.status(200).json(inventory);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
