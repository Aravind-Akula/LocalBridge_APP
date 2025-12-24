import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Button } from "../../components/ui/button";
import { useAuthSync } from "../../hooks/useAuthSync";

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  const { user, loading } = useAuthSync();

  /* ⏳ Wait until Firestore + localStorage are synced */
  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-gray-600">Loading dashboard…</div>
      </DashboardLayout>
    );
  }

  /* 🔒 Not logged in */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /* 🔁 Wrong role */
  if (user.activeRole !== "owner") {
    return <Navigate to="/worker/dashboard" replace />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>

        <p className="text-gray-600">
          Post work and manage interested workers.
        </p>

        <Button
          className="w-full"
          onClick={() => navigate("/owner/post-job")}
        >
          Post New Work
        </Button>

        {/* 🔍 Search-aware placeholder (future jobs list) */}
        <div className="border rounded-lg p-6 text-center text-gray-500">
          {search
            ? `No jobs found for “${search}”`
            : "No active jobs yet"}
        </div>
      </div>
    </DashboardLayout>
  );
}
