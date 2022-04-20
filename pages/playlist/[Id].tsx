import prismaClient from "../../lib/prisma";
import { validateToken } from "../../lib/protect";
import GradientLayout from "../../components/GradientLayout";
import SongTable from "../../components/SongTable";

const getRandomColor = () => {
  const colors = [
    "green",
    "red",
    "purple",
    "blue",
    "orange",
    "pink",
    "teal",
    "yellow",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      fontColor="white"
      roundedImage={false}
      color={getRandomColor()}
      description={`${playlist.songs.length} Songs`}
      subtitle="Playlist"
      title={playlist.name}
      image={`https://picsum.photos/400?random=${playlist.id}`} // "https://365psd.com/images/previews/f8b/abstract-music-design-background-vector-illustration-3357.jpg"
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const user = validateToken(req.cookies[process.env.accessTokenName]);
  const [playlist] = await prismaClient.playlist.findMany({
    where: {
      id: +query.Id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;
