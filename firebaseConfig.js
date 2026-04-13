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

const formButton = document.getElementById('addCityBtn');
const cityInput = document.getElementById('cityName');

if (formButton) {
    formButton.addEventListener('click', async () => {
        const cityName = cityInput.value; 
        
        if (!cityName) {
            alert("Please enter a name first!");
            return;
        }

        try {
            // Now 'db' is defined and will work!
            await addDoc(collection(db, "user_inputs"), {
                timestamp: new Date(),
                message: "Hello from the Fitness Journal!",
                city: cityName 
            });
            alert("Success! Data sent to Firebase.");
            cityInput.value = ""; 
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error! Check the console.");
        }
    });
}