import { useSearchParams, Navigate } from "react-router-dom";
import JobList from "./JobList";
import { useAuthSync } from "../../hooks/useAuthSync";

export default function WorkerDashboard() {
  const { user, loading } = useAuthSync();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search")?.toLowerCase() || "";

  /* ⏳ Wait for Firestore + localStorage sync */
  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading dashboard…
      </div>
    );
  }

  /* 🔒 Safety guard */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* 🔁 Role protection */
  if (user.activeRole !== "worker") {
    return <Navigate to="/owner/dashboard" replace />;
  }

  return <JobList search={search} />;
}
