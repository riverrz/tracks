import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";
import { createAuthCookie, createUserAuthToken } from "../../helpers/auth";
import { omit } from "../../helpers/omit";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = createUserAuthToken(user);
    res.setHeader("Set-Cookie", createAuthCookie(token));
    return res.json(omit(user, "password"));
  }
  res.status(401);
  return res.json({ error: "Email or password is wrong" });
};
