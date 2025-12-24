


// src/firebase/userService.ts

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

/* =========================
   TYPES
========================= */

export type UserProfile = {
  name: string;
  phone: string;
  roles: ("owner" | "worker")[];
  activeRole: "owner" | "worker";
  skills: string[];
  createdAt?: any;
};

/* =========================
   CREATE USER PROFILE
========================= */
export async function createUserProfile(
  uid: string,
  data: UserProfile
) {
  const ref = doc(db, "users", uid);

  await setDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/* =========================
   GET USER PROFILE
========================= */
export async function getUserProfile(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data();
}

/* =========================
   UPDATE ACTIVE ROLE
========================= */
export async function updateActiveRole(
  uid: string,
  role: "owner" | "worker"
) {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { activeRole: role });
}