// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore-lite.js';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgMsV42RduGNJ0qPOIM7Bk2mZctte8ACM",
  authDomain: "workout-reccy.firebaseapp.com",
  projectId: "workout-reccy",
  storageBucket: "workout-reccy.firebasestorage.app",
  messagingSenderId: "256284786064",
  appId: "1:256284786064:web:7a9c924f7d95f37f6a8715",
  measurementId: "G-1B1PM9V0PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database service so other files can use it
export const db = getFirestore(app); 

// Logic for a "Submit" button on a form
const formButton = document.getElementById('submitData');
if (formButton) {
    formButton.addEventListener('click', async () => {
        await addDoc(collection(db, "user_inputs"), {
            timestamp: new Date(),
            message: "Hello from my Chromebook!"
        });
        alert("Data sent to Firebase!");
    });
