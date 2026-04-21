//JS Firestore DB logic for PR page
import { db } from './firebaseConfig.js'

import { collection,
        addDoc,
        getDocs,
        query,
        orderBy,
        limit
        } from 'https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore-lite.js';

//Buttons and Input Variables -------------

//Personal Record Const's
const prSubmit = document.getElementById('RepNameBtn');
const prRepName = document.getElementById('RepName');
const prRepNum = document.getElementById('RepNum');

//StretchPR Consts
const strBtn = document.getElementById('stretchBtn');
const strName = document.getElementById('stretchName');
const strNum = document.getElementById('stretchNum');

//Time Table Consts

const tmBtn = document.getElementById('timeBtn');
const tmName = document.getElementById('timeName');
const tmNum = document.getElementById('timeNum');

//Weight Table Consts
const lbBtn = document.getElementById('weightBtn');
const lbName = document.getElementById('weightName');
const lbNum = document.getElementById('weightNum');

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
                    <td>${data.repName || data.stretchName || data.timeName || data.weightName || 'N/A'}</td>
                    <td>${data.repNum || data.stretchNum || data.timeNum || data.weightNum || 'N/A'}</td>
                </tr>`;
            
            tableBody.innerHTML += row;
        });
    } catch (e) {
        console.error(`Error fetching ${collectionName}: `, e);
    }
}
// Pulls from 'prReps' collection and puts it in 'repTBody'
displayCollection("prReps", "repTBody");

displayCollection("stretchPRs", "stretchTBody");

displayCollection("timePRs", "timeTBody");

displayCollection("weightPRs", "weightTBody");

//DB document writing logic

    async function handleFormSubmit(btnElement, nameInput, numInput, collectionName, fieldName, fieldNum) {
        if (!btnElement) return;
    btnElement.addEventListener('click', async () => {
        const valName = nameInput.value;
        const valNum = numInput.value;

        if (!valName || !valNum) return alert('Fill Out Both Fields, Icon!');

        try {
                await addDoc(collection(db, collectionName), {
                    timestamp: new Date(),
                    [fieldName]: valName,
                    [fieldNum]: Number(valNum)
                        });
            alert('Saved!');
            nameInput.value = "";
            numInput.value = "";
            displayCollection(collectionName, getTableId(collectionName));
            }
        catch (e) {
            console.error(`Error saving to ${collectionName}:`, e);
            }
        });
    }


// Helper to match collection to table ID
function getTableId(col) {
    const mapping = { "prReps": "repTBody", "stretchPRs": "stretchTBody" };
    return mapping[col];
}

// Setup for Personal Records
handleFormSubmit(prSubmit, prRepName, prRepNum, "prReps", "repName", "repNum");

// Setup for Stretches
handleFormSubmit(strBtn, strName, strNum, "stretchPRs", "stretchName", "stretchNum");

// Setup for Times
handleFormSubmit(tmBtn, tmName, tmNum, "timePRs", "timeName", "timeNum");

//Setup for Weight
handleFormSubmit(lbBtn, lbName, lbNum, "weightPRs", "weightName", "weightNum");


                