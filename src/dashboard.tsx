import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPosts, Post } from "./api/posts";

function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return loading ? (
    <Text>Loading...</Text>
    <Box textAlign="center" p={5}>
      <Heading>Dashboard</Heading>
      <Text>Welcome to your dashboard!</Text>
      <VStack spacing={4} mt={5}>
        {posts.map((post) => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px">
            <Text>{post.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default Dashboard;
