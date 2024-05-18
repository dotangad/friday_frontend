import { Button } from "@chakra-ui/react";
import { generateRandomString, persistOauthState } from "../lib/auth";

function LoginWithGoogle() {
  const handleRedirect = () => {
    const authurl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    const oauthState = generateRandomString(20);
    persistOauthState(oauthState);

    const params = {
      client_id:
        "424374045946-aju7auoehrj90l8rfiugl969bcodui97.apps.googleusercontent.com",
      redirect_uri: "http://localhost:5173/auth/google/cb",
      response_type: "token",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
      state: oauthState,
    };

    Object.entries(params).forEach(([param, val]) =>
      authurl.searchParams.set(param, val),
    );

    window.location = authurl.toString();
  };

  return <Button onClick={handleRedirect}>Login with Google</Button>;
}

export default LoginWithGoogle;
