import { API_KEY } from "./config";

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
      const {latitude: lat , longitude: lon} = pos.coords;

      const countryFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const countryData = await countryFetch.json();

      location.innerHTML = `Weather in ${countryData.name}`;
      }catch(err){
            console.log('Error:' + err);
      }
};

const getWeather = async function(){
      const pos = await getPosition();
      const {latitude: lat , longitude: lon} = pos.coords;
      
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const data = (await response.json());

      const icon = data.weather[0].icon;
      const celsius = (data.main.temp - 273.15).toFixed(0);
      const celsiusFeelsLike = (data.main.feels_like - 273.15).toFixed(0);
 
      location.innerHTML = `Weather in ${data.name}`;
      temperature.innerHTML = celsius + "℃";
      iconContainer.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
      feelLike.innerHTML = `Feels like: ${celsiusFeelsLike}℃`;
      pressure.innerHTML = `Pressure: ${data.main.pressure} mbar`;
      description.innerHTML = data.weather[0].description ? `Descritpion: ${data.weather[0].description}` : '';
};

const searchCity = async function(){
      const city = input.value;
      const searchTerm = city;

     const result =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${API_KEY}`);
     const data = await result.json();
     const icon = data.weather[0].icon;

     const celsius = (data.main.temp - 273.15).toFixed(0);
      const celsiusFeelsLike = (data.main.feels_like - 273.15).toFixed(0);

     location.innerHTML = `Weather in ${data.name}`;
     temperature.innerHTML = celsius + "℃";
     iconContainer.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
     humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
     feelLike.innerHTML = `Feels like: ${celsiusFeelsLike}℃`;
     pressure.innerHTML = `Pressure: ${data.main.pressure} mbar`;
     description.innerHTML = data.description ? `Descritpion: ${data.weather[0].description}` : '';
     input.value = '';
};

const renderClock = function(){
      const date = new Date();
      clock.innerHTML = date.toLocaleTimeString();
};

button.addEventListener('click', searchCity);
window.addEventListener('keydown', (e) => {
      if(e.key === "Enter"){
            searchCity();
      }
})

const init = function(){
      getCounty();
      getWeather();
      setInterval(renderClock, 1000);
};

init();