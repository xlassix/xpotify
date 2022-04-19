import { validateRoute } from "../../lib/protect";
import prismaClient from "../../lib/prisma";

export default validateRoute(async (req, res, user) => {
  const playlist = await prismaClient.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      id: "asc",
    },
  });
  return res.json(playlist);
});
