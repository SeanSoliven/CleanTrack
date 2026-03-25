// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7b7GeXHn9vfdSerxli2cZ6PeTU-1MneE",
  authDomain: "cleantrack-591d1.firebaseapp.com",
  projectId: "cleantrack-591d1",
  storageBucket: "cleantrack-591d1.firebasestorage.app",
  messagingSenderId: "61576639237",
  appId: "1:61576639237:web:b81cf627afd49a5fd13d6c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);