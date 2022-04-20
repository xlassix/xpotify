import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import Player from "./Player";

const PlayerBar = () => {
  const activeSong = useStoreState((state: any) => state.activeSong);
  const songs = useStoreState((state: any) => state.activeSongs);

  return (
    <Flex
      width="100%"
      height="100%"
      bg="gray.900"
      justifyContent="space-between"
      align="center"
      color="white"
      padding="1rem"
    >
      <Box flexBasis="28%">
        <Text fontSize="large" fontWeight="500">
          {activeSong.name}
        </Text>
        <Text fontSize="sm">{activeSong.artist.name}</Text>
      </Box>
      <Box flexBasis="44%">
        <Player songs={songs} activeSong={activeSong} />
      </Box>
      <Box flexBasis="28%"> </Box>
    </Flex>
  );
};
export default PlayerBar;
