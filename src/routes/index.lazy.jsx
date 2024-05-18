import { createLazyFileRoute } from "@tanstack/react-router";
import { Box, Button } from "@chakra-ui/react";
import LoginWithGoogle from "../components/LoginWithGoogle";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LoginWithGoogle />
    </Box>
  );
}

