// Open Left Sidebar Menu
function openLeftMenu() {
    const leftMenu = document.getElementById('leftMenu');
    leftMenu.style.display = 'flex'; // Show menu
}

// Close Left Sidebar Menu
function closeLeftMenu() {
    const leftMenu = document.getElementById('leftMenu');
    leftMenu.style.display = 'none'; // Hide menu
}

// Open Right Sidebar Menu
function openRightMenu() {
    const rightMenu = document.getElementById('rightMenu');
    rightMenu.style.display = 'flex'; // Show menu
}

// Close Right Sidebar Menu
function closeRightMenu() {
    const rightMenu = document.getElementById('rightMenu');
    rightMenu.style.display = 'none'; // Hide menu
}


// Open and close left menu
function openLeftMenu() {
    document.getElementById("leftMenu").style.display = "block";
}
function closeLeftMenu() {
    document.getElementById("leftMenu").style.display = "none";
}

// Open and close right menu
function openRightMenu() {
    document.getElementById("rightMenu").style.display = "block";
}
function closeRightMenu() {
    document.getElementById("rightMenu").style.display = "none";
}

// Open and close profile popup
function openProfilePopup() {
    document.getElementById("profilePopup").style.display = "block";
}
function closeProfilePopup() {
    document.getElementById("profilePopup").style.display = "none";
}

// Open settings popup
function openSettingsPopup() {
    document.getElementById("settingsPopup").style.display = "block";
}

// Close settings popup
function closeSettingsPopup() {
    document.getElementById("settingsPopup").style.display = "none";
}

// লগইন ফাংশন
function login() {
    localStorage.setItem("isLoggedIn", "true"); // লগইন স্ট্যাটাস সেট করুন
    window.location.href = "home/home.html"; // হোম পেজে রিডাইরেক্ট করুন
}

// লগআউট ফাংশন
function logout() {
    localStorage.removeItem("isLoggedIn"); // লগইন স্ট্যাটাস মুছে ফেলুন
    window.location.href = "../index.html"; // লগইন পেজে রিডাইরেক্ট করুন
}

// লগইন চেক করার ফাংশন
function checkLogin() {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "../index.html"; // লগইন পেজে রিডাইরেক্ট করুন
    }
}

// ব্যাক বাটন নিষ্ক্রিয় করার স্ক্রিপ্ট
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};


// Open search popup
function openSearchPopup() {
    document.getElementById("searchPopup").style.display = "block";
}

// Close search popup
function closeSearchPopup() {
    document.getElementById("searchPopup").style.display = "none";
}

// Open notification popup
function openNotificationPopup() {
    document.getElementById("notificationPopup").style.display = "block";
}

// Close notification popup
function closeNotificationPopup() {
    document.getElementById("notificationPopup").style.display = "none";
}

// Perform search action
function performSearch() {
    const searchInput = document.getElementById("searchInput").value;
    alert(`Searching for: ${searchInput}`);
}

// Add event listeners for icons
document.querySelector('.search').addEventListener('click', openSearchPopup);
document.querySelector('.notification').addEventListener('click', openNotificationPopup);




// ডাইনামিক সার্চ রেজাল্ট ফেচিং ফাংশন
function fetchSearchResults() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("searchResults");

    // যদি ইনপুট ফাঁকা থাকে, রেজাল্ট ক্লিয়ার করা হবে
    if (query === "") {
        resultsContainer.innerHTML = "";
        return;
    }

    // সার্চ ডেটা (ডেমো ডেটা, সার্ভারের সাথে ইন্টিগ্রেট করতে API ব্যবহার করুন)
    const pages = [
        { title: "Home Page", url: "home.html" },
        { title: "About Us", url: "about.html" },
        { title: "Services", url: "services.html" },
        { title: "Contact Us", url: "contact.html" },
        { title: "History", url: "history.html" }
    ];

    // ইনপুট অনুযায়ী পেজ ফিল্টার করা
    const filteredResults = pages.filter(page => 
        page.title.toLowerCase().includes(query)
    );

    // রেজাল্ট লিস্ট আপডেট করা
    resultsContainer.innerHTML = "";

    if (filteredResults.length > 0) {
        filteredResults.forEach(result => {
            const li = document.createElement("li");
            li.textContent = result.title; // রেজাল্ট টাইটেল দেখানো
            li.onclick = () => {
                window.location.href = result.url; // রেজাল্ট লিংকে রিডাইরেক্ট
            };
            resultsContainer.appendChild(li);
        });
    } else {
        // কোনো রেজাল্ট না পাওয়া গেলে
        resultsContainer.innerHTML = "<li>No results found</li>";
    }
}





