import { useState, useEffect, createContext } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export const AuthContext = createContext({
  loading: true,
  token: false,
  user: false,
  refreshToken: async () => false,
  authenticateWithGoogleToken: async () => false,
  logout: async () => false,
});

export default function AuthWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(false);

  // TODO:
  // --> check localstorage for token
  // --> check validity of token (/api/auth/me)
  // --> save valid user object to context

  useEffect(() => {
    const lsToken = window.localStorage.getItem("friday__apitoken");
    if (!lsToken) {
      // TODO: invalidate react query cachce
      setLoading(false);
      setToken(false);
      setUser(false);
      return;
    }

    (async function () {
      console.log(lsToken);
      const meReq = await fetch(`${import.meta.env.VITE_API_URL}/auth/me/`, {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${lsToken}`,
        }),
      });

      if (meReq.status !== 200) {
        // TODO: invalidate react query cachce
        setLoading(false);
        setToken(false);
        setUser(false);
        return;
      }

      const { user } = await meReq.json();
      setUser(user);
      setToken(lsToken);
      setLoading(false);
    })();

    return;
  }, []);

  const refreshToken = async () => {};

  const authenticateWithGoogleToken = async (googleToken) => {
    setLoading(true);
    const req = await fetch(`${import.meta.env.VITE_API_URL}/auth/google/`, {
      method: "POST",
      body: JSON.stringify({ access_token: googleToken }),
    });

    if (req.status !== 200) {
      setLoading(false);
      console.log(req);
      // TODO: handle errors
      return;
    }

    const { user, token } = await req.json();
    window.localStorage.setItem("friday__apitoken", token);
    setUser(user);
    setToken(token);

    setLoading(false);
    return;
  };

  const logout = async () => {
    setUser(false);
    setToken(false);
    window.localStorage.removeItem("friday__apitoken");
  };

  return (
    <AuthContext.Provider
      value={{
        testing: "elllo",
        loading,
        token,
        user,
        refreshToken,
        authenticateWithGoogleToken,
        logout,
      }}
    >
      {loading ? (
        <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">
          <Spinner size="xl"></Spinner>
        </Flex>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
