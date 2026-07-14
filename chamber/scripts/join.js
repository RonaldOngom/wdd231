// Store the current date and time in the hidden timestamp field

document.addEventListener("DOMContentLoaded", () => {
    const timestamp = document.querySelector("#timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }
});