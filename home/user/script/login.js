import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

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

// Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    try {
        // Firebase Authentication Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Firestore থেকে ইউজারের ডাটা খোঁজা (email দিয়ে)
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); // First matched document

            alert(`Login Successful!\n\nUser Profile:\nName: ${userData.fullname}\nEmail: ${userData.email}\nMobile: ${userData.mobile}`);
            localStorage.setItem("userData", JSON.stringify(userData)); // Store in localStorage
            window.location.href = "../index.html"; // Redirect to Profile Page
        } else {
            alert("No user data found in database!");
        }
    } catch (error) {
        alert("Login Failed: " + error.message);
    }
});