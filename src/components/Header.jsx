import { useContext } from "react";
import { Text, Flex, Image } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router"
import { AuthContext, EnsureAuthenticated } from "../lib/authcontext";
import LoginWithGoogle from "./LoginWithGoogle";

export default function Header() {
  const { token, user } = useContext(AuthContext);

  return (
    <Flex justifyContent="space-between" alignItems="center" pt={8} maxW="800px" w="100%" mx="auto">
      <Flex justifyContent="center" alignItems="center" gap={4}>
        {/* <Image src="/logo256-2.png" h={8} w={8} /> */}
        <Text fontSize="2xl" fontWeight="bold" fontFamily="yatra"><Text color="pPurple.dark" display="inline">प</Text>archa</Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        {token ? (
          <Link to="/auth">
            <Image src={user.picture} h={10} w={10} rounded="full" />
          </Link>
        ) : (
          <LoginWithGoogle />
        )}
      </Flex>
    </Flex>
  );
}