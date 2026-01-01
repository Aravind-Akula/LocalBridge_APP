import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf7Yw4ZlbYHMtLeubZtHCsv_2oMCJkGFM",
  authDomain: "localbridge-38c7e.firebaseapp.com",
  projectId: "localbridge-38c7e",
  storageBucket: "localbridge-38c7e.firebasestorage.app",
  messagingSenderId: "427811354108",
  appId: "1:427811354108:web:7b4b6221b5269d50996e79"
};

// ✅ SAFE INITIALIZATION (CRITICAL FIX)
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔥 connect to emulators (DEV only)
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}
