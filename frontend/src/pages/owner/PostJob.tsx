import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const SERVICE_CATEGORIES: Record<string, string[]> = {
  farming: [
    "Paddy Cropping",
    "Cotton Cropping",
    "Fertilizer spreading",
    "Removing weeds",
    "Tractor Service",
    "Harvesting",
    "Seed planting",
    "Vegitable Picking",
    "Cotton Picking",
    "corn seeding",
    "Sugarcane Cutting",
    "Other"
  ],
  home: [
    "Plumbing",
    "Electrician",
    "Carpentry",
    "Cleaning",
    "Appliance Repair",
    "Painting",
    "Other"
  ],
  construction: [
    "Mason",
    "Painter",
    "Helper",
    "Welder",
    "Carpenter",
    "Electrician",
    "Other"
  ],
  events: [
    "Tent House",
    "Catering",
    "Lighting",
    "Decoration",
    "Sound System",
    "Photography",
    "Other" 
  ],
};

export default function PostJob() {
  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem("auth") || "null");

  const [service, setService] = useState<keyof typeof SERVICE_CATEGORIES>("farming");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [wage, setWage] = useState("");
  const [workersNeeded, setWorkersNeeded] = useState("1");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const postJob = async () => {
    if (!category || !title || !location || !wage) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "jobs"), {
        title,
        description,
        service,
        category,
        location,
        wage: Number(wage),
        workersNeeded: Number(workersNeeded),
        status: "open",
        createdBy: {
          uid: auth.uid,
          name: auth.name,
          phone: auth.phone,
        },
        createdAt: serverTimestamp(),
      });

      alert("✅ Job posted successfully");
      navigate("/owner/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Post New Work</h1>

        {/* SERVICE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Service
          </label>
          <select
            value={service}
            onChange={(e) => {
              setService(e.target.value as any);
              setCategory("");
            }}
            className="w-full border rounded px-3 py-2"
          >
            <option value="farming">Farming</option>
            <option value="home">Home Services</option>
            <option value="construction">Construction</option>
            <option value="events">Events</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Work Type
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select work type</option>
            {SERVICE_CATEGORIES[service].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* TITLE */}
        <Input
          placeholder="Work title (e.g. Paddy plantation work)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* LOCATION */}
        <Input
          placeholder="Location / Village"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* WAGE + WORKERS */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            placeholder="Daily wage (₹)"
            type="number"
            value={wage}
            onChange={(e) => setWage(e.target.value)}
          />

          <Input
            placeholder="Workers needed"
            type="number"
            value={workersNeeded}
            onChange={(e) => setWorkersNeeded(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 h-24"
        />

        {/* ACTION */}
        <Button
          className="w-full"
          onClick={postJob}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Job"}
        </Button>
      </div>
    </DashboardLayout>
  );
}
