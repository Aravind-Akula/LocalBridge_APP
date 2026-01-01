import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useAuth } from "../../context/AuthContext";

export default function PostJob() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("farming");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [wage, setWage] = useState("");
  const [workersNeeded, setWorkersNeeded] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!user) return;

    if (!title || !location || !date || !wage || !workersNeeded) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "jobs"), {
        // Job data
        title,
        category,
        location,
        date,
        description,
        skills,
        wage: Number(wage),
        workersNeeded: Number(workersNeeded),
        workersJoined: 0,
        status: "open",

        // Owner snapshot (VERY IMPORTANT)
        ownerId: user.uid,
        ownerName: user.name,
        ownerPhone: user.phone,

        createdAt: serverTimestamp(),
      });

      navigate("/owner/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-semibold">Post a Job</h1>

      <input
        placeholder="Job title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="farming">Farming</option>
        <option value="home">Home Services</option>
        <option value="construction">Construction</option>
        <option value="events">Events</option>
      </select>

      <input
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        placeholder="Wage per day"
        value={wage}
        onChange={e => setWage(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <input
        placeholder="Workers needed"
        value={workersNeeded}
        onChange={e => setWorkersNeeded(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded"
      >
        {loading ? "Posting..." : "Post Job"}
      </button>
    </div>
  );
}
