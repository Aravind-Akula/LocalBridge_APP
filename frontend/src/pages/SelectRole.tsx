import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SelectRole() {
  const navigate = useNavigate();

  const selectRole = (role: "owner" | "worker") => {
    localStorage.setItem("role", role);

    if (role === "owner") {
      navigate("/owner/dashboard");
    } else {
      navigate("/worker/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 space-y-6 bg-white border rounded-lg shadow text-center">
        {/* App Name */}
        <h1 className="text-2xl font-bold">Choose Your Role</h1>

        <p className="text-gray-600">
          How do you want to use LocalBridge?
        </p>

        {/* Owner */}
        <Button
          className="w-full py-6 text-lg"
          onClick={() => selectRole("owner")}
        >
          I Want to Offer Work
        </Button>

        {/* Worker */}
        <Button
          variant="outline"
          className="w-full py-6 text-lg"
          onClick={() => selectRole("worker")}
        >
          I Am Looking for Work
        </Button>
      </div>
    </div>
  );
}
