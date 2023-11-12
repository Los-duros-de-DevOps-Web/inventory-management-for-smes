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
    const date = req.body.date;
    const description = req.body.description;
    const productId = req.body.productId;

    const lowStockAlarm = await prisma.lowStockAlarm.create({
      data: {
        date: date,
        description: description,
        product: {
          connect: { id: Number(productId) },
        },
      },
    });

    return res.status(200).json(lowStockAlarm);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
