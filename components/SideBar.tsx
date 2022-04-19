import NextImage from "next/image";
import Link from "next/link";

import {
  Box,
  LinkBox,
  LinkOverlay,
  ListItem,
  ListIcon,
  List,
  Divider,
  Center,
  Text,
} from "@chakra-ui/layout";

import {
  MdPlaylistAdd,
  MdFavorite,
  MdSearch,
  MdHome,
  MdLibraryMusic,
} from "react-icons/md";
import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const MusicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/createplaylist",
  },
  {
    name: "Favorite Playlist",
    icon: MdFavorite,
    route: "/favorite",
  },
];

const SideBar = () => {
  const { playlists } = usePlaylist();
  return (
    <Box width="100%" height="100%" bg="black" paddingX="4px" color="gray">
      <Center paddingY="1rem">
        <NextImage src="/logo.svg" height={50} width={181} />
      </Center>
      <Box>
        <List spacing={2}>
          {navMenu.map((menu) => (
            <ListItem paddingX="1.5rem" fontSize="1rem" key={menu.name}>
              <LinkBox>
                <Link href={menu.route} passHref>
                  <LinkOverlay display="flex" sx={{ alignItems: "center" }}>
                    <ListIcon
                      as={menu.icon}
                      color="white"
                      marginRight=" 1rem"
                    />
                    <p>{menu.name}</p>
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
        <List marginTop="2rem" spacing={2}>
          {MusicMenu.map((menu) => (
            <ListItem paddingX="1rem" fontSize="1rem" key={menu.name}>
              <LinkBox>
                <Link href={menu.route} passHref>
                  <LinkOverlay display="flex" sx={{ alignItems: "center" }}>
                    <ListIcon
                      as={menu.icon}
                      color="white"
                      marginRight=" 1rem"
                    />
                    <p>{menu.name}</p>
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          ))}
        </List>
        <Center marginY="1rem">
          <Divider width="80%" color="gray.800" />
        </Center>
      </Box>
      <Box height="calc( 100vh - 370px )" paddingX="1rem" overflowY="auto">
        {playlists.map((_playlist) => {
          return (
            <LinkBox key={_playlist.id}>
              <Link
                href={{
                  pathname: "/playlist/[id]",
                  query: { id: _playlist.id },
                }}
                passHref
              >
                <LinkOverlay>
                  <Text>{_playlist?.name}</Text>
                </LinkOverlay>
              </Link>
            </LinkBox>
          );
        })}
      </Box>
    </Box>
  );
};

export default SideBar;
