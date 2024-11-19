import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDOh2mmYvonH1x7Cg0HvsRcSnBrJZbaaXk",
  authDomain: "ai-netflix-26521.firebaseapp.com",
  projectId: "ai-netflix-26521",
  storageBucket: "ai-netflix-26521.firebasestorage.app",
  messagingSenderId: "1035124989996",
  appId: "1:1035124989996:web:9c26d134b017053fa2b189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signOutUser = () => signOut(auth);
export { auth, onAuthStateChanged };
