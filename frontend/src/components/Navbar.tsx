import { useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { User, Check } from "lucide-react";
import { updateActiveRole } from "../firebase/userService";
import { useAuthSync } from "../hooks/useAuthSync";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, loading } = useAuthSync();
  const [query, setQuery] = useState("");

  // ⛔ Prevent rendering before auth sync completes
  if (loading) return null;

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  /* ================= ROLE SWITCH ================= */
  const switchRole = async (role: "owner" | "worker") => {
    if (!user) return;

    await updateActiveRole(user.uid, role);

    const updatedUser = {
      ...user,
      activeRole: role,
    };

    localStorage.setItem("auth", JSON.stringify(updatedUser));

    navigate(
      role === "worker"
        ? "/worker/dashboard"
        : "/owner/dashboard"
    );
  };

  /* ================= SEARCH ================= */
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!query.trim()) return;

    if (!user) {
      navigate("/login");
      return;
    }

    const base =
      user.activeRole === "worker"
        ? "/worker/dashboard"
        : "/owner/dashboard";

    navigate(`${base}?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/LocalBridge_Favicon.png"
            alt="LocalBridge"
            className="h-8"
          />
          <span className="font-bold text-lg text-indigo-600">
            Local Bridge
          </span>
        </div>

        {/* SEARCH (only when logged in) */}
        {user && (
          <div className="hidden md:block w-[360px]">
            <Input
              placeholder="Search services (Plumbing, Farming…)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        )}

        {/* RIGHT */}
        {!user ? (
          <button
            className="font-medium hover:text-indigo-600"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 ring-1 ring-indigo-200 transition">
                <User className="w-6 h-6 text-indigo-600" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              {/* PROFILE */}
              <div className="px-3 py-2 text-sm border-b">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.phone}</p>
              </div>

              {/* ROLE SWITCH */}
              <div className="py-1">
                {user.roles.includes("owner") && (
                  <DropdownMenuItem
                    onClick={() => switchRole("owner")}
                    disabled={user.activeRole === "owner"}
                    className="flex justify-between"
                  >
                    Service Seeker
                    {user.activeRole === "owner" && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </DropdownMenuItem>
                )}

                {user.roles.includes("worker") && (
                  <DropdownMenuItem
                    onClick={() => switchRole("worker")}
                    disabled={user.activeRole === "worker"}
                    className="flex justify-between"
                  >
                    Worker
                    {user.activeRole === "worker" && (
                      <Check className="w-4 h-4 text-green-600" />
                    )}
                  </DropdownMenuItem>
                )}
              </div>

              <div className="border-t my-1" />

              {/* DASHBOARD */}
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    user.activeRole === "worker"
                      ? "/worker/dashboard"
                      : "/owner/dashboard"
                  )
                }
              >
                Go to Dashboard
              </DropdownMenuItem>

              {/* LOGOUT */}
              <DropdownMenuItem
                className="text-red-500"
                onClick={logout}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
