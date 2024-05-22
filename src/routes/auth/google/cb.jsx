import { createFileRoute } from "@tanstack/react-router";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../lib/authcontext";

export const Route = createFileRoute("/auth/google/cb")({
  component: GoogleCB,
});

function GoogleCB() {
  const url = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = url.get("access_token");
  const { authenticateWithGoogleToken, loading, token, user } =
    useContext(AuthContext);

  useEffect(() => {
    authenticateWithGoogleToken(accessToken);
    console.log("hello");
  }, [accessToken]);

  return <div>{JSON.stringify({ loading, token, user })}</div>;
}
