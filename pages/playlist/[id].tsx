import GradientLayout from "../../components/layouts/gradient.layout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBGColor = (id) => {
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

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={getBGColor(playlist.id)}
      roundImage={false}
      title={playlist.name}
      subtitle="Playlist"
      key={playlist.id}
      description={`${playlist.songs.length} Songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <div>Playlist</div>
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  const { id: userId } = validateToken(
    req.cookies[process.env.ACCESS_TOKEN_KEY]
  );
  const playlist = await prisma.playlist.findFirst({
    where: {
      id: parseInt(query.id, 10),
      userId,
    },
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
    props: {
      playlist,
    },
  };
};

export default Playlist;
