import { API_KEY_OW, API_KEY_VC } from "./config";

const clock = document.querySelector('.clock');
const temperature = document.querySelector('.card h1');
const humidity = document.querySelector('.humidity');
const feelLike = document.querySelector('.feellike');
const pressure = document.querySelector('.pressure');
const description = document.querySelector('.card-description');
const location = document.querySelector('.card h2');
const input = document.querySelector('input');
const button = document.querySelector('button');
const iconContainer = document.querySelector('img');


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
      try{
      const pos = await getPosition();
      const {latitude: lat , longitude: lng} = pos.coords;

      const countryFetch = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&appid=${API_KEY_OW}`);
      const countryData = await countryFetch.json();
      console.log(countryData);

      location.innerHTML = `Weather in ${countryData[0].name}`;
      }catch(err){
            console.log('Error:' + err);
      }
};

const getWeather = async function(){
      const pos = await getPosition();
      const {latitude , longitude} = pos.coords;
      
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${API_KEY_VC}`);
      const data = await response.json();
      const icon = data.currentConditions.icon;

      const celsius = ((data.currentConditions.temp - 32) * 5/9).toFixed(2);
      iconContainer.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/4th%20Set%20-%20Color/${icon}.png`;
      const celsiusFeelsLike = ((data.currentConditions.feelslike - 32) * 5/9).toFixed(2);
      temperature.innerHTML = celsius + "℃";
      humidity.innerHTML = `Humidity: ${data.currentConditions.humidity}%`;
      feelLike.innerHTML = `Feels like: ${celsiusFeelsLike}℃`;
      pressure.innerHTML = `Pressure: ${data.currentConditions.pressure} mbar`;
      description.innerHTML = data.description;
};

const searchCity = async function(){
      const city = input.value;

      const searchTerm = city;

     const result =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY_OW}`);
     const data = await result.json();
     const icon = data.weather[0].icon;

     const celsius = (data.main.temp - 273.15).toFixed(2);
      const celsiusFeelsLike = (data.main.feels_like - 273.15).toFixed(2);

     location.innerHTML = `Weather in ${data.name}`;
     temperature.innerHTML = celsius + "℃";
     iconContainer.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      feelLike.innerHTML = `Feels like: ${celsiusFeelsLike}℃`;
      pressure.innerHTML = `Pressure: ${data.main.pressure} mbar`;
      description.innerHTML = data.description ? data.description : '';
};

const renderClock = function(){
      const date = new Date();
      clock.innerHTML = date.toLocaleTimeString();
};

button.addEventListener('click', searchCity);

const init = function(){
      getCounty();
      getWeather();
      setInterval(renderClock, 1000);
};

init();