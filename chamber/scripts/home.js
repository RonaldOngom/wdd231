/* ==========================================
   Lira City Chamber of Commerce
   Home Page Spotlights
========================================== */

const spotlightContainer = document.querySelector("#spotlights");

/* ==========================================
   MEMBERS JSON
========================================== */

const membersURL = "data/members.json";

/* ==========================================
   GET MEMBERS
========================================== */

async function getSpotlights() {

    try {

        const response = await fetch(membersURL);

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const members = await response.json();

        displaySpotlights(members);

    } catch (error) {

        console.error(error);

        spotlightContainer.innerHTML =
            "<p>Unable to load member spotlights.</p>";

    }

}

/* ==========================================
   DISPLAY SPOTLIGHTS
========================================== */

function displaySpotlights(members) {

    // Gold = 3
    // Silver = 2

    const featured = members.filter(member =>

        member.membership === 2 ||
        member.membership === 3

    );

    shuffle(featured);

    const selected = featured.slice(0,3);

    spotlightContainer.innerHTML = "";

    selected.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `
    <img
        src="${member.image}"
        alt="${member.name} company logo"
        width="160"
        height="160"
        loading="lazy">

    <h3>${member.name}</h3>

    <p>${member.industry}</p>

    <p>${member.address}</p>

    <p>${member.phone}</p>

    <p>
        <strong>
            ${membershipLevel(member.membership)}
        </strong>
    </p>

    <p>
        <a
            href="${member.website}"
            target="_blank"
            rel="noopener noreferrer">
            Visit Website
        </a>
    </p>
`;

        spotlightContainer.appendChild(card);

    });

}

/* ==========================================
   MEMBERSHIP LEVEL
========================================== */

function membershipLevel(level) {

    switch(level){

        case 3:
            return "Gold Member";

        case 2:
            return "Silver Member";

        case 1:
            return "Member";

        default:
            return "Non-Profit";

    }

}

/* ==========================================
   RANDOM SHUFFLE
========================================== */

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];

    }

}

/* ==========================================
   START
========================================== */

getSpotlights();