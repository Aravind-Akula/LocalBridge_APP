import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { createUserProfile } from "../firebase/userService";

export default function CreateProfile() {
  const navigate = useNavigate();

  const authUser = JSON.parse(
    localStorage.getItem("auth") || "{}"
  );

  const [name, setName] = useState(authUser.name || "");
  const [roles, setRoles] = useState<("owner" | "worker")[]>([
    "owner",
  ]);
  const [loading, setLoading] = useState(false);

  /* ================= TOGGLE ROLE ================= */
  const toggleRole = (role: "owner" | "worker") => {
    setRoles((prev) =>
      prev.includes(role)
        ? prev.filter((r) => r !== role)
        : [...prev, role]
    );
  };

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (roles.length === 0) {
      alert("Select at least one role");
      return;
    }

    try {
      setLoading(true);

      const activeRole: "owner" | "worker" =
        roles.includes("worker") ? "worker" : "owner";

      // 🔥 Save profile in Firestore
      await createUserProfile(authUser.uid, {
        name,
        phone: authUser.phone,
        roles,
        activeRole,
        skills: {}, // worker skills will be added later
      });

      // 🔐 Update local auth
      const updatedAuth = {
        ...authUser,
        roles,
        activeRole,
      };

      localStorage.setItem(
        "auth",
        JSON.stringify(updatedAuth)
      );

      // 🚀 Redirect logic
      if (activeRole === "worker") {
        navigate("/worker/add-skills");
      } else {
        navigate("/owner/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm space-y-5">
        <h1 className="text-xl font-bold text-center">
          Create Your Profile
        </h1>

        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={roles.includes("owner")}
              onChange={() => toggleRole("owner")}
            />
            <span>Service Seeker (Owner)</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={roles.includes("worker")}
              onChange={() => toggleRole("worker")}
            />
            <span>Worker</span>
          </label>
        </div>

        <Button
          className="w-full"
          onClick={saveProfile}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </div>
    </div>
  );
}
