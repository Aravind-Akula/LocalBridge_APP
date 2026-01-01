import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

type Role = "worker" | "owner";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= INIT ROLES ================= */
  useEffect(() => {
    if (user?.roles) {
      setRoles(user.roles as Role[]);
    }
  }, [user]);

  if (!user) return null;

  /* ================= TOGGLE ROLE ================= */
  const toggleRole = (role: Role) => {
    setRoles(prev =>
      prev.includes(role)
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  /* ================= GO BACK ================= */
  const goBack = () => {
    if (user.activeRole === "owner") {
      navigate("/owner/dashboard");
    } else {
      navigate("/worker/dashboard");
    }
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    setError("");

    if (roles.length === 0) {
      setError("At least one role must be selected");
      return;
    }

    setLoading(true);

    // ✅ Ensure activeRole is always valid
    const activeRole: Role =
      roles.includes(user.activeRole as Role)
        ? (user.activeRole as Role)
        : roles[0];

    try {
      await updateDoc(doc(db, "users", user.uid), {
        roles,
        activeRole,
      });

      // ✅ Update auth state
      setUser({
        ...user,
        roles,
        activeRole,
      });

      // ✅ FIX 2: Auto redirect after save
      if (activeRole === "owner") {
        navigate("/owner/dashboard", { replace: true });
      } else {
        navigate("/worker/dashboard", { replace: true });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow w-full max-w-md p-6 space-y-6">

        <h2 className="text-xl font-semibold text-center">Profile</h2>

        {/* BASIC INFO */}
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{user.phone}</p>
        </div>

        {/* ROLE SELECTION */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Your Roles</p>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={roles.includes("worker")}
              onChange={() => toggleRole("worker")}
            />
            <span>Worker (Find jobs)</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={roles.includes("owner")}
              onChange={() => toggleRole("owner")}
            />
            <span>Owner (Post jobs)</span>
          </label>

          <p className="text-xs text-gray-500">
            Selecting both roles enables role switching from the top bar.
          </p>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          {/* FIX 1: Back button */}
          <Button
            variant="outline"
            className="w-1/2"
            onClick={goBack}
            disabled={loading}
          >
            Back
          </Button>

          <Button
            className="w-1/2"
            onClick={saveProfile}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
