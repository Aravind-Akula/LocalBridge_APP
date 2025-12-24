import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function OwnerRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const role = getUserRole();

  if (role !== "owner") {
    return <Navigate to="/worker/dashboard" replace />;
  }

  return children;
}
