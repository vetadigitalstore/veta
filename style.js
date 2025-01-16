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

// Open Registration Popup
function openRegistrationPopup() {
    closeLoginPopup(); // Close Login Popup
    document.getElementById("registrationPopup").style.display = "block";
}

// Close Registration Popup
function closeRegistrationPopup() {
    document.getElementById("registrationPopup").style.display = "none";
}

// লগইন ফাংশন
function login() {
    localStorage.setItem("isLoggedIn", "true"); // লগইন স্ট্যাটাস সেট করুন
    window.location.href = "index.html"; // হোম পেজে রিডাইরেক্ট করুন
}

// লগআউট ফাংশন
function logout() {
    localStorage.removeItem("isLoggedIn"); // লগইন স্ট্যাটাস মুছে ফেলুন
    window.location.href = "login/index.html"; // লগইন পেজে রিডাইরেক্ট করুন
}

// লগইন চেক করার ফাংশন
function checkLogin() {
    if (!localStorage.getItem("isLoggedIn")) {
        window.location.href = "login/index.html"; // লগইন পেজে রিডাইরেক্ট করুন
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


