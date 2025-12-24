import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  getUserProfile,
} from "../firebase/userService";

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");

  /* ================= SEND OTP (MOCK) ================= */
  const sendOtp = () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      alert("Enter a valid 10-digit Indian mobile number");
      return;
    }

    alert("OTP sent (use 123456)");
    setStep("otp");
  };

  /* ================= VERIFY OTP (MOCK) ================= */
  const verifyOtp = async () => {
    if (otp !== "123456") {
      alert("Invalid OTP");
      return;
    }

    const fakeUser = {
      uid: "local-uid-" + mobile,
      name,
      phone: "+91" + mobile,
    };

    // 1️⃣ Fetch profile from Firestore
    const profile = await getUserProfile(fakeUser.uid);

    // 2️⃣ Save session locally (minimal data)
    localStorage.setItem(
      "auth",
      JSON.stringify({
        uid: fakeUser.uid,
        name: fakeUser.name,
        phone: fakeUser.phone,
        role: profile?.activeRole,
      })
    );

    // 3️⃣ Smart redirect
    if (!profile) {
      navigate("/create-profile");
    } else {
      navigate(
        profile.activeRole === "worker"
          ? "/worker/dashboard"
          : "/owner/dashboard"
      );
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Login</h1>

        {step === "mobile" && (
          <>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              placeholder="Mobile number"
              maxLength={10}
              value={mobile}
              onChange={(e) =>
                setMobile(e.target.value.replace(/\D/g, ""))
              }
            />

            <Button className="w-full" onClick={sendOtp}>
              Send OTP
            </Button>
          </>
        )}

        {step === "otp" && (
          <>
            <Input
              placeholder="Enter OTP (123456)"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />

            <Button className="w-full" onClick={verifyOtp}>
              Verify & Login
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
