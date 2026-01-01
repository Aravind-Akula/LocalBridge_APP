import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

type Role = "worker" | "owner";

/* ================= GET USER BY UID ================= */
// ✅ THIS WAS MISSING — REQUIRED BY AuthContext
export async function getUserByUid(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("User not found for uid: " + uid);
  }

  return {
    uid,
    ...snap.data(),
  };
}

/* ================= GET OR CREATE USER ================= */
export async function getOrCreateUser({
  name,
  phone,
}: {
  name: string;
  phone: string;
}) {
  const ref = doc(db, "users", phone);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    return {
      uid: phone,
      ...snap.data(),
    };
  }

  const newUser = {
    name,
    phone,
    roles: [],
    activeRole: null,
    skills: {},
    createdAt: serverTimestamp(),
  };

  await setDoc(ref, newUser);

  return {
    uid: phone,
    ...newUser,
  };
}

/* ================= UPDATE ACTIVE ROLE ================= */
export async function updateActiveRole(
  uid: string,
  activeRole: Role
) {
  await updateDoc(doc(db, "users", uid), {
    activeRole,
  });
}



export async function updateUserRoles(
  uid: string,
  roles: string[],
  activeRole: string
) {
  await updateDoc(doc(db, "users", uid), {
    roles,
    activeRole,
  });
}