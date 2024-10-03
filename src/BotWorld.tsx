import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  Button,
  Input,
  Collapse,
  Stack,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { generatePost } from "./bots/bot";
import { generateNewProfile } from "./bots/profile";
import { World } from "./worlds/world";

function BotWorld() {
  const [world, setWorld] = useState<World>({
    description: "",
    users: [],
    posts: [],
  });

  const [isAddingProfile, setIsAddingProfile] = useState<boolean>(false);
  const [isGeneratingPosts, setIsGeneratingPosts] = useState<boolean>(false);
  const [worldDescription, setWorldDescription] = useState<string>("");
  const [loadingProfileIndex, setLoadingProfileIndex] = useState<number | null>(
    null
  );

  const handleAddProfile = async () => {
    setIsAddingProfile(true);
    try {
      const profile = await generateNewProfile(world);
      setWorld((prevWorld) => ({
        ...prevWorld,
        users: [...prevWorld.users, profile],
      }));
    } finally {
      setIsAddingProfile(false);
    }
  };

  const handleGeneratePosts = async () => {
    if (world.users.length === 0) return;
    setIsGeneratingPosts(true);
    try {
      const randomIndex = Math.floor(Math.random() * world.users.length);
      const profile = world.users[randomIndex];
      const content = await generatePost(profile);

      setWorld((prevWorld) => ({
        ...prevWorld,
        posts: [
          ...prevWorld.posts,
          { content, username: profile.username, profile },
        ],
      }));
    } finally {
      setIsGeneratingPosts(false);
    }
  };

  const handleGeneratePostForProfile = async (profileIndex: number) => {
    setLoadingProfileIndex(profileIndex);
    try {
      const profile = world.users[profileIndex];
      const content = await generatePost(profile);

      setWorld((prevWorld) => ({
        ...prevWorld,
        posts: [
          ...prevWorld.posts,
          { content, username: profile.username, profile },
        ],
      }));
    } finally {
      setLoadingProfileIndex(null);
    }
  };
  return (
    <Box>
      <Center>
        <Heading>Bot World</Heading>
      </Center>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} p={5}>
        <GridItem>
          <Box textAlign="center">
            <Stack direction="row">
              <Input
                placeholder="Enter world description"
                value={worldDescription}
                onChange={(e) => setWorldDescription(e.target.value)}
                mb={3}
              />
              <Button
                onClick={() =>
                  setWorld((prevWorld) => ({
                    ...prevWorld,
                    description: worldDescription,
                  }))
                }
                colorScheme="teal"
                mb={5}
              >
                Submit
              </Button>
            </Stack>
            <Text fontSize="lg" mt={2} textAlign={"left"}>
              <strong>World Description:</strong> {world.description}
            </Text>

            <Stack direction="row" alignItems={"center"}>
              <Text textAlign={"left"}>
                <strong>Total Users:</strong> {world.users.length}
              </Text>
              <Button
                onClick={handleAddProfile}
                colorScheme="teal"
                size="sm"
                isLoading={isAddingProfile}
              >
                Add Bot Profile
              </Button>
            </Stack>

            <VStack spacing={4} mt={5}>
              {world.users.map((user, index) => (
                <Box
                  key={index}
                  p={3}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  textAlign={"left"}
                  w={"md"}
                >
                  <Text fontSize="sm" color="gray.600">
                    <strong>Username:</strong> {user.username}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Character Traits:</strong>{" "}
                    {user.characterTraits.join(", ")}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Interests:</strong> {user.interests.join(", ")}
                  </Text>
                  <Button
                    onClick={() => handleGeneratePostForProfile(index)}
                    colorScheme="teal"
                    size="sm"
                    mt={2}
                    isLoading={loadingProfileIndex === index}
                  >
                    Generate Post
                  </Button>
                </Box>
              ))}
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Box textAlign="center">
            <Button
              onClick={handleGeneratePosts}
              colorScheme="teal"
              mt={5}
              mb={5}
              isLoading={isGeneratingPosts}
            >
              Generate Posts
            </Button>
            <VStack spacing={4} mt={5}>
              {world.posts.map((post, index) => (
                <Box
                  key={index}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  borderRadius="md"
                  w={"md"}
                >
                  <Text fontSize="lg" mt={2} textAlign={"left"}>
                    {post.content}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    <strong>Username:</strong> {post.username}
                  </Text>
                </Box>
              ))}
            </VStack>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
}

export default BotWorld;
