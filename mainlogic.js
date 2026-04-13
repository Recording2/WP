//Import from the config page
import { db } from './firebaseConfig.js'


//Import for the Tools
import { collection,
        addDoc,
        getDoc,
        query,
        orderBy,
        limit
       } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore-lite.js';

//Creating Const Variable for the form
const formButton = document.getElementById('addCityBtn');
const cityInput = document.getElementById('cityName');

//Building the form

if (formButton) {

    formButton.addEventListener('click', async () => {
        const cityName = cityInput.value;
        if (!cityName) return alert('Enter a Name!');

        try {
            await addDoc(collection(db, "user_inputs"), {
                timestamp: new Date(),
                city: cityName 
            });
            alert("Saved!");
            cityInput.value = ""; 
        } catch (e) {
            console.error(e);
        }
    });
}

async function displayLatestStats() {
    const tableBody = document.querySelector("tableBody"); // Targets your existing table
    
    // 1. Create a query: Get 'user_inputs', sort by time, only take the most recent 3
    const q = query(collection(db, "user_inputs"), orderBy("timestamp", "desc"), limit(5));
    
    try {
        const querySnapshot = await getDocs(q);
        
        // Optional: Clear existing "static" rows if you want only DB data to show
        // tableBody.innerHTML = `<tr><th>Date</th><th>City/Info</th><th>Status</th></tr>`;

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.timestamp.toDate().toLocaleDateString(); // Converts Firebase timestamp to readable date

            // 2. Create a new row for each entry
            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${data.city || 'N/A'}</td>
                    <td>${data.message || 'Logged'}</td>
                    <td>Success</td>
                </tr>`;
            
            tableBody.innerHTML += row;
        });
    } catch (e) {
        console.error("Error fetching data: ", e);
    }
}

// 3. Run this function as soon as the page loads
displayLatestStats();


