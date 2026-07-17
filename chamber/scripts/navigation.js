// =========================================
// Lira City Chamber of Commerce
// navigation.js
// Responsive Navigation & Footer Information
// =========================================

// ---------- Responsive Navigation ----------

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");
        menuButton.textContent = isOpen ? "✕" : "☰";
        menuButton.setAttribute("aria-label", isOpen ? "Close Navigation" : "Open Navigation");
        menuButton.setAttribute("aria-expanded", isOpen.toString());
    });
}

// ---------- Active Navigation ----------

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});

// ---------- Copyright Year ----------

const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ---------- Last Modified ----------

const lastModified = document.querySelector("#lastModified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}