import { Box, Heading, Button, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yqaneohnjibciexyzdxg.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxYW5lb2huamliY2lleHl6ZHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc3MjExMTEsImV4cCI6MjA0MzI5NzExMX0.KVvypEQyr6ly-HgAXOYa1_q25S6gd-4uIMwtzAyG1pg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) {
      alert("Error signing up with Google: " + error.message);
    }
  };

  const handleSignupWithEmail = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      alert("Error signing up: " + error.message);
    } else {
      alert("Signup successful! Please check your email to confirm your account.");
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
        <Button colorScheme="blue" onClick={handleSignupWithGoogle}>
          Signup with Google
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;
