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
    const { delProduct } = req.query;

    const removeProduct = await prisma.product.delete({
      where: { id: Number(delProduct) },
    });

    return res.status(200).json(removeProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
