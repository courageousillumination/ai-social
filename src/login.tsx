import { Box, Heading, Button } from "@chakra-ui/react";

function Login() {
  return (
    <Box textAlign="center" p={5}>
      <Heading>Login Page</Heading>
      <Button colorScheme="teal" mt={4}>
        Login
      </Button>
    </Box>
  );
}

export default Login;
