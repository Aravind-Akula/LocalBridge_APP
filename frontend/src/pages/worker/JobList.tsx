import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import JobCard from "../../components/jobs/JobCard";

type Job = {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  wage: number;
};

export default function JobList({
  search,
  category,
}: {
  search: string;
  category: string;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const auth = JSON.parse(localStorage.getItem("auth") || "{}");
  const userSkills: string[] = Object.values(auth.skills || {}).flat();

  useEffect(() => {
    const fetchJobs = async () => {
      const snapshot = await getDocs(collection(db, "jobs"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Job),
      }));
      setJobs(data);
      setLoading(false);
    };

    fetchJobs();
  }, []);

  /* ================= FILTERING ================= */

  const filteredJobs = jobs.filter((job) => {
    // 1️⃣ CATEGORY FILTER
    if (category !== "All" && job.category !== category) {
      return false;
    }

    // 2️⃣ SEARCH FILTER
    if (
      search &&
      !job.title.toLowerCase().includes(search) &&
      !job.description.toLowerCase().includes(search)
    ) {
      return false;
    }

    // 3️⃣ SKILL MATCHING
    if (userSkills.length > 0) {
      const text = `${job.title} ${job.description}`.toLowerCase();
      const matched = userSkills.some((skill) =>
        text.includes(skill.toLowerCase())
      );
      return matched;
    }

    return true;
  });

  /* ================= UI ================= */

  if (loading) {
    return <p className="text-gray-500">Loading jobs…</p>;
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        ❌ No jobs match your skills right now  
        <br />
        Try updating your skills.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
