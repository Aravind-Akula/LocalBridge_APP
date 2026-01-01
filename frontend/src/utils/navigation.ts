import type { NavigateFunction } from "react-router-dom";

/**
 * Read persisted auth snapshot written by AuthContext
 */
function getAuthSnapshot() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Used by Home page buttons:
 * - Get Started
 * - Category cards
 */
export function navigateByAuth(navigate: NavigateFunction) {
  const user = getAuthSnapshot();

  // ❌ Not logged in
  if (!user) {
    navigate("/login");
    return;
  }

  // ❌ Logged in but role not selected yet
  if (!user.activeRole) {
    navigate("/select-role");
    return;
  }

  // ✅ Go to correct dashboard
  if (user.activeRole === "worker") {
    navigate("/worker/dashboard");
  } else {
    navigate("/owner/dashboard");
  }
}

/**
 * Used by:
 * - Post a Job
 * - Find Work
 */
export function goToApp(navigate: NavigateFunction) {
  const user = getAuthSnapshot();

  if (!user) {
    navigate("/login");
    return;
  }

  if (!user.activeRole) {
    navigate("/select-role");
    return;
  }

  navigate(
    user.activeRole === "worker"
      ? "/worker/dashboard"
      : "/owner/dashboard"
  );
}
