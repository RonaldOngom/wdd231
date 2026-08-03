const grid = document.querySelector("#discover-grid");

const visitMessage = document.querySelector("#visit-message");

if (!grid) {

    console.error("Discover grid not found");

} else {

function showVisitMessage() {

    if (!visitMessage) return;

    const lastVisit = localStorage.getItem("lastVisit");

    const now = new Date();

    const options = { year: "numeric", month: "long", day: "numeric" };

    const formattedDate = now.toLocaleDateString("en-US", options);

    if (!lastVisit) {

        visitMessage.textContent = "Welcome! This is your first visit to our Discover page.";

    } else {

        visitMessage.textContent = `Welcome back! Your last visit was on ${lastVisit}.`;

    }

    localStorage.setItem("lastVisit", formattedDate);

}

async function loadPlaces() {

    const response = await fetch("data/discover.json");

    const places = await response.json();

    displayPlaces(places);

}

function displayPlaces(places) {

    const layouts = ["layout-1", "layout-2", "layout-3"];

    places.forEach((place, index) => {

        const card = document.createElement("article");

        card.classList.add("discover-card", layouts[index % 3]);

        card.innerHTML = `
            <h2>${place.name}</h2>

            <figure>

                <img
                    src="${place.image}"
                    alt="${place.name}"
                    loading="lazy"
                    width="400"
                    height="250">

            </figure>

            <address>

                ${place.address}

            </address>

            <p>

                ${place.description}

            </p>

            <button>

                ${place.button}

            </button>
        `;

        grid.appendChild(card);

    });

}

showVisitMessage();

loadPlaces();

}

