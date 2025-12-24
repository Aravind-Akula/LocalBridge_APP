import { initializeApp } from "firebase/app";
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

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔥 connect to emulators (DEV only)
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}










// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCf7Yw4ZlbYHMtLeubZtHCsv_2oMCJkGFM",
  authDomain: "localbridge-38c7e.firebaseapp.com",
  projectId: "localbridge-38c7e",
  storageBucket: "localbridge-38c7e.firebasestorage.app",
  messagingSenderId: "427811354108",
  appId: "1:427811354108:web:7b4b6221b5269d50996e79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);