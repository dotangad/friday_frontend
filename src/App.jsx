import { ChakraProvider } from "@chakra-ui/react";
import { Button, Box } from "@chakra-ui/react";

function Contexts({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

function App() {
  return (
    <>
      <Contexts>
        <Button>Login with Google</Button>
      </Contexts>
    </>
  );
}

export default App;
