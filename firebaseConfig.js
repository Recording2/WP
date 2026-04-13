import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore-lite.js';

const firebaseConfig = {
  apiKey: "AIzaSyAgMsV42RduGNJ0qPOIM7Bk2mZctte8ACM",
  authDomain: "workout-reccy.firebaseapp.com",
  projectId: "workout-reccy",
  storageBucket: "workout-reccy.firebasestorage.app",
  messagingSenderId: "256284786064",
  appId: "1:256284786064:web:7a9c924f7d95f37f6a8715",
  measurementId: "G-1B1PM9V0PB"
};

// 1. Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize Firestore (THIS WAS MISSING)
const db = getFirestore(app);

export const db = getFirestore(app);