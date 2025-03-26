import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfZWy9Fyiec-d9fQofvQR4X-V8fDSM8dI",
  authDomain: "klub-apbt.firebaseapp.com",
  projectId: "klub-apbt",
  storageBucket: "klub-apbt.firebasestorage.app",
  messagingSenderId: "477394758514",
  appId: "1:477394758514:web:d00c30e87cb991f8368beb",
  measurementId: "G-G23BDGEC0N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
