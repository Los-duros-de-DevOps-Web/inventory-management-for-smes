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
    const lowStockAlarm = await prisma.lowStockAlarm.findMany({});

    return res.status(200).json(lowStockAlarm);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
