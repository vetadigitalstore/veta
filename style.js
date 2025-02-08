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

// Open and close profile popup
function openProfilePopup() {
    document.getElementById("profilePopup").style.display = "block";
}

function closeProfilePopup() {
    document.getElementById("profilePopup").style.display = "none";
}

// Open and close settings popup
function openSettingsPopup() {
    document.getElementById("settingsPopup").style.display = "block";
}

function closeSettingsPopup() {
    document.getElementById("settingsPopup").style.display = "none";
}

// Open Login Popup
function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
}

// Close Login Popup
function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}

// Open Forgot Password Popup
function openForgotPasswordPopup() {
    closeLoginPopup(); // Close Login Popup
    document.getElementById("forgotPasswordPopup").style.display = "block";
}

// Close Forgot Password Popup
function closeForgotPasswordPopup() {
    document.getElementById("forgotPasswordPopup").style.display = "none";
}

function openLoginFromForgot() {
    // Forgot Password Popup বন্ধ করা
    document.getElementById("forgotPasswordPopup").style.display = "none";

    // Login Popup ওপেন করা
    document.getElementById("loginPopup").style.display = "block";
}

// Login Popup Open Function
function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
}

// Forgot Password Popup Open Function
function openForgotPasswordPopup() {
    document.getElementById("forgotPasswordPopup").style.display = "block";
}

// Open Registration Popup
function openRegistrationPopup() {
    closeLoginPopup(); // Close Login Popup
    document.getElementById("registrationPopup").style.display = "block";
}

// Close Registration Popup
function closeRegistrationPopup() {
    document.getElementById("registrationPopup").style.display = "none";
}

// Login function
function login() {
    localStorage.setItem("isLoggedIn", "true"); // Set login status
    window.location.href = "index.html"; // Redirect to home page
}

// Logout function
function logout() {
    localStorage.removeItem("isLoggedIn"); // Remove login status
    window.location.href = "index.html"; // Redirect to login page
}

// Check login status
function checkLogin() {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "index.html"; // Redirect to login page
    }
}

// Disable back button
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

// Fetch dynamic search results
function fetchSearchResults() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("searchResults");

    if (query === "") {
        resultsContainer.innerHTML = "";
        return;
    }

    const pages = [
        { title: "Home Page", url: "index.html" },
        { title: "About Us", url: "about.html" },
        { title: "Services", url: "services.html" },
        { title: "Contact Us", url: "contact.html" },
        { title: "History", url: "history.html" }
    ];

    const filteredResults = pages.filter(page => 
        page.title.toLowerCase().includes(query)
    );

    resultsContainer.innerHTML = "";

    if (filteredResults.length > 0) {
        filteredResults.forEach(result => {
            const li = document.createElement("li");
            li.textContent = result.title;
            li.onclick = () => {
                window.location.href = result.url;
            };
            resultsContainer.appendChild(li);
        });
    } else {
        resultsContainer.innerHTML = "<li>No results found</li>";
    }
}

// Logout user function
function logoutUser() {
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('userToken');

    document.getElementById("userUIDDisplay").textContent = "UID: Loading...";
    document.getElementById("userEmail").textContent = "Email: Loading...";
    document.getElementById("phoneNumberDisplay").textContent = "Phone Number: Loading...";
    document.querySelector(".fullNameDisplay").textContent = "Loading...";
    document.getElementById("profileLogo").src = "assets/images/logo.png";

    closeProfilePopup();
    openLoginPopup();
}

// Check if user is logged in
function checkUserLoggedIn() {
    const userToken = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');

    if (!userToken) {
        document.getElementById("fullNameDisplay").textContent = "Loading...";
        document.getElementById("userUIDDisplay").textContent = "UID: Loading...";
        document.getElementById("userEmail").textContent = "Email: Loading...";
        document.getElementById("phoneNumberDisplay").textContent = "Phone Number: Loading...";
    }
}

window.onload = checkUserLoggedIn;


// Function to close all popups before opening a new one
function closeAllPopups() {
    const popups = document.querySelectorAll(".popup");
    popups.forEach(popup => {
        popup.style.display = "none";
    });
}

// Function to open a specific popup
function openPopup(popupId) {
    closeAllPopups(); // Close all popups first
    document.getElementById(popupId).style.display = "block";
    document.getElementById("popupOverlay").style.display = "block"; // Show background overlay
}

// Function to close a specific popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
    document.getElementById("popupOverlay").style.display = "none"; // Hide background overlay
}

// Open Login Popup
function openLoginPopup() {
    openPopup("loginPopup");
}

// Open Forgot Password Popup
function openForgotPasswordPopup() {
    openPopup("forgotPasswordPopup");
}

// Open Registration Popup
function openRegistrationPopup() {
    openPopup("registrationPopup");
}

// Function to close all popups
function closeAllPopups() {
    document.querySelectorAll(".popup").forEach(popup => {
        popup.style.display = "none";
    });
}

// Function to open a specific popup
function openPopup(popupId) {
    closeAllPopups(); // Close all other popups
    document.getElementById(popupId).style.display = "block";
}

// Open Login Popup from Forgot Password Section
function openLoginFromForgot() {
    openPopup("loginPopup");
}

// Open Forgot Password Popup
function openForgotPasswordPopup() {
    openPopup("forgotPasswordPopup");
}

// Open Registration Popup
function openRegistrationPopup() {
    openPopup("registrationPopup");
}