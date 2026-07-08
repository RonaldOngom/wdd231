// ===============================
// Responsive Navigation
// WDD231
// ===============================

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

// Toggle the navigation menu
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    // Change button icon
    if (navigation.classList.contains("open")) {
        menuButton.textContent = "✖";
        menuButton.setAttribute("aria-label", "Close Navigation Menu");
    } else {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open Navigation Menu");
    }
});

// Set initial accessibility label
menuButton.setAttribute("aria-label", "Open Navigation Menu");