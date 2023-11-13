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
    const productId: number = req.body.productId;
    const productMinus: number = req.body.productMinus;

    const product = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        quantityInStock: productMinus,
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
