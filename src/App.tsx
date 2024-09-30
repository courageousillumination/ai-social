import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Heading,
  Image,
} from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4} textAlign="center">
          Welcome to Chakra UI
        </Heading>
        <Box
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mx="auto"
        >
          <Image src="https://bit.ly/2Z4KKcF" alt="Chakra UI" />
          <Box p="6">
            <Box d="flex" alignItems="baseline">
              <Badge borderRadius="full" px="2" colorScheme="teal">
                New
              </Badge>
              <Box
                color="gray.500"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="xs"
                textTransform="uppercase"
                ml="2"
              >
                Chakra UI &bull; React
              </Box>
            </Box>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              Build accessible React apps & websites with speed
            </Box>
            <Box>
              <Button mt={4} colorScheme="teal" size="md">
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
