import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export async function updateDisplayName(displayName: string): Promise<void> {
  if (!auth.currentUser) throw new Error("No user is logged in.");

  // Update displayName in Firebase Authentication
  await updateProfile(auth.currentUser, { displayName });

  // Update displayName in Firestore users collection
  const userDocRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(userDocRef, { displayName });
}

export async function changePassword(newPassword: string): Promise<void> {
  if (!auth.currentUser) throw new Error("No user is logged in.");

  // Update the user's password in Firebase Authentication
  await updatePassword(auth.currentUser, newPassword);
}