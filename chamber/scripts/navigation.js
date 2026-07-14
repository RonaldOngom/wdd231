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

        if (navigation.classList.contains("open")) {
            menuButton.textContent = "✕";
            menuButton.setAttribute("aria-label", "Close Navigation");
        } else {
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-label", "Open Navigation");
        }
    });
}

// ---------- Active Navigation ----------

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
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