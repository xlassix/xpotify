import { Box } from "@chakra-ui/layout";
import SideBar from "./SideBar";

const PlayerLayout = ({ children }) => {
  return (
    <Box height="100vh" width="100vw">
      <Box
        position="absolute"
        id="sidebar"
        width="250px"
        height="calc( 100vh - 75px ) "
      >
        <SideBar />
      </Box>
      <Box marginLeft="250px" height="calc( 100vh - 75px ) ">
        {children}
      </Box>
      <Box
        position="absolute"
        left="0"
        bottom="0"
        height="75px"
        bg="white"
        width="100vw"
      >
        player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
