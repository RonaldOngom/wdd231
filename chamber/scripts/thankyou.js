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
    
    // Additional fields
    displayField("organizationtitle", "organizationtitle");
    displayField("description", "description");
    
    // Map membership code to human-friendly label
    const membershipParam = params.get("membership");
    const membershipMap = {
        np: "NP Membership",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership",
        "": "Not Selected"
    };

    const membershipElement = document.getElementById("membership");
    if (membershipElement) {
        membershipElement.textContent = membershipMap[membershipParam] || membershipParam || "Not Provided";
    }

    // Format timestamp
    const timestamp = params.get("timestamp");

    if (timestamp) {

        const date = new Date(timestamp);

        const timestampElement = document.getElementById("timestamp");

        if (timestampElement) {
            timestampElement.textContent =
                date.toLocaleString("en-UG", {
                    dateStyle: "full",
                    timeStyle: "medium"
                });
        }
    } else {

        const timestampElement = document.getElementById("timestamp");

        if (timestampElement) {
            timestampElement.textContent = "Not Available";
        }

    }

});