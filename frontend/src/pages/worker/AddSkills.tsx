import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SKILLS = {
  farming: [
    "Paddy Cropping", "Cotton Cropping", "Fertilizer Spreading",
    "Harvesting", "Tractor Service", "Seed Planting", "Other"
  ],
  home: [
    "Plumbing", "Electrician", "Carpentry",
    "Cleaning", "Painting", "Appliance Repair", "Other"
  ],
  construction: [
    "Mason", "Painter", "Helper", "Welder", "Electrician", "Other"
  ],
  events: [
    "Tent House", "Catering", "Lighting",
    "Decoration", "Sound System", "Photography", "Other"
  ],
};

export default function AddSkills() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [openSection, setOpenSection] = useState<keyof typeof SKILLS>("farming");

  const toggleSkill = (category: string, skill: string) => {
    setSelected(prev => {
      const list = prev[category] || [];
      return {
        ...prev,
        [category]: list.includes(skill)
          ? list.filter(s => s !== skill)
          : [...list, skill],
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* 🔵 HERO */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-semibold">Add Your Skills</h1>
          <p className="text-indigo-100 mt-1">
            Select the work you can do. This helps us match you faster.
          </p>
        </div>

        {/* 🧩 SKILL SECTIONS */}
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div
            key={category}
            className="bg-white rounded-2xl shadow-sm border"
          >
            {/* Section Header */}
            <button
              onClick={() => setOpenSection(category as any)}
              className="w-full flex justify-between items-center px-6 py-4 text-left"
            >
              <h3 className="font-semibold capitalize">
                {category.replace("_", " ")} Services
              </h3>
              <span className="text-indigo-600">
                {openSection === category ? "−" : "+"}
              </span>
            </button>

            {/* Section Content */}
            {openSection === category && (
              <div className="px-6 pb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {skills.map(skill => {
                  const active = selected[category]?.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(category, skill)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition
                        ${
                          active
                            ? "bg-indigo-600 text-white border-indigo-600 shadow"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 🔒 STICKY FOOTER CTA */}
        <div className="fixed bottom-8 left-0 right-0 bg-white border-t px-4 py-3 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p className="text-sm text-gray-500">
            You can update skills anytime
          </p>
          <button
            onClick={() => navigate("/worker/dashboard")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Save & Continue
          </button>
        </div>
      </div>

    </div>
  );
}
