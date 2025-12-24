import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "dummy",
  authDomain: "localhost",
  projectId: "localbridge-38c7e", // your project id
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// ✅ CONNECT TO EMULATOR
if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
