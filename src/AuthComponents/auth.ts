export function getUserFromToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));

    return getDisplayName(decoded.sub);
  } catch (e) {
    return null;
  }
}

export function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.role;
}

export function getDisplayName(email: string) {
  const username = email.split("@")[0];

  return username;
}
