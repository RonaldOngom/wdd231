const spotlightContainer = document.querySelector("#spotlights");

async function loadSpotlights() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const members = await response.json();

        // Only Silver (2) and Gold (3) members
        const featured = members.filter(
            member => member.membership >= 2
        );

        // Shuffle
        featured.sort(() => Math.random() - 0.5);

        // Display three
        const selected = featured.slice(0, 3);

        displaySpotlights(selected);

    } catch (error) {

        spotlightContainer.textContent =
            "Unable to load spotlight members.";

        console.error(error);

    }

}

function displaySpotlights(members) {

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("section");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <h3>${member.name}</h3>

            <img
                src="images/${member.image}"
                alt="${member.name}"
                loading="lazy"
                width="120"
                height="120">

            <p>${member.description}</p>

            <p><strong>${member.industry}</strong></p>

            <a
                href="${member.website}"
                target="_blank"
                rel="noopener">

                Visit Website

            </a>
        `;

        spotlightContainer.appendChild(card);

    });

}

loadSpotlights();