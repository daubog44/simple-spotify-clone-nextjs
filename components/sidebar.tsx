import Image from "next/image";
import { Box, List, Divider } from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import MenuItem from "./menuItem";
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

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

export type menuItem = typeof musicMenu[0];

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
      overflow="hidden"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image src="/logo.svg" width={120} height={60} />
        </Box>
        <Box marginBottom="10px">
          <List spacing={2}>
            {navMenu.map((menu) => (
              <MenuItem item={menu} key={menu.name} />
            ))}
          </List>
        </Box>
        <Box marginTop="10px">
          <List spacing={2}>
            {musicMenu.map((item) => (
              <MenuItem item={item} key={item.name} />
            ))}
          </List>
        </Box>
        <Divider color="gray.600" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists.map((playlist) => (
              <MenuItem item={playlist} key={playlist.id} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
