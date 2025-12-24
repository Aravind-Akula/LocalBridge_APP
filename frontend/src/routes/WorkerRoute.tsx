import { Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function WorkerRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const role = getUserRole();

  if (role !== "worker") {
    return <Navigate to="/owner/dashboard" replace />;
  }

  return children;
}
