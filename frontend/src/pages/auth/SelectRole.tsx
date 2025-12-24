import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  const setRole = async (role: "worker" | "owner") => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    await updateDoc(doc(db, "users", uid), { role });
    navigate(role === "worker" ? "/worker/dashboard" : "/owner/dashboard");
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <h1 className="text-xl font-bold">Register as</h1>
      <Button onClick={() => setRole("worker")}>Worker</Button>
      <Button onClick={() => setRole("owner")}>Owner</Button>
    </div>
  );
}
