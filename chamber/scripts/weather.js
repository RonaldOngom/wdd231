// ===============================================
// Lira City Chamber Weather
// WDD231 Chamber Project
// ===============================================

const apiKey = "be33f449b89ebbfb97594aaa065c7d46";
// Lira City Coordinates
const latitude = 2.2499;
const longitude = 32.8998;

const currentURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const currentWeather = document.querySelector("#current-weather");
const forecastContainer = document.querySelector("#forecast");

async function loadWeather() {
    try {

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentURL),
            fetch(forecastURL)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData);

    } catch (error) {
        currentWeather.innerHTML =
            "<p>Unable to load weather information.</p>";

        console.error(error);
    }
}

function displayCurrentWeather(data) {

    const icon =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    currentWeather.innerHTML = `

        <img src="${icon}"
             alt="${data.weather[0].description}">

        <h3>${Math.round(data.main.temp)}°C</h3>

        <p>${capitalize(data.weather[0].description)}</p>

        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>

        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>

    `;
}

function displayForecast(data) {

    forecastContainer.innerHTML = "";

    const forecastDays =
        data.list.filter(item => item.dt_txt.includes("12:00:00"));

    forecastDays.slice(0,3).forEach(day => {

        const card = document.createElement("div");

        card.className = "forecast-card";

        const date = new Date(day.dt_txt);

        card.innerHTML = `

            <h4>${date.toLocaleDateString("en-US",
            {weekday:"short"})}</h4>

            <p>${Math.round(day.main.temp)}°C</p>

            <p>${capitalize(day.weather[0].description)}</p>

        `;

        forecastContainer.appendChild(card);

    });

}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

loadWeather();