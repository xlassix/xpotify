import GradientLayout from "../components/GradientLayout";
import prismaClient from "../lib/prisma";
import TopArtist from "../components/TopArtist";
import { useMe } from "../lib/hooks";

const Home = ({ artists }) => {
  const { user, isLoading } = useMe();
  return (
    <GradientLayout
      color="purple"
      fontColor="white"
      title={isLoading ? "" : `${user.firstName} ${user.lastName}`}
      subtitle="Profile"
      description="You are the greatest alive"
      image={
        isLoading || !user.avatar
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
          : `${user.avatar}`
      }
      roundedImage
    >
      <TopArtist artists={artists} />
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prismaClient.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;
