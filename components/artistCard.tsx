import { Box, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { FC } from "react";
import type { Artist } from "../lib/prisma";

const ArtistCard: FC<{ artist: Artist }> = ({ artist }) => {
  return (
    <Box paddingX="10px" width="20%">
      <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
        <Image src="https://placekitten.com/300/300" borderRadius="100%" />
        <Box marginTop="20px">
          <Text fontSize="large">{artist.name}</Text>
          <Text fontSize="x-small">Artist</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ArtistCard;
