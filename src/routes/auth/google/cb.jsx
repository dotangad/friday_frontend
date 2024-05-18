import { createFileRoute } from "@tanstack/react-router";
import { compareOauthState } from "../../../lib/auth";

export const Route = createFileRoute("/auth/google/cb")({
  component: GoogleCB,
});

function GoogleCB() {
  const url = new URLSearchParams(window.location.hash.substring(1));

  if (!compareOauthState(url.get("state"))) {
    return <div>Invalid login, try again</div>;
  }

  const accessToken = url.get("access_token");

  return <div>{accessToken}</div>;
}

