import {
  MapPin,
  CalendarDays,
  Users,
  Edit,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type OwnerJobCardProps = {
  job: {
    id: string;
    title: string;
    description?: string;
    location: string;
    date?: string;
    wage?: number;
    category: string;
    status: "open" | "closed";
    interestedCount?: number;
  };
};

export default function OwnerJobCard({ job }: OwnerJobCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition p-5 space-y-4">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium capitalize">
          {job.category}
        </span>

        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            job.status === "open"
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {job.status === "open" ? "Active" : "Closed"}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold text-gray-900">
        {job.title}
      </h3>

      {/* DESCRIPTION */}
      {job.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.description}
        </p>
      )}

      {/* META */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>

        {job.date && (
          <div className="flex items-center gap-1">
            <CalendarDays className="w-4 h-4" />
            {job.date}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between pt-2">
        {/* INTEREST */}
        <div className="flex items-center gap-2 text-sm text-indigo-600 font-medium">
          <Users className="w-4 h-4" />
          {job.interestedCount ?? 0} Interested
        </div>

        {/* WAGE */}
        {job.wage && (
          <div className="text-sm font-semibold text-green-600">
            ₹ {job.wage} / day
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() =>
            navigate(`/owner/job/${job.id}/applicants`)
          }
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-medium transition"
        >
          View Applicants
        </button>

        <button
          onClick={() =>
            navigate(`/owner/job/${job.id}/edit`)
          }
          className="p-2 rounded-xl border hover:bg-gray-50 transition"
          title="Edit Job"
        >
          <Edit className="w-4 h-4 text-gray-600" />
        </button>

        {job.status === "open" && (
          <button
            onClick={() =>
              alert("Close job logic next")
            }
            className="p-2 rounded-xl border hover:bg-red-50 transition"
            title="Close Job"
          >
            <XCircle className="w-4 h-4 text-red-600" />
          </button>
        )}
      </div>
    </div>
  );
}

