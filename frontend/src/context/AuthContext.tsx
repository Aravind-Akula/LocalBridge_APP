import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { updateUserRoles } from "../firebase/userService";

type User = {
  uid: string;
  name: string;
  phone: string;
  roles: string[];
  activeRole: "worker" | "owner" | null;
  skills?: Record<string, any>;
};

type AuthContextType = {
  user: User | null;
  setUser: (u: User | null) => void;
  switchRole: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, () => {
      setLoading(false);
    });
  }, []);

  const switchRole = async () => {
    if (!user || user.roles.length < 2) return;

    const next =
      user.activeRole === "worker" ? "owner" : "worker";

    await updateUserRoles(user.uid, user.roles, next);

    setUser({ ...user, activeRole: next });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, switchRole, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
