import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { omit } from "../../helpers/omit";
import { createAuthCookie, createUserAuthToken } from "../../helpers/auth";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;

  let user;

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (error) {
    res.status(401);
    return res.json({ error: "User already exists" });
  }
  const token = createUserAuthToken(user);
  res.setHeader("Set-Cookie", createAuthCookie(token));
  res.json(omit(user, "password"));
};
