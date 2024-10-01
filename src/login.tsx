import { Box, Heading, Button, Input, VStack, Divider, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "./supabaseClient";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    setIsLoading(false);
    if (error) {
      alert("Error logging in with Google: " + error.message);
    }
  };

  const handleLoginWithEmail = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Error logging in: " + error.message);
      navigate("/dashboard");
      alert("Logged in successfully!");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginWithEmail();
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading>Login Page</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} mt={4}>
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button colorScheme="teal" type="submit" isLoading={isLoading}>
            Login with Email
          </Button>
          <Link color="teal.500" href="/signup">
            Don't have an account? Sign up
          </Link>
        </VStack>
      </form>
    </Box>
  );
}

export default Login;
