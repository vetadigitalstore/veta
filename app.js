// Firebase SDK CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWUgDGKxItsHeNiluSEAotMu1wnV_2E1I",
    authDomain: "soulfultune-fe673.firebaseapp.com",
    databaseURL: "https://soulfultune-fe673-default-rtdb.firebaseio.com",
    projectId: "soulfultune-fe673",
    storageBucket: "soulfultune-fe673.appspot.com",
    messagingSenderId: "284247467429",
    appId: "1:284247467429:web:37aad7742411caa529f44c",
    measurementId: "G-ZFRTMLQXCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Login Function
document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
        window.location.href = "home/home.html"; // Replace with your actual homepage
    } catch (error) {
        alert(error.message);
    }
});

// Sign-Up Function
document.getElementById("signUpForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
        });

        alert("Sign-Up Successful! Please check your email for verification.");
        location.reload();
    } catch (error) {
        alert(error.message);
    }
});

// Forgot Password Function
document.getElementById("forgotPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("forgotEmail").value;

    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent! Please check your inbox.");
        document.getElementById("forgotPasswordModal").style.display = "none";
    } catch (error) {
        alert(error.message);
    }
});