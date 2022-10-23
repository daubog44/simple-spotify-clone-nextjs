import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "hello",
      {
        expiresIn: "8h",
      }
    );

    return res
      .setHeader(
        "Set-Cookie",
        cookie.serialize("CLONE_SPOTYFY_ACESS_TOKEN", token, {
          httpOnly: true,
          maxAge: 8 * 60 * 60,
          path: "/",
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
      )
      .json(user);
  }

  return res.status(401).json({ error: "Email or Password incorrect" });
};
