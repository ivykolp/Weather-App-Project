function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0:${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated as of ${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
              <div class="weather-forecast-date"> ${day} </div>
              <img 
              src="http://openweathermap.org/img/wn/10d@2x.png"
              alt=""
              wid="36"
              />
              <div class="weather-forecast-temperature">
                  <span class="weather-forecast-tempearture-max"> 18° </span>
                  <span class="weather-forecast-temperature-min"> 12° </span>
              </div>
          </div>`;
  });

  forecastElementHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  let dateElement = document.querySelector("#current-day");
  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  fahrenheitTemperature = response.data.main.temp;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(currentCity) {
  let apiKey = "14531cf5a5e3aad205f8ebad395806b8";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#city-search").value;
  search(currentCity);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (5 / 9) * (fahrenheitTemperature - 32);
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (0 * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

search("New York");
displayForecast();

let fahrenheitTemperature = null;

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);
