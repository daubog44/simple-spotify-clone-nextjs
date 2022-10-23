import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma, { type User } from "./prisma";

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.CLONE_SPOTYFY_ACESS_TOKEN;
    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          throw new Error("not real user");
        }
      } catch (err) {
        return res.status(401).json({ error: "Not authorized" });
      }
      return handler(req, res, user as User);
    }
    return res.status(401).json({ error: "Not authorized" });
  };
};

interface tokenPayload {
  id: number;
  email: string;
  time: Date;
}

export const validateToken = (token): tokenPayload => {
  const user = jwt.verify(token, "hello");
  return user;
};
