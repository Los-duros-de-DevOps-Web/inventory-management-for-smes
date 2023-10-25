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
    const nameStore = req.body.nameStore;
    const employees = req.body.employees;

    const store = await prisma.store.create({
      data: {
        name: nameStore,
        employees: {
          connect: employees,
        },
      },
    });

    return res.status(200).json(store);
  } catch (error) {
    return res.status(400).end();
  }
}
