import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import prisma from "../lib/prisma";
import GradientLayout from "../components/layouts/gradient.layout";

const Home = ({ artists }) => {
  return (
    <GradientLayout
      color="gray"
      subtitle="Profile"
      title="Shivam Kumar"
      description="10 public playlists"
      image="/me.png"
      roundImage
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="medium">only visible to you</Text>
        </Box>
        <Flex gap="20px">
          {artists.map((artist) => (
            <Box bg="gray.900" borderRadius="4px" padding="15px" width="15%">
              <Image
                src="https://placekitten.com/300/300"
                borderRadius="100%"
              />
              <Box marginTop="20px">
                <Text fontSize="large">{artist.name}</Text>
                <Text fontSize="x-small">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists,
    },
  };
};

export default Home;
