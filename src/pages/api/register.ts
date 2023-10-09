import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { username, name, gPassword } = req.body;

    const password: string = await bcrypt.hash(gPassword, 12);

    const user = await prisma.employee.create({
      data: {
        username,
        name,
        password,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
