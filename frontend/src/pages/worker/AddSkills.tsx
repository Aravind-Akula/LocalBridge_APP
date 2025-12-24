import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Button } from "../../components/ui/button";

/* ================= SKILLS CATALOG ================= */
const SKILLS: Record<string, string[]> = {
  farming: [
    "Paddy Cropping",
    "Cotton Cropping",
    "Fertilizer Spreading",
    "Removing Weeds",
    "Tractor Service",
    "Harvesting",
    "Seed Planting",
    "Vegetable Picking",
    "Cotton Picking",
    "Corn Seeding",
    "Sugarcane Cutting",
    "Other",
  ],
  home: [
    "Plumbing",
    "Electrician",
    "Carpentry",
    "Cleaning",
    "Appliance Repair",
    "Painting",
    "Other",
  ],
  construction: [
    "Mason",
    "Painter",
    "Helper",
    "Welder",
    "Carpenter",
    "Electrician",
    "Other",
  ],
  events: [
    "Tent House",
    "Catering",
    "Lighting",
    "Decoration",
    "Sound System",
    "Photography",
    "Other",
  ],
};

/* ================= SAFE DEFAULT ================= */
const EMPTY_SKILLS = {
  farming: [],
  home: [],
  construction: [],
  events: [],
};

/* ================= NORMALIZER ================= */
function normalizeSkills(data: any) {
  return {
    farming: Array.isArray(data?.farming) ? data.farming : [],
    home: Array.isArray(data?.home) ? data.home : [],
    construction: Array.isArray(data?.construction)
      ? data.construction
      : [],
    events: Array.isArray(data?.events) ? data.events : [],
  };
}

export default function AddSkills() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  const [selected, setSelected] =
    useState<Record<string, string[]>>(EMPTY_SKILLS);

  const [loading, setLoading] = useState(false);

  /* ================= LOAD EXISTING SKILLS ================= */
  useEffect(() => {
    const loadSkills = async () => {
      if (!auth?.uid) return;

      const snap = await getDoc(doc(db, "users", auth.uid));

      if (snap.exists()) {
        setSelected(normalizeSkills(snap.data().skills));
      } else {
        setSelected(EMPTY_SKILLS);
      }
    };

    loadSkills();
  }, [auth?.uid]);

  /* ================= TOGGLE SKILL ================= */
  const toggleSkill = (group: string, skill: string) => {
    setSelected((prev) => {
      const groupSkills = prev[group] ?? [];

      return {
        ...prev,
        [group]: groupSkills.includes(skill)
          ? groupSkills.filter((s) => s !== skill)
          : [...groupSkills, skill],
      };
    });
  };

  /* ================= SAVE SKILLS ================= */
  const saveSkills = async () => {
    if (!auth?.uid) return;

    const hasAnySkill = Object.values(selected).some(
      (arr) => arr.length > 0
    );

    if (!hasAnySkill) {
      alert("Please select at least one skill");
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(db, "users", auth.uid), {
        skills: selected,
      });

      // 🔄 update local auth (optional but good UX)
      const updatedAuth = {
        ...auth,
        skills: selected,
      };
      localStorage.setItem("auth", JSON.stringify(updatedAuth));

      alert("✅ Skills updated successfully");
      navigate("/worker/dashboard");
    } catch (err) {
      console.error("Save skills failed:", err);
      alert("❌ Failed to save skills");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div>
          <h1 className="text-2xl font-bold">Add Your Skills</h1>
          <p className="text-gray-600 mt-2">
            Select all the work you can do. This helps us match you with
            nearby jobs.
          </p>
        </div>

        {Object.entries(SKILLS).map(([group, skills]) => (
          <div key={group} className="space-y-4">
            <h2 className="text-lg font-semibold capitalize">
              {group} Services
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill) => {
                const active = selected[group]?.includes(skill);

                return (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(group, skill)}
                    className={`border rounded-lg px-4 py-2 text-sm transition text-left
                      ${
                        active
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white hover:border-indigo-400"
                      }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <Button
          className="w-full"
          onClick={saveSkills}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Skills"}
        </Button>
      </div>
    </DashboardLayout>
  );
}
