import { Box, Heading, Text, VStack, Input, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getPosts, createPost, Post } from "./api/posts";

function Dashboard() {
  const [newPost, setNewPost] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPost(newPost);
      setNewPost("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setSubmitting(false);
    }
  };
  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <Box textAlign="center" p={5}>
      <Heading>Dashboard</Heading>
      <Text>Welcome to your dashboard!</Text>
      <Box as="form" onSubmit={handleSubmit} mb={5}>
        <Input
          placeholder="Write a new post..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          mb={3}
        />
        <Button type="submit" colorScheme="teal" isLoading={submitting}>
          Submit
        </Button>
      </Box>
      <VStack spacing={4} mt={5}>
        {posts.map((post) => (
          <Box
            key={post.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
          >
            <Text fontSize="lg" mb={2}>
              {post.content}
            </Text>
            <Text fontSize="xs" color="gray.400">
              Posted at: {new Date(post.created_at).toLocaleString()}
              Posted by: {post.profiles.first_name} {post.profiles.last_name}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default Dashboard;
