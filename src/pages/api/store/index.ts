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
    const stores = await prisma.store.findMany({
      include: { employees: true, inventory: true },
    });
    return res.status(200).json(stores);
  } catch (error) {
    return res.status(400).end();
  }
}
