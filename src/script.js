let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let today = document.querySelector("#current-day");
let time = document.querySelector("#current-time");

today.innerHTML = day;
time.innerHTML = `as of ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
}

function search(event) {
  event.preventDefault();
  let apiKey = "14531cf5a5e3aad205f8ebad395806b8";
  let units = "metric";
  let city = document.querySelector("#city-search").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", search);

search("New York");
