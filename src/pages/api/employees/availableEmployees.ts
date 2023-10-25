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
    const employees = await prisma.employee.findMany({
      where: { storeId: null },
    });

    return res.status(200).json(employees);
  } catch (error) {
    return res.status(400).end();
  }
}
