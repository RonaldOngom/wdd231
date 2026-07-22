const directoryContainer = document.querySelector('#directory-container');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

const url = 'data/members.json';

async function getMemberData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    directoryContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        let levelName = member.membershipLevel === 3 ? "Gold" : member.membershipLevel === 2 ? "Silver" : "Member";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="150">
            <div class="member-details">
                <h3>${member.name}</h3>
                <p class="tagline"><em>${member.tagline || ""}</em></p>
                <p>📍 ${member.address}</p>
                <p>📞 ${member.phone}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Website</a></p>
                <p class="badge ${levelName.toLowerCase()}">${levelName} Tier</p>
            </div>
        `;
        directoryContainer.appendChild(card);
    });
}

// Toggle grid and list layout classes
gridButton.addEventListener('click', () => {
    directoryContainer.classList.add('grid');
    directoryContainer.classList.remove('list');
});

listButton.addEventListener('click', () => {
    directoryContainer.classList.add('list');
    directoryContainer.classList.remove('grid');
});

// Initial call
getMemberData();