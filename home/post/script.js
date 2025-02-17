import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.createPost = function() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let imageURL = document.getElementById("imageURL").value;
    let fileURL = document.getElementById("fileURL").value;

    // Google Drive  URL  
    if (imageURL.includes("drive.google.com")) {
        let fileId = imageURL.split("/d/")[1].split("/")[0];
        imageURL = `https://drive.google.com/uc?export=view&id=${fileId}`;
    }

    // Google Drive     
    if (fileURL.includes("drive.google.com")) {
        let fileId = fileURL.split("/d/")[1].split("/")[0];
        fileURL = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }

    let newPostRef = push(ref(database, "posts"));
    set(newPostRef, {
        title: title,
        description: description,
        imageURL: imageURL,
        fileURL: fileURL
    }).then(() => {
        alert("    !");
        window.location.href = "view.html?postId=" + newPostRef.key;
    }).catch(error => {
        alert("    : " + error.message);
    });
}