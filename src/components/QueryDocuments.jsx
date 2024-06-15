import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Flex, Box, Input, Button, Skeleton } from "@chakra-ui/react";
import { AuthContext } from "../lib/authcontext";
import fetchDocuments from "../lib/documents";

export default function QueryDocuments() {
  const { token } = useContext(AuthContext);
  // FIXME: handle error
  const { data, isLoading } = useQuery({
    queryKey: ["documents.initial"],
    queryFn: fetchDocuments(token, {
      limit: 50
    }),
  });

  return (
    <Box>
      <Flex alignItems="center" gap={3}>
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