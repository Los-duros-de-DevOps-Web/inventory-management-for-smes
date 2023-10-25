import prisma from "../../../../../../libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }
  try {
    const { idEmployee } = req.query;

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(idEmployee) },
      data: {
        store: {
          disconnect: true,
        },
      },
    });

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    return res.status(400).end();
  }
}
