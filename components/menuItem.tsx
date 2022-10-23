import Link from "next/link";
import { LinkBox, LinkOverlay, ListIcon, ListItem } from "@chakra-ui/layout";
import { FC } from "react";
import type { menuItem } from "./sidebar";
import type { Playlist } from "../lib/prisma";

interface MenuItemProps {
  item: menuItem | Playlist;
}

function isPlaylist(item: menuItem | Playlist): item is Playlist {
  return (item as Playlist).id !== undefined;
}

// eslint-disable-next-line no-undef
const MenuItem: FC<MenuItemProps> = (props): JSX.Element => {
  const { item } = props;
  if (isPlaylist(item))
    return (
      <ListItem paddingX="20px">
        <LinkBox>
          <Link
            href={{ pathname: "/playlists/[id]", query: { id: item.id } }}
            passHref
          >
            <LinkOverlay>{item.name}</LinkOverlay>
          </Link>
        </LinkBox>
      </ListItem>
    );

  return (
    <ListItem paddingX="20px" fontSize="16px">
      <LinkBox>
        <Link passHref href={item.route}>
          {/* passHref prop is used when it is a wrapper on a tag */}
          <LinkOverlay>
            <ListIcon as={item.icon} color="white" marginRight="20px" />
            {item.name}
          </LinkOverlay>
        </Link>
      </LinkBox>
    </ListItem>
  );
};

export default MenuItem;
