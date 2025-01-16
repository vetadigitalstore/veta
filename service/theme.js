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