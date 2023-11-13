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
    const { notifyId } = req.query;

    const lowStockAlarm: any = await prisma.lowStockAlarm.delete({
      where: { id: Number(notifyId) },
    });

    return res.status(200).json(lowStockAlarm);
  } catch (error) {
    console.log(error);

    return res.status(400).end();
  }
}
