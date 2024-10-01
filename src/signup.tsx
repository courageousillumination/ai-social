import { Box, Heading, Button, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { supabase } from "./supabaseClient";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupWithEmail = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert("Error signing up: " + error.message);
    } else {
      alert(
        "Signup successful! Please check your email to confirm your account."
      );
    }
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading>Signup Page</Heading>
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
        <Button colorScheme="teal" onClick={handleSignupWithEmail}>
          Signup with Email
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;
