import { API_KEY } from "./config";

const clock = document.querySelector('.clock');
const temperature = document.querySelector('.card h1');
const humidity = document.querySelector('.humidity');
const feelLike = document.querySelector('.feellike');
const pressure = document.querySelector('.pressure');
const description = document.querySelector('.card-description');
const city = document.querySelector('.card h2');
const input = document.querySelector('input');
const button = document.querySelector('button');

console.log(input, button);

const getPosition = function () {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(
          position => resolve(position),
          err => reject(err)
        );
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
    };

const getCounty = async function(){
      const pos = await getPosition();
      const {latitude: lat , longitude: lng} = pos.coords;
      console.log(lat, lng);

      const countryFetch = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      const countryData = await countryFetch.json();

      city.innerHTML = `Weather in ${countryData.city}`;
};

const getWeather = async function(){
      const pos = await getPosition();
      const {latitude , longitude} = pos.coords;
      
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${API_KEY}`);

      const data = await response.json();
      temperature.innerHTML = data.currentConditions.temp + "℉";
      humidity.innerHTML = `Humidity: ${data.currentConditions.humidity}%`;
      feelLike.innerHTML = `Feels like: ${data.currentConditions.feelslike}℉`;
      pressure.innerHTML = `Pressure: ${data.currentConditions.pressure} mbar`;
      description.innerHTML = data.description;
     console.log(data);
};

const renderClock = function(){
      const date = new Date();

      clock.innerHTML = date.toLocaleTimeString();
};

const searchCity = function(){
      const city = input.value;
      console.log(city);
}

button.addEventListener('click', searchCity);

const init = function(){
      getCounty();
      renderClock();
      getWeather();
};

init();







