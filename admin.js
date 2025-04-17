const admin = require('firebase-admin');
const serviceAccount = require('./key.json'); // Path to your key file

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ai-design-contests-default-rtdb.europe-west1.firebasedatabase.app", // Replace with your Firebase project URL
});

module.exports = admin;