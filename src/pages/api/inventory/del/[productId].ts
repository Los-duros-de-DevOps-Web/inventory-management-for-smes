import prisma from "../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { productId } = req.query;
    console.log(productId);

    const product: any = await prisma.product.update({
      where: { id: Number(productId) },
      data: {
        inventoryId: null,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    return res.status(400).end();
  }
}
