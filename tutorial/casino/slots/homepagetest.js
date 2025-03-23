import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, collection, getDocs, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCnasC7RgdNyyQusYASd93bBgi1B6_P0rs",
    authDomain: "itlernen-a0aa0.firebaseapp.com",
    projectId: "itlernen-a0aa0",
    storageBucket: "itlernen-a0aa0.appspot.com",
    messagingSenderId: "570000726737",
    appId: "1:570000726737:web:bc7f437a708d8577a4c3f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

let coins = 0;
let loggedInUserId = localStorage.getItem('loggedInUserId');

// Auth State Check
onAuthStateChanged(auth, (user) => {
    if (loggedInUserId) {
        console.log("User logged in:", user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    coins = userData.coins;
                    document.getElementById('credits').innerText = userData.coins;
                } else {
                    console.log("No document found matching ID");
                }
            })
            .catch((error) => {
                console.log("Error fetching user document:", error);
            });
    } else {
        console.log("User ID not found in local storage");
    }
    // Load leaderboard after checking user
    loadLeaderboard();
});

// Load Leaderboard Function
async function loadLeaderboard() {
    const leaderboardBody = document.getElementById("leaderboard-body");
    leaderboardBody.innerHTML = ""; // Clear existing rows

    try {
        const usersQuery = query(collection(db, "users"), orderBy("coins", "desc"), limit(50)); // Top 50 players
        const querySnapshot = await getDocs(usersQuery);

        let rank = 1;
        querySnapshot.forEach((docSnap) => {
            const user = docSnap.data();
            const highlight = docSnap.id === loggedInUserId ? 'table-success' : '';
            const username = user.name || "Unknown";
            const row = `
        <tr class="${highlight}">
          <td>${rank}</td>
          <td>${username}</td>
          <td>${user.coins}</td>
        </tr>
      `;
            leaderboardBody.innerHTML += row;
            rank++;
        });

    } catch (error) {
        console.error("Error loading leaderboard:", error);
    }
}
