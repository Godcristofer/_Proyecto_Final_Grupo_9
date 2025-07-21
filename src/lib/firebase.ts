
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp(): FirebaseApp {
  if (!firebaseConfig.apiKey) {
    throw new Error("Firebase API key is missing. Please set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file.");
  }
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
}

function getFirebaseAuth(): Auth {
  const app = getFirebaseApp();
  return getAuth(app);
}

export { getFirebaseApp, getFirebaseAuth };
