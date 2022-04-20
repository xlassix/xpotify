import { Th, Td, Tr, Table, Tbody, Thead, IconButton } from "@chakra-ui/react";
import { useStoreActions } from "easy-peasy";
import { Box } from "@chakra-ui/layout";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { formatDate, formatSongTime } from "../lib/formatter";

const SongTable = ({ songs }) => {
  const playSongs = useStoreActions((state: any) => state.changeActiveSongs);
  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  function handlePlay(song?) {
    playSongs(songs);
    setActiveSong(song || songs[0]);
  }

  return (
    <Box bg="transparent" padding="2rem" color="white">
      <IconButton
        icon={<BsFillPlayFill fontSize="30px" />}
        size="lg"
        colorScheme="green"
        isRound
        aria-label="PlayButton"
        outline="none"
        onClick={() => handlePlay()}
        sx={{
          "$:focus": {
            outline: "none",
          },
        }}
      />
      <Table variant="unstyled" color="white" marginTop="1rem">
        <Thead borderBottom="1.2px solid" borderColor="white">
          <Th>#</Th>
          <Th>Title</Th>
          <Th>Date Added</Th>
          <Th>
            <AiOutlineClockCircle />
          </Th>
        </Thead>
        <Tbody>
          {songs.map((song, ind) => {
            return (
              <Tr
                onClick={() => handlePlay(song)}
                sx={{
                  transition: "350ms",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.075)",
                  },
                  cursor: "pointer",
                }}
                key={song.id}
              >
                <Td>{ind + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatSongTime(song.duration)}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongTable;
