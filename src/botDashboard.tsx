import { Box, Heading, Text, VStack, Button, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { generatePost } from "./bots/bot";
import { generateNewProfile } from "./bots/profile";

interface BotPosts {
  content: string;
  username: string;
}

interface BotPosts {
  content: string;
  username: string;
  profile: {
    characterTraits: string[];
    interests: string[];
  };
}

function BotDashboard() {
  const [profileVisible, setProfileVisible] = useState<boolean[]>([]);
  const [posts, setPosts] = useState<BotPosts[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleGeneratePost = async () => {
    setGenerating(true);
    try {
      const profile = await generateNewProfile();
      const content = await generatePost(profile);
      setPosts((prevPosts) => {
        const newPost = { username: profile.username, content, profile };
        setProfileVisible((prevVisible) => [false, ...prevVisible]);
        return [newPost, ...prevPosts];
      });
    } catch (error) {
      console.error("Error generating post:", error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading>Bot Dashboard</Heading>
      <Text>Generate posts for your bot!</Text>
      <Button
        onClick={handleGeneratePost}
        colorScheme="teal"
        isLoading={generating}
        mb={5}
      >
        Generate Post
      </Button>
      <VStack spacing={4} mt={5}>
        {posts.map((post, index) => (
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
            <Box
              display="flex"
              justifyContent="space-between"
              fontSize="xs"
              color="gray.400"
              alignItems={"center"}
            >
              <Text>{post.username}</Text>
              <Button
                variant={"ghost"}
                onClick={() => {
                  setProfileVisible((prevVisible) =>
                    prevVisible.map((visible, i) =>
                      i === index ? !visible : visible
                    )
                  );
                }}
                size="xs"
              >
                {profileVisible[index] ? "Hide Profile" : "Show Profile"}
              </Button>
            </Box>
            <Collapse in={profileVisible[index]} animateOpacity>
              <Box mt={2} textAlign="left">
                <Text fontSize="sm" color="gray.600">
                  <strong>Character Traits:</strong>{" "}
                  {post.profile.characterTraits.join(", ")}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  <strong>Interests:</strong>{" "}
                  {post.profile.interests.join(", ")}
                </Text>
              </Box>
            </Collapse>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default BotDashboard;
