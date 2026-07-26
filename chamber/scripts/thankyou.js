// =============================================
// Lira City Chamber of Commerce
// thankyou.js
// =============================================

document.addEventListener("DOMContentLoaded", () => {

    // Read URL query parameters
    const params = new URLSearchParams(window.location.search);

    // Display values safely
    const displayField = (id, parameter) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent = params.get(parameter) || "Not Provided";
        }
    };

    displayField("firstname", "firstname");
    displayField("lastname", "lastname");
    displayField("email", "email");
    displayField("phone", "phone");
    displayField("business", "business");

    // Format timestamp
    const timestamp = params.get("timestamp");

    if (timestamp) {

        const date = new Date(timestamp);

        document.getElementById("timestamp").textContent =
            date.toLocaleString("en-UG", {
                dateStyle: "full",
                timeStyle: "medium"
            });

    } else {

        document.getElementById("timestamp").textContent = "Not Available";

    }

});