import { Navigate } from "react-router-dom";
import { useAuthSync } from "../hooks/useAuthSync";

export default function ProtectedRoute({
  role,
  children,
}: {
  role: "owner" | "worker";
  children: JSX.Element;
}) {
  const { user, loading } = useAuthSync();

  /* ⏳ WAIT — DO NOT RENDER ANYTHING YET */
  if (loading) {
    return <div className="p-6 text-gray-600">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.activeRole !== role) {
    return (
      <Navigate
        to={user.activeRole === "worker"
          ? "/worker/dashboard"
          : "/owner/dashboard"}
        replace
      />
    );
  }

  return children;
}
