// src/utils/navigation.ts

export function navigateByAuth(navigate: any) {
  const raw = localStorage.getItem("auth");

  if (!raw) {
    navigate("/login");
    return;
  }

  const user = JSON.parse(raw);

  /**
   * EXPECTED AUTH SHAPE
   * {
   *   uid,
   *   name,
   *   phone,
   *   roles: ["owner", "worker"],
   *   activeRole: "owner" | "worker"
   * }
   */

  // 🔐 If roles not created yet → profile incomplete
  if (!user.roles || user.roles.length === 0) {
    navigate("/create-profile");
    return;
  }

  // 🧠 AUTO-SELECT ROLE if missing (CRITICAL FIX)
  if (!user.activeRole) {
    user.activeRole = user.roles[0];
    localStorage.setItem("auth", JSON.stringify(user));
  }

  // 🚀 Route by active role
  if (user.activeRole === "worker") {
    navigate("/worker/dashboard");
  } else {
    navigate("/owner/dashboard");
  }
}

/**
 * Optional helper (used for logo click / Get Started)
 */
export function goToApp(navigate: any) {
  navigateByAuth(navigate);
}
