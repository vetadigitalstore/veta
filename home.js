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

// Importing necessary functions from Firebase SDK
import { getAuth, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// Function to Set User Data
function setUserData(userUID, userEmail, userFullName, userPhoneNumber, profileLogoUrl = null) {
    document.getElementById("userUIDDisplay").textContent = `UID: ${userUID}`;
    document.getElementById("userEmail").textContent = `Email: ${userEmail}`;
    document.getElementById("fullNameDisplay").textContent = `${userFullName || "Not provided"}`;
    document.getElementById("phoneNumberDisplay").textContent = `Phone Number: ${userPhoneNumber || "Not provided"}`;

    if (profileLogoUrl) {
        document.getElementById("profileLogo").src = profileLogoUrl;
    }
}

// Function to Set Full Name in Header and Profile Popup
function setFullName(fullName) {
    // হেডারে নাম সেট করা
    document.getElementById("fullNameDisplayHeader").textContent = fullName || "Not provided";
    // প্রোফাইল পপআপে নাম সেট করা
    document.getElementById("fullNameDisplayProfile").textContent = fullName || "Not provided";
}

// Display Logged-In User Info
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userUID = user.uid;
        const userDocRef = doc(db, "users", userUID);

        try {
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
                const userData = docSnap.data();

                // Full Name সেট করা
                setFullName(userData.fullName);

                // অন্যান্য তথ্য সেট করা
                document.getElementById("userUIDDisplay").textContent = `UID: ${userUID}`;
                document.getElementById("userEmail").textContent = `Email: ${user.email}`;
                document.getElementById("phoneNumberDisplay").textContent = `Phone Number: ${userData.phoneNumber || "Not provided"}`;

                // প্রোফাইল লোগো সেট করা (যদি থাকে)
                if (userData.profileLogo) {
                    const profileLogoUrl = await getDownloadURL(ref(storage, userData.profileLogo));
                    document.getElementById("profileLogo").src = profileLogoUrl;
                }
            } else {
                alert("No user data found.");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    } else {
        alert("No user is logged in. Redirecting to login page.");
        window.location.href = "../index.html";
    }
});




// Profile Logo Upload Handler
document.getElementById("logoContainer").addEventListener("click", async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (file) {
            const user = auth.currentUser;
            const logoPath = `logos/${user.uid}/${file.name}`;
            const storageRef = ref(storage, logoPath);

            try {
                await uploadBytes(storageRef, file);
                await updateDoc(doc(db, "users", user.uid), { profileLogo: logoPath });
                alert("Profile logo updated successfully.");
                location.reload();
            } catch (error) {
                console.error("Error uploading logo:", error);
                alert("Failed to update profile logo.");
            }
        }
    };
});

// Update Profile Button Handler
document.getElementById("updateButton").addEventListener("click", async () => {
    const fullName = document.getElementById("fullNameInput").value;
    const phoneNumber = document.getElementById("phoneNumberInput").value;
    const user = auth.currentUser;

    if (fullName && phoneNumber) {
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                fullName: fullName,
                phoneNumber: phoneNumber
            });
            alert("Profile updated successfully!");
            // Update the display to show the new information
            document.getElementById("fullNameDisplay").textContent = `Name: ${fullName}`;
            document.getElementById("phoneNumberDisplay").textContent = `Phone Number: ${phoneNumber}`;
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    } else {
        alert("Please fill in both full name and phone number.");
    }
});



// Dark mode toggle logic
let isDarkMode = false;

function toggleTheme() {
    const body = document.getElementById("body");
    const button = document.getElementById("themeToggle");

    if (isDarkMode) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        button.textContent = "Switch to Dark Mode";
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        button.textContent = "Switch to Light Mode";
    }
    isDarkMode = !isDarkMode;
}



