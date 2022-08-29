import { User } from "@prisma/client";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const createUserAuthToken = (user: User) => {
  return jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
};

export const createAuthCookie = (token: string) => {
  return cookie.serialize(process.env.ACCESS_TOKEN_KEY, token, {
    httpOnly: true,
    maxAge: 8 * 60 * 60,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};
