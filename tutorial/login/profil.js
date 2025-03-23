import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, updateEmail, deleteUser, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCnasC7RgdNyyQusYASd93bBgi1B6_P0rs",
    authDomain: "itlernen-a0aa0.firebaseapp.com",
    projectId: "itlernen-a0aa0",
    storageBucket: "itlernen-a0aa0.firebasestorage.app",
    messagingSenderId: "570000726737",
    appId: "1:570000726737:web:bc7f437a708d8577a4c3f0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const coinsInput = document.getElementById('coins');
const messageDiv = document.getElementById('message');
const profileForm = document.getElementById('profileForm');
const deleteBtn = document.getElementById('deleteAccount');

let currentUser;

// Load User Data
onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUser = user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            nameInput.value = data.name;
            emailInput.value = user.email;
            coinsInput.value = data.coins;
        }
    } else {
        window.location.href = "./login.html";
    }
});

// Save Profile Changes
profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newName = nameInput.value;
    const newEmail = emailInput.value;

    try {
        // Update Firestore Name
        const docRef = doc(db, "users", currentUser.uid);
        await updateDoc(docRef, { name: newName });

        // Update Email in Auth
        if (currentUser.email !== newEmail) {
            await updateEmail(currentUser, newEmail);
            await updateDoc(docRef, { email: newEmail });
        }

        messageDiv.textContent = "Änderungen gespeichert!";
    } catch (error) {
        messageDiv.textContent = "Fehler beim Speichern!";
        console.error(error);
    }
});

// Delete Account
deleteBtn.addEventListener('click', async () => {
    if (confirm("Willst du deinen Account wirklich löschen?")) {
        try {
            await deleteDoc(doc(db, "users", currentUser.uid)); // Delete Firestore Data
            await deleteUser(currentUser); // Delete Auth Account
            alert("Account gelöscht!");
            window.location.href = "./login.html";
        } catch (error) {
            console.error(error);
            alert("Fehler beim Löschen des Accounts.");
        }
    }
});


import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const logoutBtn = document.getElementById('logoutBtn');

logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        window.location.href = "./login.html"; // Oder wohin du nach dem Logout weiterleiten willst
    } catch (error) {
        console.error("Fehler beim Ausloggen:", error);
        alert("Fehler beim Ausloggen!");
    }
});
