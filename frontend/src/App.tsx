import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HOME";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SelectRole from "./pages/SelectRole";

import AddSkills from "./pages/worker/AddSkills";
import WorkerDashboard from "./pages/worker/WorkerDashboard";

import OwnerDashboard from "./pages/owner/OwnerDashboard";
import PostJob from "./pages/owner/PostJob";
import OwnerApplications from "./pages/owner/OwnerApplications";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===== MAIN LAYOUT (Navbar once) ===== */}
        <Route element={<MainLayout />}>

          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* 🔐 ROLE SELECTION (AFTER LOGIN) */}

          <Route path="/select-role" element={<SelectRole />} />
          <Route path="/profile" element={<Profile />} />
          {/* Profile */}

          {/* Worker */}
          <Route
            path="/worker"
            element={
              <ProtectedRoute role="worker">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<WorkerDashboard />} />
            <Route path="add-skills" element={<AddSkills />} />
          </Route>

          {/* Owner */}
          <Route
            path="/owner"
            element={
              <ProtectedRoute role="owner">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="applications" element={<OwnerApplications />} />
            <Route path="post-job" element={<PostJob />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
