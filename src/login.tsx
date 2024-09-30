import { Box, Heading, Button, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "./supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      alert("Error logging in with Google: " + error.message);
    }
  };

  const handleLoginWithEmail = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert("Error logging in: " + error.message);
    } else {
      alert("Logged in successfully!");
    }
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading>Login Page</Heading>
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
        <Button colorScheme="teal" onClick={handleLoginWithEmail}>
          Login with Email
        </Button>
        <Button colorScheme="blue" onClick={handleLoginWithGoogle}>
          Login with Google
        </Button>
      </VStack>
    </Box>
  );
}

export default Login;
