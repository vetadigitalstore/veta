import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

// 🔹 তোমার Firebase Configuration
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

// 🔹 Firebase ইনিশিয়ালাইজ
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 🔹 "posts/latest" থেকে ডাটা লোড করা
const postRef = ref(database, "posts/latest");
onValue(postRef, (snapshot) => {
    if (snapshot.exists()) {
        const postData = snapshot.val();
        console.log("✅ Data Loaded: ", postData); // 🔹 ডিবাগিং চেক

        document.getElementById("postTitle").innerText = postData.title || "শিরোনাম নেই";
        document.getElementById("postDescription").innerText = postData.description || "কোনো বর্ণনা নেই";

        // 🔹 ইমেজ লোড করা
        if (postData.imageURL) {
            const imageIdMatch = postData.imageURL.match(/\/d\/(.*)\/view/);
            if (imageIdMatch) {
                const imageId = imageIdMatch[1];
                document.getElementById("postImage").src = `https://drive.google.com/uc?export=view&id=${imageId}`;
                document.getElementById("postImage").style.display = "block";
            } else {
                console.log("⚠️ Invalid Image URL:", postData.imageURL);
            }
        }

        // 🔹 ডাউনলোড বাটন লোড করা
        if (postData.fileURL) {
            const fileIdMatch = postData.fileURL.match(/\/d\/(.*)\/view/);
            if (fileIdMatch) {
                const fileId = fileIdMatch[1];
                document.getElementById("downloadButton").href = `https://drive.google.com/uc?export=download&id=${fileId}`;
                document.getElementById("downloadButton").style.display = "block";
            } else {
                console.log("⚠️ Invalid File URL:", postData.fileURL);
            }
        }
    } else {
        console.log("❌ No Data Found in Firebase!");
    }
}, (error) => {
    console.error("🔥 Firebase Error:", error);
});