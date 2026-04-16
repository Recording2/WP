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
            if (!RName || !Rnum) return alert('Fill Out Both Fields, Icon!');

        try {
            await addDoc(collection(db, "prReps"), {
                timestamp: new date(),
                RepName: RName,
                RepNum: RNum
                    });
            alert('Saved!');
            prRepName.value ="";
            prRepNum.value ="";
            displayLatestStats();
        } catch (e) {
            console.error(e);
        }
        });
    }
                