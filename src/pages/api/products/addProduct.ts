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
    const productName: string = req.body.productName;
    const productDetails = req.body.productDetails;
    const quantityInStock = parseInt(req.body.quantityInStock);
    const lowStockRange = parseInt(req.body.lowStockRange);

    const product = await prisma.product.create({
      data: {
        name: productName,
        details: productDetails,
        quantityInStock: quantityInStock,
        lowStockRange: lowStockRange,
        inventory: {},
      },
    });

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).end();
  }
}
