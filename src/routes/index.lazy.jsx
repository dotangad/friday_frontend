import { useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Flex, Text, Box, Input, Button, Skeleton } from "@chakra-ui/react";
import { AuthContext, EnsureAuthenticated } from "../lib/authcontext";
import fetchDocuments from "../lib/documents";
import Header from "../components/Header";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function QueryDocuments() {
  const { token } = useContext(AuthContext);
  const { data, isLoading, error } = useQuery({
    queryKey: ["documents.initial"],
    queryFn: fetchDocuments(token, {
      limit: 50
    }),
  });

  return (
    <Box>
      <Flex alignItems="center" gap={3} mt={12}>
        <Input type="text" placeholder="Query here" bg="white" />
        <Button bg="purple.500" color="white" _hover={{ bg: "purple.700" }}>
          GET
        </Button>
      </Flex>
      {isLoading ? (
        <Flex flexDir="column" gap={2} my={6}>
          {Array(10).fill(0).map((_, i) => (
            <Skeleton key={i} height="45px" />
          ))}
        </Flex>
      ) : (
        <Box my={6} overflow="auto">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
}

function Index() {
  return (
    <Box>
      <Header />
      <Box maxW={"800px"} mx="auto" my={8}>
        <Text fontFamily="yatra" fontSize="4xl" fontWeight={400}>Welcome!</Text>
        <Text fontSize="lg">
          पarcha is a knowledge management app for the common man. It keeps your data in your hands and provides near infinte customizability through the extension engine. It's also open source!
        </Text>
      </Box>
      <EnsureAuthenticated unauthenticated={() => <></>}>
        <Box maxW={"800px"} mx="auto" my={8}>
          <QueryDocuments />
        </Box>
      </EnsureAuthenticated>
    </Box>
  );
}