import { useContext } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Box, Button } from "@chakra-ui/react";
import LoginWithGoogle from "../components/LoginWithGoogle";
import { AuthContext } from "../lib/authcontext";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { token, user } = useContext(AuthContext);

  // TODO: oooh time to build ui
  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {!token && <LoginWithGoogle />}
      {token && (
        <pre style={{ width: "100vw", overflowX: "auto" }}>
          {JSON.stringify({ user }, null, 2)}
        </pre>
      )}
    </Box>
  );
}
