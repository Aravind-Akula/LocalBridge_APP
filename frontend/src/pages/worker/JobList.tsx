import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import DashboardLayout from "../../layouts/DashboardLayout";

type Job = {
  id: string;
  title: string;
  category: string;
  description?: string;
  location: string;
  wage: number;
  workersNeeded: number;
  createdBy: {
    name: string;
    phone: string;
  };
};

interface JobListProps {
  search: string;
}

export default function JobList({ search }: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, "jobs"),
          where("status", "==", "open")
        );

        const snapshot = await getDocs(q);

        const jobList: Job[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Job, "id">),
        }));

        setJobs(jobList);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* 🔍 FILTER JOBS USING SEARCH */
  const filteredJobs = jobs.filter((job) => {
    if (!search) return true;

    return (
      job.title.toLowerCase().includes(search) ||
      job.category.toLowerCase().includes(search) ||
      job.description?.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-4 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">
          Available Jobs
        </h1>

        {loading && (
          <p className="text-gray-600">Loading jobs…</p>
        )}

        {!loading && filteredJobs.length === 0 && (
          <p className="text-gray-500">
            No jobs found for your search.
          </p>
        )}

        {!loading &&
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 bg-white space-y-2 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">
                  {job.title}
                </h2>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {job.category}
                </span>
              </div>

              {job.description && (
                <p className="text-sm text-gray-700">
                  {job.description}
                </p>
              )}

              <div className="text-sm text-gray-600">
                📍 {job.location}
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <span>
                  👷 Workers needed:{" "}
                  <b>{job.workersNeeded}</b>
                </span>
                <span>
                  💰 Wage: <b>₹{job.wage}</b>
                </span>
              </div>

              <div className="text-xs text-gray-500">
                Posted by: {job.createdBy.name}
              </div>

              <button
                className="mt-3 w-full bg-black text-white py-2 rounded hover:opacity-90"
                onClick={() =>
                  alert(
                    "Interest feature already implemented earlier"
                  )
                }
              >
                I’m Interested
              </button>
            </div>
          ))}
      </div>
    </DashboardLayout>
  );
}
