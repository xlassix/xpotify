import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./seedData";

const prisma = new PrismaClient();

const run = async () => {
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      password: bcrypt.hashSync("12345", salt),
      firstName: "Ayobami",
      lastName: "Oki",
      avatar: "https://avatars.githubusercontent.com/u/46370698?v=4",
    },
  });

  console.log("user", user);

  const songs = await prisma.song.findMany({});
  const playlist = await Promise.all(
    Array(5)
      .fill(1)
      .map(async (artist, index) => {
        return prisma.playlist.upsert({
          where: { id: index + 1 },
          update: {},
          create: {
            id: index + 1,
            userId: user.id,
            name: `Playlist #0${index + 1}`,
            songs: {
              connect: Array(2)
                .fill(1)
                .map(() => ({
                  id: songs[Math.floor(Math.random() * songs.length)].id,
                })),
            },
          },
        });
      })
  );
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
