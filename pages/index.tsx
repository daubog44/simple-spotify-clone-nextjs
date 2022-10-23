import { Box, Flex, Text } from "@chakra-ui/layout";
import { FC } from "react";
import ArtistCard from "../components/artistCard";
import GradientLayout from "../components/gradientsLayout";
import prisma, { type Artist } from "../lib/prisma";
import { useMe } from "../lib/hooks";

const IndexPage: FC<{ artists: Artist[] }> = ({ artists }) => {
  const { user } = useMe();

  return (
    <GradientLayout
      color="purple"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} 15 public playlists`}
      image="https://frontendmasters.github.io/fullstack-app-next-website/images/profile.png"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artists This Month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <ArtistCard key={artist.name} artist={artist} />
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return { props: { artists } };
};

export default IndexPage;
