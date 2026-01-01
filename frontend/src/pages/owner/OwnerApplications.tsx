import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

export default function OwnerApplications() {
  const { user } = useAuth();
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const load = async () => {
      const q = query(
        collection(db, "applications"),
        where("ownerId", "==", user.uid)
      );

      const snap = await getDocs(q);
      setApps(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };

    load();
  }, [user]);

  const accept = async (app: any) => {
    await updateDoc(doc(db, "applications", app.id), {
      status: "accepted",
    });

    await updateDoc(doc(db, "jobs", app.jobId), {
      workersJoined: increment(1),
    });

    setApps(prev =>
      prev.map(a =>
        a.id === app.id ? { ...a, status: "accepted" } : a
      )
    );
  };

  const reject = async (app: any) => {
    await updateDoc(doc(db, "applications", app.id), {
      status: "rejected",
    });

    setApps(prev =>
      prev.map(a =>
        a.id === app.id ? { ...a, status: "rejected" } : a
      )
    );
  };

  if (loading) return <p className="p-6">Loading…</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Worker Requests</h1>

      {apps.length === 0 && (
        <p className="text-gray-500">No requests</p>
      )}

      {apps.map(app => (
        <div
          key={app.id}
          className={`rounded-xl border p-4 ${
            app.status === "accepted"
              ? "bg-green-50 border-green-200"
              : app.status === "rejected"
              ? "bg-gray-50"
              : "bg-white"
          }`}
        >
          <p className="font-medium">
            Worker: {app.workerName}
          </p>
          <p className="text-sm">
            Mobile: {app.workerPhone}
          </p>
          <p className="text-sm text-gray-500">
            Job: {app.jobTitle}
          </p>

          {app.status === "pending" && (
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => accept(app)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                Accept
              </button>
              <button
                onClick={() => reject(app)}
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
              >
                Reject
              </button>
            </div>
          )}

          {app.status === "accepted" && (
            <p className="text-green-700 text-sm mt-2">
              ✅ Accepted
            </p>
          )}

          {app.status === "rejected" && (
            <p className="text-gray-500 text-sm mt-2">
              ❌ Rejected
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
