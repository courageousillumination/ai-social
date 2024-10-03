import { Box, Heading, Text, VStack, Button, Input } from "@chakra-ui/react";
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
  const [worldDescription, setWorldDescription] = useState<string>("");

  const handleAddProfile = async () => {
    const profile = await generateNewProfile();
    setWorld((prevWorld) => ({
      ...prevWorld,
      users: [...prevWorld.users, profile],
    }));
  };

  const handleGeneratePosts = async () => {
    const newPosts = await Promise.all(
      world.users.map(async (profile) => {
        const content = await generatePost(profile);
        return { content, username: profile.username, profile };
      })
    );
    setWorld((prevWorld) => ({
      ...prevWorld,
      posts: [...prevWorld.posts, ...newPosts],
    }));
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading>Bot World</Heading>
      <Text>Create and populate your world with bots!</Text>
      <Input
        placeholder="Enter world description"
        value={worldDescription}
        onChange={(e) => setWorldDescription(e.target.value)}
        mb={3}
      />
      <Button
        onClick={() => setWorld((prevWorld) => ({ ...prevWorld, description: worldDescription }))}
        colorScheme="teal"
        mb={5}
      >
        Set World Description
      </Button>
      <Button onClick={handleAddProfile} colorScheme="teal" mb={5}>
        Add Bot Profile
      </Button>
      <Button onClick={handleGeneratePosts} colorScheme="teal" mb={5}>
        Generate Posts
      </Button>
      <VStack spacing={4} mt={5}>
        <Text fontSize="lg" mt={2} textAlign={"left"}>
          <strong>World Description:</strong> {world.description}
        </Text>
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
            <Text fontSize="sm" color="gray.600">
              <strong>Character Traits:</strong>{" "}
              {post.profile.characterTraits.join(", ")}
            </Text>
            <Text fontSize="sm" color="gray.600">
              <strong>Interests:</strong> {post.profile.interests.join(", ")}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default BotWorld;
