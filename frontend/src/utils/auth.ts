export function getAuthUser() {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
}

export function isLoggedIn() {
  return !!getAuthUser();
}

export function getUserRole(): "owner" | "worker" | null {
  const user = getAuthUser();
  return user?.role || null;
}

export function logout() {
  localStorage.removeItem("auth");
}
