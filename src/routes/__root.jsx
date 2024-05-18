import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ChakraProvider } from "@chakra-ui/react";

function Contexts({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
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

