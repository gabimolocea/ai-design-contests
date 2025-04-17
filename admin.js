import { initializeApp, cert, getApps } from 'firebase-admin/app';

// Check if Firebase Admin SDK is already initialized
if (!getApps().length) {
  // Decode the Base64 string from the environment variable
  const keyJson = Buffer.from(process.env.GOOGLE_CLOUD_KEY_JSON || '', 'base64').toString('utf-8');

  // Parse the JSON string
  const serviceAccount = JSON.parse(keyJson);

  // Initialize Firebase Admin SDK
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export default initializeApp;