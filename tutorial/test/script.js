import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getDatabase, ref, set, get, update } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCnasC7RgdNyyQusYASd93bBgi1B6_P0rs",
    authDomain: "itlernen-a0aa0.firebaseapp.com",
    projectId: "itlernen-a0aa0",
    storageBucket: "itlernen-a0aa0.firebasestorage.app",
    messagingSenderId: "570000726737",
    appId: "1:570000726737:web:bc7f437a708d8577a4c3f0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

const submitButton = document.getElementById("submit");
const signupButton = document.getElementById("sign-up");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const script = document.getElementById("main");
const createacct = document.getElementById("create-acct");

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignUpPasswordIn = document.getElementById("confirm-password-signup");
const createacctbtn = document.getElementById("create-acct-btn");
const returnBtn = document.getElementById("return-btn");
const googleLoginBtn = document.getElementById("google-login");
const provider = new GoogleAuthProvider();

var email, password, signupEmail, signupPassword, confirmSignupEmail, confirmSignUpPassword;

createacctbtn.addEventListener("click", function() {
    var isVerified = true;

    signupEmail = signupEmailIn.value;
    confirmSignupEmail = confirmSignupEmailIn.value;
    if(signupEmail !== confirmSignupEmail) {
        window.alert("Email fields do not match. Try again.");
        isVerified = false;
    }

    signupPassword = signupPasswordIn.value;
    confirmSignUpPassword = confirmSignUpPasswordIn.value;
    if(signupPassword !== confirmSignUpPassword) {
        window.alert("Password fields do not match. Try again.");
        isVerified = false;
    }

    if(!signupEmail || !confirmSignupEmail || !signupPassword || !confirmSignUpPassword) {
        window.alert("Please fill out all required fields.");
        isVerified = false;
    }

    if(isVerified) {
        createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    email: user.email,
                    points: 100
                });
                window.alert("Success! Account created.");
            })
            .catch((error) => {
                console.error(error);
                window.alert("Error occurred. Try again.");
            });
    }
});

submitButton.addEventListener("click", function() {
    email = emailInput.value;
    password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userRef = ref(database, 'users/' + user.uid);

            // Überprüfen, ob der Benutzer bereits in der Datenbank existiert
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    // Benutzer existiert, Punktzahl anzeigen
                    const userData = snapshot.val();
                    window.alert(`Success! Welcome back! Your Points: ${userData.points}`);
                } else {
                    // Benutzer existiert nicht, neuen Eintrag mit Standard-Punktzahl (z.B. 100) erstellen
                    set(userRef, {
                        email: user.email,
                        points: 100
                    }).then(() => {
                        window.alert("Welcome! Your account has been initialized with 100 points.");
                    }).catch((error) => {
                        console.error("Error creating user data:", error);
                    });
                }
            }).catch((error) => {
                console.error("Error fetching user data:", error);
            });

        })
        .catch((error) => {
            console.error(error);
            window.alert("Error occurred. Try again.");
        });
});


googleLoginBtn.addEventListener("click", function() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            window.alert("Erfolgreich angemeldet: " + user.displayName);
        })
        .catch((error) => {
            console.error("Fehler beim Google-Login:", error.message);
            window.alert("Fehler beim Google-Login. Bitte versuchen Sie es erneut.");
        });
});
