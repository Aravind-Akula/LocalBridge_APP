import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config"; // ✅ FIXED
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

export default function SelectRole() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const safeRoles = Array.isArray(user.roles) ? user.roles : [];

  const [worker, setWorker] = useState(safeRoles.includes("worker"));
  const [owner, setOwner] = useState(safeRoles.includes("owner"));

  const save = async () => {
    const roles = [
      ...(worker ? ["worker"] : []),
      ...(owner ? ["owner"] : []),
    ];

    if (roles.length === 0) return;

    // ✅ choose activeRole safely
    const activeRole =
      user.activeRole && roles.includes(user.activeRole)
        ? user.activeRole
        : roles[0];

    await updateDoc(doc(db, "users", user.uid), {
      roles,
      activeRole,
    });

    setUser({
      ...user,
      roles,
      activeRole,
    });

    navigate(
      activeRole === "worker"
        ? "/worker/dashboard"
        : "/owner/dashboard",
      { replace: true }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Choose your roles
        </h2>

        <label className="flex items-center gap-2 mb-2">
          <input
            type="checkbox"
            checked={worker}
            onChange={(e) => setWorker(e.target.checked)}
          />
          Worker
        </label>

        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={owner}
            onChange={(e) => setOwner(e.target.checked)}
          />
          Owner
        </label>

        <Button className="w-full" onClick={save}>
          Continue
        </Button>
      </div>
    </div>
  );
}
