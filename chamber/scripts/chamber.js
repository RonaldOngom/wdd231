// Responsive Hamburger Menu Toggle
const hambutton = document.querySelector('#menu');
const navigation = document.querySelector('#animate-menu');

hambutton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hambutton.classList.toggle('open');
});

// OpenWeatherMap API Configuration
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your active API key
const lat = 2.2499; // Lira Latitude
const lon = 32.9000; // Lira Longitude

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
        // Fetch Current Weather
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }

        // Fetch 3-Day Forecast
        const forecastResponse = await fetch(forecastUrl);
        if (forecastResponse.ok) {
            const forecastData = await forecastResponse.json();
            displayForecast(forecastData);
        } else {
            throw Error(await forecastResponse.text());
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data) {
    const currentTemp = document.querySelector('#current-temp');
    const weatherDesc = document.querySelector('#weather-desc');
    const weatherIcon = document.querySelector('#weather-icon');

    currentTemp.innerHTML = `${Math.round(data.main.temp)}`;
    const desc = data.weather[0].description;
    weatherDesc.innerHTML = desc.charAt(0).toUpperCase() + desc.slice(1);
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
}

function displayForecast(data) {
    const forecastList = document.querySelector('#forecast-list');
    forecastList.innerHTML = '';

    // Filter forecast list to pick one forecast per day around 12:00 PM
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(day => {
        const d = new Date(day.dt * 1000);
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${dayName}:</span> <strong>${Math.round(day.main.temp)}&deg;C</strong> - ${day.weather[0].description}`;
        forecastList.appendChild(listItem);
    });
}

apiFetch();

// Company Spotlights from JSON Data Source
const membersUrl = "data/members.json"; // Path to your local JSON data file

async function getSpotlights() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        
        // Filter members for Gold (2) or Silver (3) membership levels
        const qualifiedMembers = data.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
        
        // Randomly select 2 to 3 members
        const selectedSpotlights = getRandomMembers(qualifiedMembers, 3);
        
        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error('Error loading spotlights:', error);
    }
}

function getRandomMembers(array, count) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function displaySpotlights(members) {
    const spotlightsContainer = document.querySelector('#spotlights');
    spotlightsContainer.innerHTML = '<h2>Company Spotlights</h2>';

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('spotlight-card');

        let levelName = member.membershipLevel === 3 ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="100">
            <div>
                <h3>${member.name}</h3>
                <p class="membership-level ${levelName.toLowerCase().split(' ')[0]}">${levelName}</p>
                <p>📞 ${member.phone}</p>
                <p>📍 ${member.address}</p>
                <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            </div>
        `;
        spotlightsContainer.appendChild(card);
    });
}

getSpotlights();