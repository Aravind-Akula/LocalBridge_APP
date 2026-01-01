import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  workersNeeded: number;
  workersJoined?: number;
  status: "open" | "filled" | "closed";
};


export default function OwnerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadJobs = async () => {
      const q = query(
        collection(db, "jobs"),
        where("ownerId", "==", user.uid)
      );
      const snap = await getDocs(q);
      setJobs(
        snap.docs.map(d => ({
          id: d.id,
          workersJoined: 0,
          ...(d.data() as any),
        }))
      );
      setLoading(false);
    };

    loadJobs();
  }, [user]);

  const updateWorkersNeeded = async (jobId: string, value: number) => {
    await updateDoc(doc(db, "jobs", jobId), {
      workersNeeded: value,
    });

    setJobs(prev =>
      prev.map(j =>
        j.id === jobId ? { ...j, workersNeeded: value } : j
      )
    );
  };

  const closeJob = async (jobId: string) => {
    await updateDoc(doc(db, "jobs", jobId), {
      status: "closed",
    });

    setJobs(prev =>
      prev.map(j =>
        j.id === jobId ? { ...j, status: "closed" } : j
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HERO */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white flex justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
            <p className="text-indigo-100">
              Manage your job listings
            </p>
          </div>
          <button
            onClick={() => navigate("/owner/post-job")}
            className="bg-white text-indigo-600 px-5 py-2 rounded-xl font-medium"
          >
            Post a Job
          </button>
        </div>

                        <button
  onClick={() => navigate("/owner/applications")}
  className="text-sm text-indigo-600"
>
  View Worker Requests
</button>

        {/* JOB GRID */}
        {loading && <p>Loading...</p>}

        {!loading && jobs.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            No jobs posted yet
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => {
              const joined = job.workersJoined ?? 0;

              return (
                            <div
                key={job.id}
                className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {job.title}
                  </h3>

                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium
                      ${
                        job.status === "open"
                          ? "bg-green-100 text-green-700"
                          : job.status === "filled"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                  >
                    {job.status.toUpperCase()}
                  </span>
                </div>

                {/* Meta */}
                <div className="text-xs text-gray-500 space-y-1">
                  <div>📍 {job.location}</div>
                  <div>📅 {job.date}</div>
                </div>

                {/* Wage + Progress */}
                <div className="flex justify-between items-center text-sm text-gray-700">
                  <div>💰 ₹ {job.wage}</div>
                  <div>👥 {job.workersJoined ?? 0} / {job.workersNeeded}</div>
                </div>

                {/* Description */}
                {job.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {job.description}
                  </p>
                )}

                {/* Action */}
                {job.status === "open" && (
                    <button
                      onClick={() => closeJob(job.id)}
                      className="
                        mt-2 w-full rounded-xl py-2 text-sm
                        border border-gray-200 text-gray-600
                        transition-all duration-200
                        hover:border-indigo-500
                        hover:text-indigo-600
                        hover:bg-indigo-50
                      "
                    >
                      Close Job
                    </button>

                )}
                            </div>

              );
            })}
          </div>
        )}



      </div>
    </div>
  );
}
