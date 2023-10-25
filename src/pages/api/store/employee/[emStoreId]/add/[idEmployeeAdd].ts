import prisma from "../../../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { emStoreId, idEmployeeAdd } = req.query;

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(idEmployeeAdd) },
      data: {
        store: {
          connect: { id: Number(emStoreId) },
        },
      },
    });

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    return res.status(400).end();
  }
}
