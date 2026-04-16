//JS Firestore DB logic for PR page
import { db } from './firebaseConfig.js'

import { collection,
        addDoc,
        getDocs,
        query,
        orderBy,
        limit
        } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore-lite.js';

const prSubmit = document.getElementById('RepNameBtn');
const prRepName = document.getElementById('RepName');
const prRepNum = document.getElementById('RepNum');

if (prSubmit) {

    prSubmit.addEventListener('click', async () => {
        const RName = prRepName.value;
        const RNum = prRepNum.value;
            if (!RName || !RNum) return alert('Fill Out Both Fields, Icon!');

        try {
            await addDoc(collection(db, "prReps"), {
                timestamp: new Date(),
                repName: RName,
                repNum: Number(RNum)
                    });
            alert("Saved!");
            prRepName.value ="";
            prRepNum.value ="";
            displayLatestStats();
        } catch (e) {
            console.error(e);
        }
    });
}

async function displayLatestStats() {
    const repTBody = document.getElementById("repTBody"); // Targets your existing table
    
    // 1. Create a query: Get 'user_inputs', sort by time, only take the most recent 3
    const q = query(collection(db, "prReps"), orderBy("timestamp", "desc"), limit(5));
    
    try {
        const querySnapshot = await getDocs(q);
        
        // Optional: Clear existing "static" rows if you want only DB data to show
        tableBody.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.timestamp.toDate().toLocaleDateString(); // Converts Firebase timestamp to readable date

            // 2. Create a new row for each entry
            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${data.repName || 'N/A'}</td>
                    <td>${data.repNum || 'N/A'}</td>
                </tr>`;
            
            tableBody.innerHTML += row;
        });
    } catch (e) {
        console.error("Error fetching data: ", e);
    }
}

// 3. Run this function as soon as the page loads
displayLatestStats();
                