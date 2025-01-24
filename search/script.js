// সার্চ রেজাল্ট ফেচ করার জন্য ফাংশন
function fetchSearchResults() {
    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsContainer = document.getElementById("searchResults");

    // যদি ইনপুট ফাঁকা থাকে, রেজাল্ট ক্লিয়ার করা হবে
    if (query === "") {
        resultsContainer.innerHTML = "";
        resultsContainer.style.display = 'none';
        return;
    }

    // সার্চ ডেটা (ডেমো ডেটা, সার্ভারের সাথে ইন্টিগ্রেট করতে API ব্যবহার করুন)
    const pages = [
        { title: "Home Page", url: "../home.html" },
        { title: "About Us", url: "about.html" },
        { title: "Services", url: "services.html" },
        { title: "Contact Us", url: "contact.html" },
        { title: "All Calculator", url: "../calculator.html" },
        { title: "Right Angle", url: "../calculator/right_angle/right_angle.html" },
        { title: "Calculator", url: "../calculator/calculator/index.html" },
    ];

    // ইনপুট অনুযায়ী পেজ ফিল্টার করা
    const filteredResults = pages.filter(page => 
        page.title.toLowerCase().includes(query)
    );

    // রেজাল্ট লিস্ট আপডেট করা
    resultsContainer.innerHTML = "";

    if (filteredResults.length > 0) {
        resultsContainer.style.display = 'block';
        filteredResults.forEach(result => {
            const li = document.createElement("li");
            li.textContent = result.title; // রেজাল্ট টাইটেল দেখানো
            li.onclick = () => {
                window.location.href = result.url; // রেজাল্ট লিংকে রিডাইরেক্ট
            };
            resultsContainer.appendChild(li);
        });
    } else {
        resultsContainer.style.display = 'block';
        resultsContainer.innerHTML = "<li class='no-results'>No result </li>";
    }
}

// সার্চ বাটনে ক্লিক করার পর ফাংশন রান করা হবে
document.getElementById("searchButton").addEventListener("click", function(event) {
    event.preventDefault(); // ফর্ম সাবমিট হওয়া থেকে রোধ করা
    fetchSearchResults(); // সার্চ রেজাল্ট ফেচ করা
});