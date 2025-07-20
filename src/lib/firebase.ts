
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

function initializeFirebase() {
  if (typeof window !== "undefined") {
    if (getApps().length === 0) {
      if (firebaseConfig.apiKey) {
        app = initializeApp(firebaseConfig);
      } else {
        console.error("Firebase API key is missing. Please set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file.");
      }
    } else {
      app = getApp();
    }

    if (app) {
      auth = getAuth(app);
    }
  }
}

initializeFirebase();

function getFirebaseAuth(): Auth | null {
    if (!auth) {
        initializeFirebase();
    }
    return auth;
}


export { app, getFirebaseAuth };

