import { db } from '@/lib/firebase/config'
import { collection, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore'

/**
 * Save a new contest to Firestore.
 * @param formData - The form data for the contest.
 * @param userId - The ID of the authenticated user creating the contest.
 * @returns The ID of the newly created contest document.
 */
export async function saveContestToFirestore(formData: any, userId: string) {
  const contestRef = collection(db, 'contests');
  const docRef = await addDoc(contestRef, {
    ...formData,
    createdBy: userId, // Attach the authenticated user's ID
    createdAt: Timestamp.now(), // Add the current timestamp
    status: 'draft', // Default status
  });
  return docRef.id; // Return the contest ID
}

/**
 * Update the status of an existing contest in Firestore.
 * @param contestId - The ID of the contest to update.
 * @param status - The new status to set (e.g., 'active', 'completed').
 */
export async function updateContestStatus(contestId: string, status: string) {
  const contestRef = doc(db, 'contests', contestId) // Reference to the contest document
  await updateDoc(contestRef, { status }) // Update the status field
}