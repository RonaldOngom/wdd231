// ============================================
// Lira City Chamber of Commerce
// directory.js
// Fetch member data and display directory
// ============================================

const directory = document.querySelector("#directory");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");

const membersURL = "data/members.json";

/**
 * Fetch member data using async/await
 */
async function getMembers() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {
        console.error("Unable to load chamber member data.", error);

        directory.innerHTML = `
            <p class="error">
                Sorry, member information is currently unavailable.
            </p>
        `;
    }
}

/**
 * Display member cards
 */

function displayMembers(members) {

    directory.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} Logo"
                loading="lazy"
                width="200"
                height="200">

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <hr>

            <p><strong>Industry:</strong> ${member.industry}</p>

            <p><strong>Address:</strong> ${member.address}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p>
                <strong>Website:</strong><br>

                <a href="${member.website}"
                   target="_blank"
                   rel="noopener noreferrer">

                    ${member.website}

                </a>
            </p>

            <p><strong>Email:</strong> ${member.email}</p>

            <p><strong>Established:</strong> ${member.founded}</p>

            <p class="membership">

                ${getMembershipLevel(member.membership)}

            </p>
        `;

        directory.appendChild(card);

    });

}

/**
 * Membership labels
 */

function getMembershipLevel(level) {

    switch (level) {

        case 1:
            return '<span class="member">Member</span>';

        case 2:
            return '<span class="silver">Silver</span>';

        case 3:
            return '<span class="gold">Gold</span>';

        default:
            return '<span class="member">Member</span>';
    }

}

/**
 * Grid View
 */

gridButton.addEventListener("click", () => {

    directory.classList.add("grid");

    directory.classList.remove("list");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");

});

/**
 * List View
 */

listButton.addEventListener("click", () => {

    directory.classList.add("list");

    directory.classList.remove("grid");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");

});

/**
 * Load members
 */

getMembers();