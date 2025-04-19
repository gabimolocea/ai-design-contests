import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '@/lib/firebase/config';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, amount, contestId } = req.body;

    console.log('Received data:', { userId, amount, contestId });

    if (!userId || !amount || !contestId) {
      console.error('Missing required fields:', { userId, amount, contestId });
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    try {
      const paymentId = `payment_${Date.now()}`;
      console.log('Generated Payment ID:', paymentId);

      // Save a placeholder payment record in Firestore
      const paymentRef = doc(db, 'payments', paymentId);
      await setDoc(paymentRef, {
        userId,
        amount,
        contestId,
        timestamp: Timestamp.now(),
        status: 'pending',
      });

      console.log('Payment saved to Firestore:', { paymentId, userId, amount, contestId });

      // Create a Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Contest Payment',
              },
              unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?paymentId=${paymentId}&contestId=${contestId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        metadata: {
          paymentId,
          contestId,
        },
      });

      console.log('Stripe session created:', session.url);

      res.status(200).json({ url: session.url }); // Return the session URL
    } catch (error) {
      console.error('Error creating Stripe session:', (error as Error).message);
      res.status(500).json({ error: (error as Error).message }); // Return the error message
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' }); // Return an error for unsupported methods
  }
}