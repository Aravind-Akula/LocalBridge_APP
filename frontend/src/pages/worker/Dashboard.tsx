import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";

type Job = {
  id: string;
  title: string;
  skill: string;
  wage: string;
  location: string;
};

export default function WorkerDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const workerProfile = JSON.parse(
    localStorage.getItem("worker_profile") || "{}"
  );

  const [openToWork, setOpenToWork] = useState<boolean>(
    workerProfile.openToWork ?? true
  );

  const [jobs, setJobs] = useState<Job[]>([]);

  // MOCK JOB DATA (OWNER POSTS — TEMP)
  useEffect(() => {
    const mockJobs: Job[] = [
      {
        id: "job1",
        title: "Paddy Harvesting",
        skill: "paddy",
        wage: "₹700 / day",
        location: "Nearby village",
      },
      {
        id: "job2",
        title: "House Electrical Work",
        skill: "electrician",
        wage: "₹900 / day",
        location: "Town area",
      },
    ];

    // Filter jobs based on worker skills
    const relevantJobs = mockJobs.filter((job) =>
      workerProfile.skills?.includes(job.skill)
    );

    setJobs(relevantJobs);
  }, []);

  // Toggle open-to-work
  const toggleAvailability = () => {
    const updatedProfile = {
      ...workerProfile,
      openToWork: !openToWork,
    };

    setOpenToWork(!openToWork);
    localStorage.setItem(
      "worker_profile",
      JSON.stringify(updatedProfile)
    );
  };

  const requestJob = (jobId: string) => {
    const requests =
      JSON.parse(localStorage.getItem("requests") || "[]");

    requests.push({
      id: `req-${Date.now()}`,
      jobId,
      workerId: user.uid,
      status: "pending",
    });

    localStorage.setItem("requests", JSON.stringify(requests));
    alert("Job request sent");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          Welcome, {user.name}
        </h1>
        <p className="text-sm text-gray-600">
          {openToWork
            ? "You are open to work today"
            : "You are not available today"}
        </p>
      </div>

      {/* Availability Toggle */}
      <div
        onClick={toggleAvailability}
        className={`cursor-pointer mb-8 p-4 rounded-xl text-center font-semibold transition ${
          openToWork
            ? "bg-green-100 text-green-800"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {openToWork ? "🟢 Open to Work" : "🔴 Not Available"}
      </div>

      {/* Jobs Feed */}
      <h2 className="text-lg font-semibold mb-4">
        Available Jobs
      </h2>

      {jobs.length === 0 && (
        <p className="text-sm text-gray-500">
          No relevant jobs available right now.
        </p>
      )}

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.location}
            </p>
            <p className="text-sm mt-1">
              Wage: <strong>{job.wage}</strong>
            </p>

            <Button
              className="w-full mt-3"
              onClick={() => requestJob(job.id)}
            >
              Request Work
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
