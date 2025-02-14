// ✅ লগইন পেজে ফিরে যাওয়া
function goToLogin() {
    window.location.href = "login.html";
}

// ✅ রেজিস্ট্রেশন পেজে নেভিগেট
function goToRegister() {
    window.location.href = "register.html";
}

// ✅ ফরগেট পাসওয়ার্ড পেজে নেভিগেট
function forgotPassword() {
    window.location.href = "forgot-password.html";  // এই লাইনে রিডাইরেক্টের কাজ হচ্ছে
}

// ✅ র্যান্ডম সিকিউরিটি কোড জেনারেটর
function generateSecurityCode() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const codeDisplay = document.getElementById('generated-code');
    if (codeDisplay) {
        codeDisplay.textContent = code; // UI তে কোড দেখানো
    }
    return code;
}

let currentCode = generateSecurityCode(); // শুরুতে সিকিউরিটি কোড জেনারেট

// ✅ পাসওয়ার্ড স্ট্রেংথ যাচাই
document.getElementById('new-password')?.addEventListener('input', function () {
    const password = this.value;
    const strengthText = document.getElementById('password-strength');

    if (strengthText) {
        if (password.length < 6) {
            strengthText.textContent = "পাসওয়ার্ড দুর্বল (কমপক্ষে ৬ অক্ষর)";
            strengthText.style.color = "#d32f2f"; // লাল রঙ
        } else if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.match(/[\W_]/)) {
            strengthText.textContent = "পাসওয়ার্ড শক্তিশালী!";
            strengthText.style.color = "#388e3c"; // সবুজ রঙ
        } else {
            strengthText.textContent = "পাসওয়ার্ড মাঝারি শক্তিশালী";
            strengthText.style.color = "#fbc02d"; // হলুদ রঙ
        }
    }
});

// ✅ রেজিস্ট্রেশন ফর্ম যাচাই এবং সাবমিট
document.getElementById('registerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullname')?.value.trim();
    const dob = document.getElementById('dob')?.value;
    const gender = document.getElementById('gender')?.value;
    const contact = document.getElementById('contact')?.value.trim();
    const password = document.getElementById('new-password')?.value;
    const enteredCode = document.getElementById('security-code')?.value;

    // ✅ ফিল্ড যাচাই
    if (!fullName || !dob || !gender || !contact || !password || !enteredCode) {
        alert("সব ফিল্ড সঠিকভাবে পূরণ করুন!");
        return;
    }

    // ✅ সিকিউরিটি কোড যাচাই
    if (enteredCode !== currentCode) {
        alert("সিকিউরিটি কোড সঠিক নয়!");
        currentCode = generateSecurityCode(); // নতুন কোড জেনারেট
        return;
    }

    // ✅ পাসওয়ার্ডের দৈর্ঘ্য যাচাই
    if (password.length < 6) {
        alert("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!");
        return;
    }

    // ✅ সফল রেজিস্ট্রেশন
    alert("রেজিস্ট্রেশন সফল হয়েছে!");
    window.location.href = "index.html"; // লগইন পেজে রিডাইরেক্ট
});


 // Go Back Function
        function goBack() {
            window.history.back();
        }