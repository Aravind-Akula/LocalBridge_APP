import { useEffect, useState } from "react";
import { getUserProfile } from "../firebase/userService";

export function useAuthSync() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sync = async () => {
      const authRaw = localStorage.getItem("auth");

      if (!authRaw) {
        setLoading(false);
        return;
      }

      const localUser = JSON.parse(authRaw);

      try {
        const profile = await getUserProfile(localUser.uid);

        if (profile) {
          const merged = { ...localUser, ...profile };
          localStorage.setItem("auth", JSON.stringify(merged));
          setUser(merged);
        }
      } catch (e) {
        console.error("Auth sync failed", e);
      } finally {
        setLoading(false);
      }
    };

    sync();
  }, []);

  return { user, loading };
}
