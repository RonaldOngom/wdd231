document.addEventListener("DOMContentLoaded", () => {
    // --- Weather API Implementation ---
    const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your active OpenWeatherMap API key
    // Coordinates for your region (e.g., Lira, UG)
    const lat = 2.2499; 
    const lon = 32.9;
    const weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    async function getWeatherData() {
        try {
            const response = await fetch(weatherURL);
            if (response.ok) {
                const data = await response.json();
                displayWeather(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("weather-desc").textContent = "Weather unavailable";
        }
    }

    function displayWeather(data) {
        // Current temperature and description from the first list entry
        const currentTemp = Math.round(data.list[0].main.temp);
        const description = data.list[0].weather[0].description;
        
        document.getElementById("current-temp").textContent = currentTemp;
        document.getElementById("weather-desc").textContent = capitalizeWords(description);

        // 3-Day Forecast calculation (filtering roughly 24-hour intervals: index 8, 16, 24)
        const forecastContainer = document.getElementById("forecast-container");
        forecastContainer.innerHTML = "";
        
        const forecastDays = [data.list[7], data.list[15], data.list[23]];
        forecastDays.forEach((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const temp = Math.round(day.main.temp);
            
            const dayElem = document.createElement("p");
            dayElem.innerHTML = `<strong>${dayName}:</strong> ${temp}&deg;C - ${capitalizeWords(day.weather[0].description)}`;
            forecastContainer.appendChild(dayElem);
        });
    }

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, l => l.toUpperCase());
    }

    getWeatherData();

    // --- Company Spotlights Implementation ---
    const membersURL = "data/members.json"; // Path to your chamber members JSON file

    async function getMemberSpotlights() {
        try {
            const response = await fetch(membersURL);
            if (response.ok) {
                const members = await response.json();
                displaySpotlights(members);
            } else {
                throw Error("Failed to load members JSON data.");
            }
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displaySpotlights(members) {
        // Filter members for Gold (Level 3 or explicit string) or Silver (Level 2 or explicit string)
        const qualifiedMembers = members.filter(member => 
            member.membershipLevel === 2 || 
            member.membershipLevel === 3 || 
            member.membershipLevel === "Silver" || 
            member.membershipLevel === "Gold"
        );

        // Randomly shuffle and pick 2 to 3 members
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, 3); // Grab up to 3 members

        const spotlightsContainer = document.getElementById("spotlight-cards");
        spotlightsContainer.innerHTML = "";

        selectedMembers.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="100">
                <h3>${member.name}</h3>
                <p class="membership-level">Level: ${member.membershipLevel == 3 || member.membershipLevel === "Gold" ? "Gold Member" : "Silver Member"}</p>
                <p>📞 ${member.phone}</p>
                <p>📍 ${member.address}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            `;
            spotlightsContainer.appendChild(card);
        });
    }

    getMemberSpotlights();
});