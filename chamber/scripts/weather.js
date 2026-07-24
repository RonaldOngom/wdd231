/* ===========================================
   Lira City Chamber of Commerce
   Weather API
=========================================== */

// Lira City Coordinates
const latitude = 2.2499;
const longitude = 32.8998;

// my own OpenWeather API Key
const apiKey = "be33f449b89ebbfb97594aaa065c7d46";

const weatherURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const forecast = document.querySelector("#forecast");

/* ===========================================
   CURRENT WEATHER
=========================================== */

async function getCurrentWeather() {

    try {

        const response = await fetch(weatherURL);

        if (!response.ok) {
            throw Error("Weather data not found.");
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {

        console.error(error);

        temperature.textContent = "Weather data unavailable";

        description.textContent = "Please try again later.";

        forecast.innerHTML = "";

    }

}

/* ===========================================
   DISPLAY CURRENT WEATHER
=========================================== */

function displayCurrentWeather(data) {

    temperature.innerHTML =
        `${Math.round(data.main.temp)}°C`;

    description.textContent =
        capitalizeWords(data.weather[0].description);

}

/* ===========================================
   FORECAST
=========================================== */

async function getForecast() {

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {

            throw Error("Forecast unavailable.");

        }

        const data = await response.json();

        displayForecast(data);

    } catch (error) {

        console.error(error);

    }

}

/* ===========================================
   DISPLAY 3 DAY FORECAST
=========================================== */

function displayForecast(data) {

    forecast.innerHTML = "";

    // Forecast every 24 hours (8 intervals)

    const dailyForecast = data.list.filter((item, index) => index % 8 === 0);

    dailyForecast.slice(1,4).forEach(day => {

        const card = document.createElement("div");

        const date = new Date(day.dt * 1000);

        const weekday = date.toLocaleDateString("en-US", {

            weekday: "short"

        });

        card.innerHTML = `
            <h4>${weekday}</h4>
            <p>${Math.round(day.main.temp)}°C</p>
        `;

        forecast.appendChild(card);

    });

}

/* ===========================================
   UTILITIES
=========================================== */

function capitalizeWords(text) {

    return text.replace(/\b\w/g, letter => letter.toUpperCase());

}

/* ===========================================
   INITIALIZE
=========================================== */

getCurrentWeather();

getForecast();