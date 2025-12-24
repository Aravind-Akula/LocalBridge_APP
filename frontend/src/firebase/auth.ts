import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "./config";

let confirmationResult: ConfirmationResult | null = null;

export function setupRecaptcha(containerId: string) {
  if ((window as any).recaptchaVerifier) return;

  (window as any).recaptchaVerifier = new RecaptchaVerifier(
    auth,
    containerId,
    {
      size: "invisible",
    }
  );
}

export async function sendOTP(phone: string) {
  const appVerifier = (window as any).recaptchaVerifier;
  confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
}

export async function verifyOTP(code: string) {
  if (!confirmationResult) {
    throw new Error("OTP not requested yet");
  }
  return confirmationResult.confirm(code);
}
