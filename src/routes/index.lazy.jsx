import { useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useToast, Flex, Box, Button } from "@chakra-ui/react";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { AuthContext } from "../lib/authcontext";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { token, user, logout } = useContext(AuthContext);
  const toast = useToast();

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
    >
      {!token && <LoginWithGoogle />}
      {token && (
        <>
          <pre style={{ width: "100vw", overflowX: "auto" }}>
            {JSON.stringify({ user, token }, null, 2)}
          </pre>
          <Flex justify="center" alignItems="center" gap={4} my={6}>
            <Button onMouseDown={() => logout()}>Logout</Button>
            <Button
              onMouseDown={() =>
                navigator.clipboard.writeText(token).then(() =>
                  toast({
                    title: "Token copied to clipboard",
                    status: "success",
                  }),
                )
              }
            >
              Copy token
            </Button>
          </Flex>
        </>
      )}
    </Box>
  );
}
