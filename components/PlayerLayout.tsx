import { Box } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import SideBar from "./SideBar";
import PlayerBar from "./PlayerBar";

const PlayerLayout = ({ children }) => {
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100vh" width="100vw">
      <Box
        position="absolute"
        id="sidebar"
        width="250px"
        height={activeSong ? "calc( 100vh - 75px ) " : "100vh"}
      >
        <SideBar />
      </Box>
      <Box
        marginLeft="250px"
        height={activeSong ? "calc( 100vh - 75px ) " : "100vh"}
      >
        {children}
      </Box>
      {activeSong ? (
        <Box
          position="absolute"
          left="0"
          bottom="0"
          height="75px"
          bg="white"
          width="100vw"
        >
          <PlayerBar />
        </Box>
      ) : null}
    </Box>
  );
};

export default PlayerLayout;
