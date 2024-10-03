import { Box, Heading, Text, VStack, Button, Input, Collapse } from "@chakra-ui/react";
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
  const [profileVisible, setProfileVisible] = useState<boolean>(false);
  const [worldDescription, setWorldDescription] = useState<string>("");

  const handleAddProfile = async () => {
    const profile = await generateNewProfile();
    setWorld((prevWorld) => ({
      ...prevWorld,
      users: [...prevWorld.users, profile],
    }));
  };

  const handleGeneratePosts = async () => {
    if (world.users.length === 0) return;

    const randomIndex = Math.floor(Math.random() * world.users.length);
    const profile = world.users[randomIndex];
    const content = await generatePost(profile);

    setWorld((prevWorld) => ({
      ...prevWorld,
      posts: [...prevWorld.posts, { content, username: profile.username, profile }],
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
      <Button
        onClick={() => setProfileVisible(!profileVisible)}
        colorScheme="teal"
        mb={5}
      >
        {profileVisible ? "Hide Users" : "Show Users"}
      </Button>
      <Collapse in={profileVisible} animateOpacity>
        <VStack spacing={4} mt={5}>
          {world.users.map((user, index) => (
            <Box
              key={index}
              p={3}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              w={"md"}
            >
              <Text fontSize="sm" color="gray.600">
                <strong>Username:</strong> {user.username}
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Character Traits:</strong> {user.characterTraits.join(", ")}
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Interests:</strong> {user.interests.join(", ")}
              </Text>
            </Box>
          ))}
        </VStack>
      </Collapse>
      <Button onClick={handleGeneratePosts} colorScheme="teal" mt={5} mb={5}>
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
