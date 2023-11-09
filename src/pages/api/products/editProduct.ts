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
    const productID = Number(req.body.productID);
    const productDetails = req.body.productDetails;
    const quantityInStock = parseInt(req.body.quantityInStock);
    const lowStockRange = parseInt(req.body.lowStockRange);

    const product = await prisma.product.update({
      where: { id: Number(productID) },
      data: {
        details: productDetails,
        quantityInStock: quantityInStock,
        lowStockRange: lowStockRange,
      },
    });
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}
