const weatherElement = document.querySelector("#weather");

// Replace these coordinates if you choose another city
const latitude = 2.2499;
const longitude = 32.8998;

// Get a free API key from https://openweathermap.org/api
const apiKey = "YOUR_API_KEY";

const url =
`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

async function getWeather() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data unavailable.");
        }

        const data = await response.json();

        displayWeather(data);

    } catch (error) {

        weatherElement.textContent =
            "Weather information is currently unavailable.";

        console.error(error);
    }
}

function displayWeather(data) {

    weatherElement.innerHTML = `
        <strong>${Math.round(data.main.temp)}°C</strong><br>
        ${data.weather[0].description}<br>
        Humidity: ${data.main.humidity}%<br>
        Wind: ${data.wind.speed} km/h
    `;
}

getWeather();