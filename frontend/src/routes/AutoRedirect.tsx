import { Navigate } from "react-router-dom";
import { getAuthUser } from "../utils/auth";

export default function AutoRedirect() {
  const user = getAuthUser();

  if (!user) return <Navigate to="/login" replace />;
  if (!user.role) return <Navigate to="/create-profile" replace />;

  return (
    <Navigate
      to={
        user.role === "owner"
          ? "/owner/dashboard"
          : "/worker/dashboard"
      }
      replace
    />
  );
}
