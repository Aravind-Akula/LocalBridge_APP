import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { User, LogOut, Repeat, Search } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, switchRole, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* ================= SEARCH HANDLER ================= */
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || !user) return;

    const q = query.toLowerCase().trim();

    if (!q) return;

    // Keywords
    const workerKeywords = ["worker", "job", "find", "work"];
    const ownerKeywords = ["owner", "post", "hire", "manage"];

    const isWorkerIntent = workerKeywords.some(k => q.includes(k));
    const isOwnerIntent = ownerKeywords.some(k => q.includes(k));

    if (isWorkerIntent) {
      navigate("/worker/dashboard");
    } else if (isOwnerIntent) {
      navigate("/owner/dashboard");
    } else {
      // fallback → current role dashboard
      navigate(
        user.activeRole === "worker"
          ? "/worker/dashboard"
          : "/owner/dashboard"
      );
    }

    setQuery("");
  };

  /* ================= NOT LOGGED IN ================= */
  if (!user) {
    return (
      <header className="h-16 px-6 border-b flex justify-between items-center bg-white">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
            L
          </div>
          <span className="font-semibold">Local Bridge</span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="text-sm font-medium text-indigo-600"
        >
          Login
        </button>
      </header>
    );
  }

  const canSwitch = user.roles?.length === 2;

  /* ================= LOGGED IN ================= */
  return (
    <header className="h-16 px-6 border-b bg-white flex items-center justify-between">
      {/* LEFT */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-9 h-9 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
          L
        </div>
        <span className="font-semibold">Local Bridge</span>
      </div>

      {/* CENTER SEARCH */}
      <div className="relative w-64 hidden md:block">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search jobs, workers, owners…"
          className="w-full pl-9 pr-3 py-1.5 text-sm border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* ROLE INDICATOR */}
        <span className="text-sm text-gray-600">
          {user.activeRole === "worker" ? "Worker Mode" : "Owner Mode"}
        </span>

        {/* ROLE SWITCH */}
        {canSwitch && (
          <button
            onClick={async () => {
              await switchRole();
              navigate(
                user.activeRole === "worker"
                  ? "/owner/dashboard"
                  : "/worker/dashboard",
                { replace: true }
              );
            }}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50"
          >
            <Repeat size={14} />
            Switch
          </button>
        )}

        {/* PROFILE */}
        <div ref={ref} className="relative">
          <button
            onClick={() => setOpen(p => !p)}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <User size={18} />
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow z-50">
              <div className="px-4 py-3 border-b">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.phone}</p>
              </div>

              <button
                onClick={() => {
                  navigate("/profile");
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/login", { replace: true });
                }}
                className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
