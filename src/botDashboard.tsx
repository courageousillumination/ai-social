import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { generatePost } from "./bots/bot";
import { generateNewProfile } from "./bots/profile";

interface BotPosts {
  content: string;
  username: string;
}

function BotDashboard() {
  const [posts, setPosts] = useState<BotPosts[]>([]);
  const [generating, setGenerating] = useState<boolean>(false);

  const handleGeneratePost = async () => {
    setGenerating(true);
    try {
      const profile = await generateNewProfile();
      const newPost = await generatePost(profile);
      setPosts((prevPosts) => [
        { username: profile.username, content: newPost },
        ...prevPosts,
      ]);
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
            <Text fontSize="lg" mb={2} textAlign={"left"}>
              {post.content}
            </Text>
            <Box
              display="flex"
              justifyContent="space-between"
              fontSize="xs"
              color="gray.400"
            >
              <Text>{post.username}</Text>
              {/* <Text>{new Date(post.created_at).toLocaleString()}</Text> */}
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default BotDashboard;
