import React from "react";

/* ----------------------------------------
   Category Meta
---------------------------------------- */
const CATEGORY_META: Record<
  string,
  { icon: string; label: string }
> = {
  farming: { icon: "🌾", label: "Farming" },
  construction: { icon: "🏗️", label: "Construction" },
  home: { icon: "🏠", label: "Home Services" },
  events: { icon: "🎉", label: "Events" },
};

/* ----------------------------------------
   Types
---------------------------------------- */
type Application = {
  status: "pending" | "accepted" | "rejected";
  ownerName?: string;
  ownerPhone?: string;
};

type Job = {
  id: string;
  title: string;
  description?: string;
  category: string;
  location: string;
  date: string;
  wage: number | string;
  status: "open" | "closed";
  application?: Application | null;
};

interface JobCardProps {
  job: Job;
  onApply?: (job: Job) => void;
}

/* ----------------------------------------
   Component
---------------------------------------- */
export default function JobCard({ job, onApply }: JobCardProps) {
  const meta =
    CATEGORY_META[job.category] ??
    { icon: "💼", label: "Job" };

  const isClosed = job.status !== "open";
  const app = job.application;

  return (
    <div
      className={`bg-white rounded-2xl border p-4 flex flex-col gap-3 transition
        ${isClosed ? "opacity-60" : "shadow-sm hover:shadow-md"}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-3">
          <span className="text-2xl leading-none">{meta.icon}</span>
          {job.title}
        </h3>

        {isClosed ? (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
            Closed
          </span>
        ) : (
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
            {meta.label}
          </span>
        )}
      </div>

      {/* Description */}
      {job.description && (
        <p className="text-sm text-gray-600 line-clamp-2">
          {job.description}
        </p>
      )}

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>📍 {job.location}</span>
        <span>📅 {job.date}</span>
      </div>

      {/* Wage */}
      <div className="text-sm font-medium text-green-600">
        💰 ₹ {job.wage} / day
      </div>

      {/* CTA / STATUS */}
      {isClosed ? (
        <div className="mt-2 text-center text-xs text-gray-500 border rounded-lg py-1.5">
          Job Closed
        </div>
      ) : app?.status === "accepted" ? (
        <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm">
          <p className="font-medium text-green-700">
            ✅ Accepted
          </p>

          <p className="mt-1">
            <strong>Owner:</strong> {app.ownerName}
          </p>

          <p>
            <strong>Mobile:</strong>{" "}
            <a
              href={`tel:${app.ownerPhone}`}
              className="text-indigo-600 font-medium"
            >
              {app.ownerPhone}
            </a>
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Please contact before reporting.
          </p>
        </div>
      ) : app?.status === "pending" ? (
        <button
          disabled
          className="mt-2 rounded-lg py-2 text-sm font-medium
            bg-gray-100 text-gray-500 cursor-not-allowed"
        >
          Applied ✓
        </button>
      ) : (
        <button
          onClick={() => onApply?.(job)}
          className="mt-2 rounded-lg py-2 text-sm font-medium
            bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          I’m Interested
        </button>
      )}
    </div>
  );
}
