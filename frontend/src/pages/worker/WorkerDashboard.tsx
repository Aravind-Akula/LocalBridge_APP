import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import JobCard from "../../components/jobs/JobCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/* ----------------------------------------
   Category Filter
---------------------------------------- */
const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "farming", label: "Farming" },
  { key: "home", label: "Home Services" },
  { key: "construction", label: "Construction" },
  { key: "events", label: "Events" },
];

export default function WorkerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<Record<string, any>>({});
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  /* ================= LOAD JOBS ================= */
  useEffect(() => {
    const loadJobs = async () => {
      const snap = await getDocs(collection(db, "jobs"));
      setJobs(
        snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    };

    loadJobs();
  }, []);

  /* ================= LOAD APPLICATIONS ================= */
  useEffect(() => {
    if (!user?.uid) return;

    const loadApplications = async () => {
      const snap = await getDocs(
        query(
          collection(db, "applications"),
          where("workerId", "==", user.uid)
        )
      );

      const map: Record<string, any> = {};
      snap.docs.forEach(doc => {
        const data = doc.data();
        map[data.jobId] = {
          id: doc.id,
          ...data,
        };
      });

      setApplications(map);
    };

    loadApplications();
  }, [user]);

  /* ================= APPLY FOR JOB ================= */
  const applyForJob = async (job: any) => {
    if (!user) return;
    if (job.application) return; // already applied
    if (job.status !== "open") return;

  await addDoc(collection(db, "applications"), {
    jobId: job.id,
    jobTitle: job.title,

    workerId: user.uid,
    workerName: user.name,
    workerPhone: user.phone,

    ownerId: job.ownerId,
    ownerName: job.ownerName,
    ownerPhone: job.ownerPhone,

    status: "pending",
    createdAt: serverTimestamp(),
  });


    // optimistic UI update
    setApplications(prev => ({
      ...prev,
      [job.id]: {
        status: "pending",
      },
    }));
  };

  /* ================= MERGE JOBS + APPLICATIONS ================= */
  const mergedJobs = jobs
    .map(job => ({
      ...job,
      application: applications[job.id] || null,
    }))
    .filter(job =>
      category === "all" ? true : job.category === category
    );

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* HERO */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Welcome back 👋
            </h1>
            <p className="text-indigo-100 mt-1">
              Available jobs in your area
            </p>
          </div>

          <button
            onClick={() => navigate("/worker/add-skills")}
            className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-50"
          >
            Update Skills
          </button>
        </div>

        {/* CATEGORY FILTER */}
        <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex justify-between">
            <h3 className="font-semibold">
              Filter by Category
            </h3>

            {category !== "all" && (
              <button
                onClick={() => setCategory("all")}
                className="text-sm text-indigo-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex gap-3 flex-wrap">
            {CATEGORIES.map(c => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium
                  ${
                    category === c.key
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* JOB LIST */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading jobs…
          </p>
        )}

        {!loading && mergedJobs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mergedJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onApply={applyForJob}
              />
            ))}
          </div>
        )}

        {!loading && mergedJobs.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold">
              No jobs found
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Try updating your skills
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
