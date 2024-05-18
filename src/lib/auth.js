export function generateRandomString(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let final = "";

  for (let i = 0; i < length; i++) {
    final += chars[Math.floor(Math.random() * (chars.length + 1))];
  }

  return final;
}

export function persistOauthState(state) {
  localStorage.setItem("friday__google_oauth_state", state);
}

export function compareOauthState(state, clean) {
  const original = localStorage.getItem("friday__google_oauth_state");
  if (clean) localStorage.removeItem("friday__google_oauth_state");
  if (!original) {
    throw new Error("No previous state to compare against");
  }

  if (original === state) {
    return true;
  }

  return false;
}
