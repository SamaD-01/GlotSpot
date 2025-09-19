import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "glotspot-7364e.firebaseapp.com",
  projectId: "glotspot-7364e",
  storageBucket: "glotspot-7364e.firebasestorage.app",
  messagingSenderId: "355145957718",
  appId: "1:355145957718:web:793a699ef603b9a69456f7",
  measurementId: "G-RMVMDYZL5R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, db };