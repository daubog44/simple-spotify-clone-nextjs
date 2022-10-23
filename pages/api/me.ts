// eslint-disable-next-line import/no-named-as-default
import { NextApiRequest, NextApiResponse } from "next";
import { validateRoute } from "../../lib/auth";
import prisma, { type User } from "../../lib/prisma";

export default validateRoute(
  async (_: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlistsCount = await prisma.playlist.count({
      where: {
        userId: user.id,
      },
    });
    res.json({ ...user, playlistsCount });
  }
);
