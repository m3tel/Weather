const API_KEY_OW = "2476f688fb16f09da42edbf879064150";
const API_KEY_IP = "at_sh0Gh8RsOZJ58ubfBCDXGjeBxXzo1";
const info = document.querySelector(".info");
const degrees = document.createElement("p");
const cityChange = document.createElement("p");
const button = document.createElement("button");

// Функция отрисовки погоды
function renderingWeather() {
  degrees.className = "info__degrees";
  degrees.textContent = "--";
  info.append(degrees);

  cityChange.className = "info__сity";
  cityChange.textContent = "--";
  info.append(cityChange);

  button.className = "btn";
  button.textContent = "Change city";
  info.append(button);
}
renderingWeather();

// Приложение должно запрашивать у пользователя его координаты через html5 geolocation api браузера.
//Если все получилось, то запрашивать погоду по этим координатам.

async function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);

  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${API_KEY_OW}`
  );
  let data = await response.json();
  // console.log(response);
  // console.log(data);
  degrees.innerText = Math.round(data.main.temp - 278) + "°C";
  cityChange.innerText = data.weather[0].main + " in " + data.name;
}
navigator.geolocation.getCurrentPosition(success);

// Функция получения погоды по городу API
async function getCity(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY_OW}`
  );
  let data = await response.json();
  cityChange.innerText = data.name;
}
getCity("Rostov-on-Don");

// Функия получения местоположения по IP

async function getIpLocation() {
  let response = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY_IP}`
  );
  let data = await response.json();
  console.log(data);
  return (cityChange.innerText = data.location.city);
}
getIpLocation();
