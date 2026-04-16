//Import from the config page
import { db } from './firebaseConfig.js'


//Import for the Tools
import { collection,
        addDoc,
        getDocs,
        query,
        orderBy,
        limit
       } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore-lite.js';

//Creating Const Variable for the form
const formButton = document.getElementById('addCityBtn');
const prInput = document.getElementById('prName');
const weightInput = document.getElementById('bodyWeight');

//Building the form

if (formButton) {

    formButton.addEventListener('click', async () => {
        const prName = prInput.value;
        const weight = weightInput.value;
        if (!weight || !prName) return alert('Fill Out Both Fields, Baddie!');

        try {
            await addDoc(collection(db, "personal_records"), {
                timestamp: new Date(),
                precord: prName,
                bweight: weight,
                unit: "lbs"
            });
            alert("Saved!");
            prInput.value = ""; 
            weightInput.value = "";
            displayLatestStats();
        } catch (e) {
            console.error(e);
        }
    });
}



async function displayLatestStats() {
    const tableBody = document.getElementById("tableBody"); // Targets your existing table
    
    // 1. Create a query: Get 'user_inputs', sort by time, only take the most recent 3
    const q = query(collection(db, "personal_records"), orderBy("timestamp", "desc"), limit(5));
    
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
                    <td>${data.precord || 'N/A'}</td>
                    <td>${data.bweight || 'N/A'}</td>
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


