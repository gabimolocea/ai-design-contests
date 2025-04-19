'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SuccessPage() {
  const [user, loading] = useAuthState(auth); // Firebase authentication state
  const [paymentData, setPaymentData] = useState<DocumentData | null>(null); // Payment data from Firestore
  const [contestData, setContestData] = useState<DocumentData | null>(null); // Contest data from Firestore
  const [error, setError] = useState(''); // Error message
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams?.get('paymentId') || null; // Get paymentId from query string
  const contestId = searchParams?.get('contestId') || null; // Get contestId from query string

  useEffect(() => {
    if (loading) return; // Wait for authentication state to load

    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    if (!paymentId || !contestId) {
      setError('Payment ID or Contest ID is missing.');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch payment data
        const paymentRef = doc(db, 'payments', paymentId as string);
        const paymentDoc = await getDoc(paymentRef);

        if (!paymentDoc.exists()) {
          throw new Error('Payment not found.');
        }

        const payment = paymentDoc.data();
        if (payment.userId !== user.uid) {
          throw new Error('Permission denied for payment.');
        }
        setPaymentData(payment);

        // Fetch contest data
        const contestRef = doc(db, 'contests', contestId as string);
        const contestDoc = await getDoc(contestRef);

        if (!contestDoc.exists()) {
          throw new Error('Contest not found.');
        }

        const contest = contestDoc.data();
        if (contest.createdBy !== user.uid) {
          throw new Error('Permission denied for contest.');
        }
        setContestData(contest);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'An unknown error occurred.');
      }
    };

    fetchData();
  }, [user, loading, paymentId, contestId, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Payment Successful</h1>
      <p className="text-lg mb-6">Thank you for your payment!</p>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        <ul className="space-y-2">
          <li>
            <strong>Payment ID:</strong> {paymentId}
          </li>
          <li>
            <strong>Amount:</strong> ${paymentData?.amount}
          </li>
          <li>
            <strong>Date:</strong> {new Date(paymentData?.timestamp?.seconds * 1000).toLocaleString()}
          </li>
          <li>
            <strong>Status:</strong> {paymentData?.status}
          </li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Contest Details</h2>
        <ul className="space-y-2">
          <li>
            <strong>Contest ID:</strong> {contestId}
          </li>
          <li>
            <strong>Title:</strong> {contestData?.title}
          </li>
          <li>
            <strong>Description:</strong> {contestData?.description}
          </li>
        </ul>
      </div>
    </div>
  );
}