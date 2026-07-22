// ===============================================
// Lira City Chamber Member Spotlights
// WDD231 Chamber Project
// ===============================================

const spotlightContainer = document.querySelector("#spotlight-container");
const membersURL = "data/members.json";

async function loadSpotlights() {
    try {
        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const data = await response.json();

        displaySpotlights(data.members);

    } catch (error) {
        console.error(error);

        spotlightContainer.innerHTML =
            "<p>Unable to load featured members.</p>";
    }
}

function displaySpotlights(members) {

    // Keep only Gold and Silver members
    const qualified = members.filter(member =>
        member.membership === "Gold" ||
        member.membership === "Silver"
    );

    // Shuffle the array
    qualified.sort(() => Math.random() - 0.5);

    // Randomly display 2 or 3 members
    const total = Math.random() < 0.5 ? 2 : 3;

    const selected = qualified.slice(0, total);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `

            <img
                src="${member.image}"
                alt="${member.name} Logo"
                loading="lazy">

            <h3>${member.name}</h3>

            <p><strong>Phone:</strong><br>${member.phone}</p>

            <p><strong>Address:</strong><br>${member.address}</p>

            <p><strong>Membership:</strong><br>${member.membership}</p>

            <p>
                <a href="${member.website}"
                   target="_blank"
                   rel="noopener">
                    Visit Website
                </a>
            </p>

        `;

        spotlightContainer.appendChild(card);

    });

}

loadSpotlights();