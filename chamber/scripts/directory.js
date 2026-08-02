import { places } from "../data/places.mjs";

const container = document.querySelector("#discover-grid");

places.forEach(place => {

    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img
                src="${place.image}"
                alt="${place.name}"
                loading="lazy"
                width="300"
                height="200">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button>Learn More</button>
    `;

    container.appendChild(card);

});