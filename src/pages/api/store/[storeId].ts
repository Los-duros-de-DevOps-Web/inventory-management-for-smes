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

    const store: any = await prisma.store.findUnique({
      where: { id: Number(storeId) },
      include: {
        employees: true,
        inventory: true,
      },
    });

    let countEmployees = 0;
    let countInventory = 0;

    if (store) {
      countEmployees = store?.employees.length;
      countInventory = store?.inventory.length;
    }

    return res.status(200).json(store);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
