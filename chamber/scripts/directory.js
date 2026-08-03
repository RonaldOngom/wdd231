function displayMembers(members) {

    const directory = document.querySelector("#directory");

    directory.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `

            <img
                src="${member.image}"
                alt="${member.name}"
                class="member-image"
                width="320"
                height="200"
                loading="lazy">

            <div class="member-content">

                <h2>${member.name}</h2>

                <p>${member.description}</p>

                <p><strong>Industry:</strong> ${member.industry}</p>

                <p><strong>Address:</strong> ${member.address}</p>

                <p><strong>Phone:</strong> ${member.phone}</p>

                <p>

                    <strong>Website:</strong>

                    <a href="${member.website}"
                       target="_blank"
                       rel="noopener">

                        ${member.website}

                    </a>

                </p>

                <p>

                    <strong>Email:</strong>

                    ${member.email}

                </p>

                <p>

                    <strong>Established:</strong>

                    ${member.established}

                </p>

                <p class="membership">

                    ${membershipLevel(member.membership)}

                </p>

            </div>

        `;

        directory.appendChild(card);

    });

}