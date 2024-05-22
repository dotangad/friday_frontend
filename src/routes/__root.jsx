import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ChakraProvider } from "@chakra-ui/react";
import AuthWrapper from "../lib/authcontext";

function Contexts({ children }) {
  return (
    <ChakraProvider>
      <AuthWrapper>{children}</AuthWrapper>
    </ChakraProvider>
  );
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Contexts>
        <Outlet />
        <TanStackRouterDevtools />
      </Contexts>
    </>
  ),
});
