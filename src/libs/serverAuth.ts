import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prisma from "../libs/prisma";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (!session?.user?.name) {
    throw new Error("Not signed in");
  }

  const currentUser = await prisma.employee.findUnique({
    where: {
      username: session.user.name,
    },
  });

  if (!currentUser) {
    throw new Error(currentUser + " not found");
  }

  return { currentUser };
};

export default serverAuth;
