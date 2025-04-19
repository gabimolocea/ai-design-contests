import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { db } from '@/lib/firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to validate the signature
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature']!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    const rawBody = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });

    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err: any) {
    console.error('Error verifying webhook signature:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const paymentId = session.metadata?.paymentId;
    if (!paymentId) {
      console.error('Payment ID is missing in the session metadata');
      res.status(400).send('Payment ID is missing');
      return;
    }
    const paymentRef = doc(db, 'payments', paymentId);

    try {
      await updateDoc(paymentRef, {
        status: 'successful',
      });
      console.log('Payment updated successfully');
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  }

  res.status(200).json({ received: true });
}
