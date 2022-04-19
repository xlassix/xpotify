import { Flex, Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

const TopArtist = ({ artists }) => {
  return (
    <Box padding="2rem">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Top Artist this month
        </Text>
        <Text fontSize="small ">Only View to you</Text>
      </Box>
      <Flex gap="1rem">
        {artists.map((artist) => {
          return (
            <Box
              bg="gray.900"
              borderRadius="0.5rem"
              padding="0.75rem"
              key={artist.name}
            >
              <Image
                src="https://i1.sndcdn.com/avatars-gfDh6DyeZBpOSxGZ-mPHBTQ-t500x500.jpg"
                boxSize="150px"
                rounded="50%"
              />
              <Box padding="0.5rem">
                <Text fontWeight="bold">{artist.name}</Text>
                <Text fontSize="small">Artist</Text>
              </Box>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default TopArtist;
