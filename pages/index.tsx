import GradientLayout from "../components/GradientLayout";
import prismaClient from "../lib/prisma";

const Home = () => {
  return (
    <GradientLayout
      color="red"
      fontColor="white"
      title="XLASSIX"
      subtitle="Profile"
      description="greatest alive"
      image="https://avatars.githubusercontent.com/u/46370698?v=4"
      roundedImage
    >
      <p>hello</p>
    </GradientLayout>
  );
};

export const getServerSideProps =async ({context}) => {
  console.log(context);
  <article></article>


} 

export default Home;
