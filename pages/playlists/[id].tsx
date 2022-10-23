import { GetServerSideProps } from "next";
import { FC } from "react";
import GradientLayout from "../../components/gradientsLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma, {
  type Song,
  type Playlist as PlaylistType,
} from "../../lib/prisma";

type playlistProp = PlaylistType & {
  songs: (Song & {
    artist: {
      id: number;
      name: string;
    };
  })[];
};

interface PlaylistFCProp {
  playlist: playlistProp;
}

const getBGColor = (id: number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist: FC<PlaylistFCProp> = ({ playlist }) => {
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongsTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let user;

  try {
    user = validateToken(req.cookies.CLONE_SPOTYFY_ACESS_TOKEN);
  } catch (error) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: { id: +query.id, userId: user.id },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: { playlist },
  };
};

export default Playlist;
