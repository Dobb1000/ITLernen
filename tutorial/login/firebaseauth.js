 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, browserPopupRedirectResolver} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
 import{getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"
 import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";




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
 const auth = getAuth(app);

 function showMessage(message, divId){
     console.log(message)
 }



 try {

 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const name = document.getElementById('name').value;


     const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            name: name,
            coins: 0
        };
        localStorage.setItem('loggedInUserId', user.uid);

        showMessage('Account Created Successfully', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='/index.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });
 } catch (error) {
        console.log(error);
 }




 try {

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='/index.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })

 } catch (error) {
     console.log(error);
 }

 try {
     const googleProvider = new GoogleAuthProvider();
     const googleLoginBtn = document.querySelector('#googleLoginBtn');

     googleLoginBtn.addEventListener("click", function() {
         signInWithPopup(auth, googleProvider)
             .then(async (result) => {
                 const user = result.user;
                 const db = getFirestore();

                 // Store user in Firestore if it's their first login
                 const userRef = doc(db, "users", user.uid);
                 await setDoc(userRef, {
                     email: user.email,
                     name: user.displayName,
                     coins: 0
                 }, { merge: true });

                 localStorage.setItem('loggedInUserId', user.uid);
                 window.alert("Erfolgreich angemeldet: " + user.displayName);
                 window.location.href = '/index.html';
             })
             .catch((error) => {
                 console.error("Fehler beim Google-Login:", error.message);
                 window.alert("Fehler beim Google-Login. Bitte versuchen Sie es erneut.");
             });
     });

 } catch (error) {
        console.log(error);
 }


