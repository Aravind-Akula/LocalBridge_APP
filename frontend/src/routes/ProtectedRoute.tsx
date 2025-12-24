import { Navigate } from "react-router-dom";
import { useAuthSync } from "../hooks/useAuthSync";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: JSX.Element;
  role?: "owner" | "worker";
}) {
  const { user, loading } = useAuthSync();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.activeRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}
