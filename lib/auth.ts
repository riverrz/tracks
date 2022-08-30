import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

export const validateToken = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
};

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[process.env.ACCESS_TOKEN_KEY];

    if (!token) {
      res.status(401);
      return res.json({ error: "Not Authorized" });
    }

    try {
      const { id } = validateToken(token);
      const user = await prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return handler(req, res, user);
    } catch (error) {
      res.status(401);
      return res.json({ error: "Not Authorized" });
    }
  };
};
