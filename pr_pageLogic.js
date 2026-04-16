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

// We tell the function WHICH collection and WHICH table ID to use
async function displayCollection(collectionName, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    if (!tableBody) return;

    const q = query(collection(db, collectionName), orderBy("timestamp", "desc"), limit(5));
    
    try {
        const querySnapshot = await getDocs(q);
        tableBody.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate().toLocaleDateString() : "No Date";

            // We make the row "smart" by checking what data exists
            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${data.repName || data.exercise || 'N/A'}</td>
                    <td>${data.repNum || data.value || 'N/A'}</td>
                </tr>`;
            
            tableBody.innerHTML += row;
        });
    } catch (e) {
        console.error(`Error fetching ${collectionName}: `, e);
    }
}
// Pulls from 'prReps' collection and puts it in 'repTBody'
displayCollection("prReps", "repTBody");


                