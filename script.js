const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

document.getElementById("searchButton").addEventListener("click", function () {
  const city = document.getElementById("cityInput").value;
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name");
  }
});

function fetchWeather(city) {
  fetch(apiUrl + city + "&appid=" + apiKey)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      alert(error.message);
    });
}

function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  document.querySelector(".city").textContent = cityName;
  document.querySelector(
    ".temp"
  ).textContent = `Temperature: ${temperature} °C`;
  document.querySelector(".humidity").textContent = `Humidity: ${humidity}%`;
  document.querySelector(".wind").textContent = `Wind Speed: ${windSpeed} m/s`;
  document.querySelector(".weather-icon").src = weatherIcon;

  document.getElementById("weatherDetails").style.display = "block";
}
