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
        { title: "Services", url: "service.html" },
        { title: "Contact Us", url: "contact.html" },
        { title: "Privacy Policy", url: "privacy.html" },
        { title: "Terms & Conditions", url: "terms.html" },
        
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