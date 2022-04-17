import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import prismaClient from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[`${process.env.accessTokenName}`];

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, process.env.jwt_secret);
        user = await prismaClient.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (e) {
        console.log(e.message);
        return res.status(401).end();
      }

      return handler(req, res, user);
    }
    return res.status(401).end();
  };
};
