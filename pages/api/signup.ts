import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismaClient from "../../lib/prisma";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: 400,
      message: "email and password are required to create and account",
    });
  }

  let user;

  try {
    user = await prismaClient.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
    delete user.password;
  } catch (e) {
    if (e.code === "P2002") {
      return res
        .status(401)
        .json({ status: 400, message: "user already exist" });
    }
    return res.status(401).json({ status: 400, message: e.message });
  }
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    process.env.jwt_secret,
    { expiresIn: "8h" }
  );

  res.setHeader(
    "setHeader",
    cookie.serialize(process.env.accessTokenName, token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );
  return res.json(user);
}
