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
    const { orderStore } = req.query;

    const order = await prisma.order.findMany({
      where: {
        storeId: Number(orderStore),
      },
      include: {
        OrderOnProducts: {
          include: {
            Product: true,
          },
        },
      },
    });

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
