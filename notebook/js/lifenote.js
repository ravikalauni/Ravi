document.getElementById("search").addEventListener("focus", function() {
    document.getElementById("search-panel").classList.remove("hidden");
});

document.addEventListener("click", function(event) {
    if (!event.target.closest(".search-container")) {
        document.getElementById("search-panel").classList.add("hidden");
    }
});

const searchList = [
    { name: "First Memory", link: "memory1.html" },
    { name: "Second Memory", link: "memory2.html" },
    { name: "Third Experience", link: "experience1.html" },
    { name: "Journey to Mountains", link: "mountain.html" }
];

document.getElementById("search").addEventListener("input", function() {
    let filter = this.value.toLowerCase();
    let panel = document.getElementById("search-panel");
    panel.innerHTML = ""; // Clear previous results
    searchList.forEach(item => {
        if (item.name.toLowerCase().includes(filter)) {
            let resultItem = document.createElement("a");
            resultItem.href = item.link;
            resultItem.textContent = item.name;
            resultItem.classList.add("search-item");
            panel.appendChild(resultItem);
        }
    });
});

const closeButtons = document.querySelectorAll(".close-btn");
closeButtons.forEach(button => {
    button.addEventListener("click", function() {
        this.parentElement.style.display = "none";
    });
});

document.getElementById("privacy-btn").addEventListener("click", function() {
    document.getElementById("privacy-modal").classList.remove("hidden");
});

document.getElementById("close-privacy").addEventListener("click", function() {
    document.getElementById("privacy-modal").classList.add("hidden");
});

function redirectToPage() {
    window.location.href = "content-page.html";
}
