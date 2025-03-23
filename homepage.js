import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyCnasC7RgdNyyQusYASd93bBgi1B6_P0rs",
    authDomain: "itlernen-a0aa0.firebaseapp.com",
    projectId: "itlernen-a0aa0",
    storageBucket: "itlernen-a0aa0.firebasestorage.app",
    messagingSenderId: "570000726737",
    appId: "1:570000726737:web:bc7f437a708d8577a4c3f0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db=getFirestore();
let coins = 0;

onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap)=>{
                if(docSnap.exists()){
                    const userData=docSnap.data();
                    document.getElementById('coinsshow-text').innerText=userData.coins + " Chips";
                    coins = userData.coins;
                    document.getElementById("loginbtn").href = "/ITLernen/tutorial/login/profil.html";
                    document.getElementById("loginbtn").innerText = "Profil";
                }
                else{
                    console.log("no document found matching id")
                }
            })
            .catch((error)=>{
                console.log("Error getting document");
            })
    }
    else{
        console.log("User Id not Found in Local storage")
        document.getElementById("gamble_dropdown").style.display = "none";
        // display none importnat
        document.getElementById("coinsshow").style.setProperty("display", "none", "important");



    }
})


/*
const loggedInUserId=localStorage.getItem('loggedInUserId');
const logoutButton=document.getElementById('logout');

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(()=>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error('Error Signing out:', error);
        })
})*/