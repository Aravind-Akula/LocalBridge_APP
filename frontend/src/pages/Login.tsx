import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAuth } from "../context/AuthContext";
import { getOrCreateUser } from "../firebase/userService";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const DEV_PHONE = "9999999999";
const DEV_OTP = "123456";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const confirmationRef = useRef<any>(null);

  useEffect(() => {
    setOtp("");
    setOtpSent(false);
  }, [phone]);

  /* ===== SEND OTP ===== */
  const handleSendOtp = async () => {
    setError("");

    if (!name.trim()) return setError("Name required");
    if (phone.length !== 10) return setError("Invalid phone");

    if (phone === DEV_PHONE) {
      setOtpSent(true);
      return;
    }

    try {
      setLoading(true);

      if (!(window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }

      confirmationRef.current = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        (window as any).recaptchaVerifier
      );

      setOtpSent(true);
    } catch {
      setError("OTP failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===== VERIFY OTP ===== */
  const handleVerifyOtp = async () => {
    setError("");
    if (otp.length !== 6) return setError("Invalid OTP");

    /* DEV LOGIN */
    if (import.meta.env.DEV && phone === DEV_PHONE) {
      if (otp !== DEV_OTP) return setError("Invalid OTP");

      const userFromDb = await getOrCreateUser({ name, phone });

      if (!userFromDb.roles || userFromDb.roles.length === 0) {
        setUser({ ...userFromDb, roles: [], activeRole: null });
        navigate("/select-role", { replace: true });
        return;
      }

      setUser(userFromDb);
      navigate(
        userFromDb.activeRole === "worker"
          ? "/worker/dashboard"
          : "/owner/dashboard",
        { replace: true }
      );
      return;
    }

    /* PROD LOGIN */
    try {
      setLoading(true);
      await confirmationRef.current.confirm(otp);

      const userFromDb = await getOrCreateUser({ name, phone });

      if (!userFromDb.roles || userFromDb.roles.length === 0) {
        setUser({ ...userFromDb, roles: [], activeRole: null });
        navigate("/select-role", { replace: true });
        return;
      }

      setUser(userFromDb);
      navigate(
        userFromDb.activeRole === "worker"
          ? "/worker/dashboard"
          : "/owner/dashboard",
        { replace: true }
      );
    } catch {
      setError("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center">Local Bridge</h2>

        <Input value={name} disabled={otpSent} onChange={e => setName(e.target.value)} placeholder="Name" />
        <Input value={phone} disabled={otpSent} onChange={e => setPhone(e.target.value.replace(/\D/g, ""))} maxLength={10} placeholder="Phone" />

        {otpSent && (
          <Input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ""))} maxLength={6} placeholder="OTP" />
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!otpSent ? (
          <Button onClick={handleSendOtp}>Send OTP</Button>
        ) : (
          <Button onClick={handleVerifyOtp}>Verify</Button>
        )}

        <div id="recaptcha-container" />
      </div>
    </div>
  );
}
