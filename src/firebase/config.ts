import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Enable anonymous authentication for public pages
// This helps if Firebase security rules require authentication
// but we want to allow public access to published content
const enableAnonymousAuth = async () => {
  try {
    // Only sign in anonymously if no user is currently signed in
    if (!auth.currentUser) {
      console.log("No user signed in, attempting anonymous authentication");
      await signInAnonymously(auth);
      console.log("Anonymous authentication successful");
    }
  } catch (error) {
    console.error("Error with anonymous authentication:", error);
  }
};

// Call this function to ensure we have authentication
enableAnonymousAuth();

export { app, auth, db, storage };
