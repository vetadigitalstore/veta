import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjiNq5wrjSXUPnxCwvKohNK4kp-PLZjCU",
    authDomain: "veta-a21a4.firebaseapp.com",
    databaseURL: "https://veta-a21a4-default-rtdb.firebaseio.com",
    projectId: "veta-a21a4",
    storageBucket: "veta-a21a4.firebasestorage.app",
    messagingSenderId: "894331542860",
    appId: "1:894331542860:web:29faa849a6232be449c3e9",
    measurementId: "G-XDY6292KME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to Generate a 12-Digit Random Numeric User ID
function generateUserId() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString(); 
}

// Registration Form Submission
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let fullname = document.getElementById("fullname").value;
    let dob = document.getElementById("dob").value;
    let gender = document.getElementById("gender").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;
    let password = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;
    let passwordMatchMsg = document.getElementById("password-match");

    if (password !== confirmPassword) {
        passwordMatchMsg.style.color = "red";
        passwordMatchMsg.textContent = "Passwords do not match!";
        return;
    } else {
        passwordMatchMsg.style.color = "green";
        passwordMatchMsg.textContent = "Passwords match!";
    }

    try {
        // Generate a 12-Digit Numeric User ID
        const userId = generateUserId();

        // Firebase Authentication (User Signup using Email)
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store User Data in Firestore with Numeric ID
        await setDoc(doc(db, "users", userId), {
            userId: userId,
            fullname: fullname,
            dob: dob,
            gender: gender,
            email: email,
            mobile: mobile,
            uid: user.uid
        });

        alert("Registration Successful! Your User ID: " + userId);

        // ✅ **Redirect to Login Page after Successful Registration**
        window.location.href = "login.html";

    } catch (error) {
        alert("Error: " + error.message);
    }
});