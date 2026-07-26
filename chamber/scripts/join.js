// ======================================
// Lira City Chamber Join Page
// join.js
// ======================================

// ---------- Hidden Timestamp ----------
document.addEventListener("DOMContentLoaded", () => {

    const timestamp = document.getElementById("timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // ---------- Membership Dialogs ----------

    const links = document.querySelectorAll("[data-modal]");

    links.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            const dialog = document.getElementById(link.dataset.modal);

            if (dialog) {
                dialog.showModal();
            }

        });

    });

    // ---------- Close Buttons ----------

    const closeButtons = document.querySelectorAll("dialog .close");

    closeButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.closest("dialog").close();

        });

    });

    // ---------- Close Dialog by Clicking Outside ----------

    const dialogs = document.querySelectorAll("dialog");

    dialogs.forEach(dialog => {

        dialog.addEventListener("click", (event) => {

            const rect = dialog.getBoundingClientRect();

            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!inside) {
                dialog.close();
            }

        });

    });

});