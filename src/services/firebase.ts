// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  // authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,

  apiKey: "AIzaSyBa0-rOk06T-knMepqkkUVEEipXUkskYFc",
  authDomain: "payment-9db71.firebaseapp.com",
  projectId: "payment-9db71",
  storageBucket: "payment-9db71.appspot.com",
  messagingSenderId: "923499188462",
  appId: "1:923499188462:web:1906f0d625a84ac72c23ff",
  measurementId: "G-MP6GGRVP9M",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
