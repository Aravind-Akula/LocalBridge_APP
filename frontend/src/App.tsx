import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HOME";
import Login from "./pages/Login";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProfile from "./pages/CreateProfile";
import PostJob from "./pages/owner/PostJob";
import AddSkills from "./pages/worker/AddSkills";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ HOME as default */}
        <Route path="/" element={<Home />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />

        <Route path="/create-profile" element={<CreateProfile />} />
        {/* Protected */}
        <Route
          path="/worker/add-skills"
          element={
            <ProtectedRoute role="worker">
              <AddSkills />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute role="owner">
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker/dashboard"
          element={
            <ProtectedRoute role="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/owner/post-job"
          element={
            <ProtectedRoute role="owner">
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/worker/add-skills"
          element={
            <ProtectedRoute role="worker">
              <AddSkills />
            </ProtectedRoute>
          }
        />



      </Routes>
    </BrowserRouter>
  );
}
