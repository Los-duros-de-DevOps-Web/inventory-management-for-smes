import ProductData from "@/types/ProductData";
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
    const order = req.body.order;

    const orderAdd = await prisma.order.create({
      data: {
        date: order.date,
        nameClient: order.nameClient,
        total: order.total,
        store: {
          connect: { id: order.store },
        },
      },
    });

    const orderProducts = order.selectedProducts;

    const orderProductsData = orderProducts.map(
      (product: ProductData, index: number) => ({
        orderId: orderAdd.id,
        productId: product.id,
        amount: order.amountProductsAdded[index],
      })
    );

    const createdOrderProducts = await prisma.orderOnProducts.createMany({
      data: orderProductsData,
    });

    return res.status(200).json(createdOrderProducts);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
