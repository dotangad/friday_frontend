import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import AuthWrapper from "../lib/authcontext";

const theme = extendTheme({
  colors: {
    pPurple: {
      dark: "#850F8D",
      light: "#C7C3E2",
    }
  },
  fonts: {
    yatra: "'Yatra One', system-ui",
    body: "'Open Sans', system-ui",
    display: "'Playfair Display', system-ui",
  },
});

const queryClient = new QueryClient();

function Contexts({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AuthWrapper>{children}</AuthWrapper>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: () => (
    <>
      <Contexts>
        <Box minW="100vw" minH="100vh" bg="gray.100">
          <Outlet />
        </Box>
        <TanStackRouterDevtools />
      </Contexts>
    </>
  ),
});
