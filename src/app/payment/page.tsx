'use client'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase/config';
import { useFormContext } from '@/context/form-context'; // Import your form context
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const [user, loading] = useAuthState(auth); // Get the authenticated user
  const { formData } = useFormContext(); // Access the budget from formData
  const router = useRouter();

  console.log('Budget in PaymentPage:', formData.budget); // Debugging log

  const handlePayment = async () => {
    if (loading) {
      alert('Loading user information. Please wait.');
      return;
    }

    if (!user) {
      alert('You must be logged in to make a payment.');
      router.push('/login'); // Redirect to login if not authenticated
      return;
    }

    if (!formData.budget) {
      alert('No budget selected. Please go back and select a budget.');
      router.push('/create-contest'); // Redirect to the budget selection step
      return;
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid, // Use the authenticated user's ID
          amount: formData.budget, // Use the budget from formData
           contestId: 'contest_456', // Pass the contest ID if available
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Complete Your Payment</h1>
      <p className="mb-6">Your total budget is: <strong>${formData.budget}</strong></p>
      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg"
      >
        Pay with Stripe
      </button>
    </div>
  );
}