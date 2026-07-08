// ===============================
// Responsive Navigation
// WDD231
// ===============================

const menuButton = document.querySelector("#menuButton");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        if (navigation.classList.contains("open")) {
            menuButton.textContent = "✖";
            menuButton.setAttribute("aria-label", "Close Navigation Menu");
        } else {
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-label", "Open Navigation Menu");
        }
    });

    menuButton.setAttribute("aria-label", "Open Navigation Menu");
}
